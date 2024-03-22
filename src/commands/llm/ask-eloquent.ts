import { SlashCommandBuilder } from "discord.js";
import { Ollama } from "ollama";
import { logger } from "../../utils/logger";

const ollama = new Ollama({ host: "http://ollama:11434" });

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
      model: "llama2",
      messages: [{ role: "user", content: question }],
    });

    await interaction.followUp(response.message.content);
  },
};
