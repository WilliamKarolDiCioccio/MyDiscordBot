import { SlashCommandBuilder } from "discord.js";
import { useMainPlayer, QueryType } from "discord-player";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Plays music in the voice channel.")
    .addStringOption((option) =>
      option
        .setName("song")
        .setDescription("The name or URL of the song to play.")
        .setRequired(true)
    ),
  async execute(interaction: any) {
    const voiceChannel = interaction.member.voice.channel;
    if (!voiceChannel) {
      await interaction.reply({
        content: "You need to be in a voice channel to play music!",
        ephermal: true,
      });
      return;
    }

    const player = useMainPlayer();
    const song = interaction.options.getString("song", true);
    const searchResult = await player.search(song, {
      requestedBy: interaction.user,
      searchEngine: QueryType.AUTO,
    });

    if (!searchResult || !searchResult.tracks.length) {
      return interaction.followUp({
        content: "No tracks found!",
        ephemeral: true,
      });
    }

    await interaction.deferReply();

    try {
      await player.play(voiceChannel, song, {
        nodeOptions: {
          metadata: interaction,
          selfDeaf: false,
        },
      });
    } catch (error) {
      console.error(error);

      return interaction.followUp({
        content: "There was an error while trying to play music!",
        ephemeral: true,
      });
    }
  },
};
