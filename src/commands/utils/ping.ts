import { SlashCommandBuilder } from "discord.js";

module.exports = {
  name: "ping",
  description: "Replies with Pong!",
  async execute(interaction: any) {
    await interaction.reply("Pong!");
  },
};
