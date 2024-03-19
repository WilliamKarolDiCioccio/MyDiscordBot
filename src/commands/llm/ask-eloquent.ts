import { SlashCommandBuilder } from "discord.js";
import ollama from "ollama";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ask-eloquent")
    .setDescription("Replies using the ollama llm model.")
    .addStringOption((option) =>
      option
        .setName("question")
        .setDescription("Your question can be anything.")
        .setRequired(true)
    ),
  async execute(interaction: any) {
    const question = interaction.options.getString("question");

    interaction.deferReply();

    const response = await ollama.chat({
      model: 'llama2',
      messages: [{ role: 'user', content: question }],
    })


    await interaction.followUp(response.message.content);
  },
};
