import * as dotenv from 'dotenv';
import { createDiscordClient } from "./discordInteraction";
import { refreshDiscordCommands } from "./discordCommands";

dotenv.config();

const TOKEN = process.env.TOKEN;
if (!TOKEN) {
  console.error("TOKEN is not defined");
  process.exit(1);
}

const CLIENT_ID = process.env.CLIENT_ID;
if (!CLIENT_ID) {
  console.error("CLIENT_ID is not defined");
  process.exit(1);
}

refreshDiscordCommands(TOKEN, CLIENT_ID);
createDiscordClient(TOKEN, CLIENT_ID);
