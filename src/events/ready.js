const { execute } = require("./interactionCreate");

module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    console.log(`${client.user.tag} successfuly logged in!`)

    // Set bot presence
    client.user.setPresence({
      activities: [
        {
          name: 'Sanbi JS',
          type: 3 // Watching
        }
      ],
      status: 'online'
    })
  }
}