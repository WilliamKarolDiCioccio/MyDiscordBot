import { SlashCommandBuilder } from "discord.js";
import { logger } from "../../utils/logger";
import { ollama } from "../../utils/ollamaModel";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ask")
    .setDescription("Replies using the ollama llm model.")
    .addStringOption((option) =>
      option
        .setName("question")
        .setDescription("Your question can be anything.")
        .setRequired(true)
    ),
  async execute(interaction: any) {
    const question: string = interaction.options.getString("question");

    if (!question) {
      logger.error("No question provided.");
      return;
    }

    await interaction.deferReply();

    const response = await ollama.chat({
      model: "eloquent:llama2",
      messages: [{ role: "user", content: question }],
    });

    await interaction.followUp(response.message.content);
  },
};
