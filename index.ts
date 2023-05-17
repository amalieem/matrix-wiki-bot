const sdk = require("matrix-bot-sdk");
const MatrixClient = sdk.MatrixClient;
const SimpleFsStorageProvider = sdk.SimpleFsStorageProvider;
const AutojoinRoomsMixin = sdk.AutojoinRoomsMixin;

require("dotenv").config() // Load ./.env into environment variables


const COMMAND_PREFIX = "!wiki ";
const homeserverUrl: string = process.env.MX_SERVER_URL || "";
const accessToken: string = process.env.MX_ACCESS_TOKEN || "";
const storage = new SimpleFsStorageProvider("bot.json");

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

    if (body.startsWith(COMMAND_PREFIX + "echo")) {
        const replyText: string = body.substring("!wiki echo".length).trim();
        client.sendMessage(roomId, {
            "msgtype": "m.notice",
            "body": replyText,
        });
    }
}