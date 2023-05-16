const sdk = require("matrix-bot-sdk");
const MatrixClient = sdk.MatrixClient;
const SimpleFsStorageProvider = sdk.SimpleFsStorageProvider;
const AutojoinRoomsMixin = sdk.AutojoinRoomsMixin;

require("dotenv").config() // Load ./.env into environment variables

const homeserverUrl: String = process.env.MX_SERVER_URL || "";
const accessToken: String = process.env.MX_ACCESS_TOKEN || "";

if (!homeserverUrl || !accessToken) {
    console.error("Please supply MX_SERVER_URL and MX_ACCESS_TOKEN in .env");
    process.exit();
}
