import { Client, GatewayIntentBits, Collection, Events } from "discord.js";
import commands from "./commandsLoader";

export const createDiscordClient = (TOKEN: string, CLIENT_ID: string) => {
  const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

  client.on(Events.ClientReady, () => {
    if (client.user === null) {
      console.error("client.user is null");
    } else {
      console.log(`Logged in as ${client.user.tag}!`);
    }
  });

  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = commands.find((cmd: any) => cmd.name === interaction.commandName);

    if (!command) return;

    console.log(command);

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
    }
  });

  client.login(TOKEN);
};
