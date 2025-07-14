const { SlashCommandBuilder } = require('discord.js');

module.exports = class PingCommand {
  constructor() {
    this.data = new SlashCommandBuilder()
      .setName('ping')
      .setDescription('Checks bot response time');
  }

  async execute(interaction) {
    const ping = Math.round(interaction.client.ws.ping);
    await interaction.reply(`🏓 Pong! Heartbeat: ${ping}ms`);
  }
};