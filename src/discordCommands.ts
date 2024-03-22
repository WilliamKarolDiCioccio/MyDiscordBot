import { REST, Routes } from "discord.js";
import fs from "fs";
import path from "path";
import { logger } from "./utils/logger";

const commands = new Array();
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file: any) => file.endsWith(".ts"));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    logger.info(`Loading command from file ${filePath}`);
    const command = require(filePath);
    if ("data" in command && "execute" in command) {
      commands.push(command.data.toJSON());
    } else {
      logger.warn(
        `The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

export const refreshDiscordCommands = (TOKEN: string, CLIENT_ID: string) => {
  const rest = new REST({ version: "10" }).setToken(TOKEN);

  try {
    console.log("Started refreshing application (/) commands.");

    rest
      .put(Routes.applicationCommands(CLIENT_ID), { body: commands })
      .then(() =>
        console.log("Successfully reloaded application (/) commands.")
      );
  } catch (error) {
    console.error(error);
  }

  return rest;
};
