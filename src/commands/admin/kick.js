const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')

module.exports = class KickCommand {
  constructor() {
    this.data = new SlashCommandBuilder()
      .setName('kick')
      .setDescription('Kick a user from the server.')
      .addUserOption(option => option.setName('target').setDescription('user to kick').setRequired(true))
      .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
  }

  async execute(interaction, client) {
    // check if user is bot owner
    if (interaction.user.id !== process.env.BOT_OWNER_ID) {
      return interaction.reply({
        content: 'Only bot owner can use this command.',
        ephemeral: true
      })
    }

    const user = interaction.options.getUser('target')
    const member = interaction.guild.members.cache.get(user.id)
    
    if (!member) {
      return interaction.reply({
        content: 'User not found in this guild.',
        ephemeral: true
      })
    }
    try {
      await member.kick(`Kicked by ${interaction.user.tag}`)
      await interaction.reply(`👢 Kicked ${user.tag}`)
    } catch (err) {
      console.error(err)
      await interaction.reply({
        content: 'Failed to kick the user.',
        ephemeral: true,
      })
    }
  }
}