import { SlashCommandBuilder } from 'discord.js';

module.exports = {
	name: 'server',
	description: 'Provides information about the server.',
	async execute(interaction: any) {
		await interaction.reply(`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`);
	},
};