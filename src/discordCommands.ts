import { REST, Routes } from "discord.js";
import commands from "./commandsLoader";

export const refreshDiscordCommands = (TOKEN: string, CLIENT_ID: string) => {
  const rest = new REST({ version: "10" }).setToken(TOKEN);

  try {
    console.log("Started refreshing application (/) commands.");

    rest
      .put(Routes.applicationCommands(CLIENT_ID), { body: commands })
      .then(() => console.log("Successfully reloaded application (/) commands."));
  } catch (error) {
    console.error(error);
  }
};
