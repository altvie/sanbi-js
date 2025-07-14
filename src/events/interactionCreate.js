module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName)
      if (command) {
        try {
          await command.execute(interaction, client)
        } catch (err) {
          console.error(err)
          await interaction.reply({
            content: 'Error executing command.',
            ephemeral: true
          })
        }
      } else {
        return;
      }
    } else {
      return;
    }
  }
}