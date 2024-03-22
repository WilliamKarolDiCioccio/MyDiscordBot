import { SlashCommandBuilder } from "discord.js";
import * as math from "mathjs";
import { logger } from "../../utils/logger";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("evaluate")
    .setDescription("Evaluates a math expression.")
    .addStringOption((option) =>
      option
        .setName("expression")
        .setDescription("The math expression to evaluate.")
        .setRequired(true)
    ),
  async execute(interaction: any) {
    const expression: string = interaction.options.getString("expression");

    if (!expression) {
      logger.error("No expression provided.");
      return;
    }

    await interaction.deferReply();

    const result = math.evaluate(expression);

    await interaction.followUp(`The result of ${expression} is ${result}`);
  },
};
