import { Client } from "discord.js";
import { Player } from "discord-player";

export const createMusicController = (client: Client) => {
  const player = new Player(client);

  player.extractors.loadDefault().then(() => console.log("Extractors loaded."));

  player.events.on("error", (queue, error) => {
    console.log(`Error emitted from the queue: ${error.message}`);
  });

  player.events.on("playerStart", (queue, track) => {
    if (!queue.metadata || !queue.metadata.channel) return;
    queue.metadata.channel
      .send(`Started playing **${track.title}**!`)
      .catch(console.error);
  });

  player.events.on("playerStart", (queue, track) => {
    if (!queue.metadata || !queue.metadata.channel) return;
    queue.metadata.channel
      .send(`Started playing: **${track.title}**`)
      .catch(console.error);
  });

  player.events.on("audioTrackAdd", (queue, track) => {
    if (!queue.metadata || !queue.metadata.channel) return;
    queue.metadata.channel
      .send(`Track **${track.title}** queued`)
      .catch(console.error);
  });

  player.events.on("audioTracksAdd", (queue, track) => {
    if (!queue.metadata || !queue.metadata.channel) return;
    queue.metadata.channel.send(`Multiple Track's queued`).catch(console.error);
  });

  player.events.on("playerSkip", (queue, track) => {
    if (!queue.metadata || !queue.metadata.channel) return;
    queue.metadata.channel
      .send(`Skipping **${track.title}** due to an issue!`)
      .catch(console.error);
  });

  player.events.on("disconnect", (queue) => {
    if (!queue.metadata || !queue.metadata.channel) return;
    queue.metadata.channel
      .send("Looks like my job here is done, leaving now!")
      .catch(console.error);
  });

  player.events.on("emptyChannel", (queue) => {
    if (!queue.metadata || !queue.metadata.channel) return;
    queue.metadata.channel
      .send(`Leaving because no vc activity for the past 5 minutes`)
      .catch(console.error);
  });

  player.events.on("emptyQueue", (queue) => {
    if (!queue.metadata || !queue.metadata.channel) return;
    queue.metadata.channel.send("Queue finished!").catch(console.error);
  });

  return player;
};
