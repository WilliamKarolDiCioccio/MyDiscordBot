import { Client, GatewayIntentBits, Events, ActivityType } from "discord.js";
import fs from "fs";
import path from "path";

const commands = new Map();
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file: any) => file.endsWith(".ts"));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    console.log(filePath);
    const command = require(filePath);
    if ("data" in command && "execute" in command) {
      commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

export const createDiscordClient = (TOKEN: string, CLIENT_ID: string) => {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildVoiceStates,
    ],
  });

  client.on(Events.ClientReady, () => {
    if (client.user === null) {
      console.error("client.user is null");
      return;
    } else {
      console.log(`Logged in as ${client.user.tag}!`);
      client.user.setActivity('Hosting Eloquent!', { type: ActivityType.Custom });
    }
  });

  client.on(Events.ShardDisconnect, (event) => {
    console.log(`Disconnected (${event.code})!`);

    setTimeout(() => {
      client.login("YOUR_BOT_TOKEN").catch(console.error);
    }, 1000);
  });

  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = commands.get(interaction.commandName);

    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} command was found.`
      );
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);

      await interaction.followUp({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });

      return;
    }
  });

  client.login(TOKEN).catch((error) => {
    console.error(error);
    return;
  });

  return client;
};
