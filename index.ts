import axios from "axios";
import showdown from "showdown";
import { Message } from "./models/Message";
import { ErrorMessage } from "./models/ErrorMessage";
import { WikiMessage } from "./models/WikiMessage";

const sdk = require("matrix-bot-sdk");
const MatrixClient = sdk.MatrixClient;
const SimpleFsStorageProvider = sdk.SimpleFsStorageProvider;
const AutojoinRoomsMixin = sdk.AutojoinRoomsMixin;

require("dotenv").config() // Load ./.env into environment variables

const COMMAND_PREFIX = "!wiki ";
const homeserverUrl: string = process.env.MX_SERVER_URL || "";
const accessToken: string = process.env.MX_ACCESS_TOKEN || "";
const storage = new SimpleFsStorageProvider("bot.json");
const wikiRandomUrl = "https://en.wikipedia.org/api/rest_v1/page/random/summary";

if (!homeserverUrl || !accessToken) {
    console.error("Please supply MX_SERVER_URL and MX_ACCESS_TOKEN in .env");
    process.exit();
}

const client = new MatrixClient(homeserverUrl, accessToken, storage);
// AutojoinRoomsMixin.setupOnClient(client);

client.start().then(() => console.log("Client started!"));
client.on("room.message", handleMessage);

async function handleMessage(roomId: string, event: any) {
    if (event['content']?.['msgtype'] !== 'm.text') return;

    const sender: string = event["sender"];
    const body: string = event["content"]["body"];

    if (sender === await client.getUserId()) return; // Ignore messages sent from this bot
    if (!body.startsWith(COMMAND_PREFIX)) return; // Ignore messages not related to us

    console.log(`${roomId}: ${sender} says '${body}`);

    if (body.startsWith(COMMAND_PREFIX + "random")) {
        const message: Message = await axios.get(wikiRandomUrl)
            .then(response => response.data)
            .then(data => {
                return new WikiMessage(data.title, data.description, data.extract, new URL(data.content_urls.desktop.page))
            })
            .catch(error => {
                return new ErrorMessage()
            });
            
        const converter = new showdown.Converter();

        client.sendMessage(roomId, {
            "msgtype": "m.text",
            "body": message.toMarkdown(),
            "format": "org.matrix.custom.html",
            "formatted_body": converter.makeHtml(message.toMarkdown()),
        })
        
    }
}