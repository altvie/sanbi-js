const { execute } = require("./interactionCreate");

module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    console.log(`${client.user.tag} successfuly logged in!`)
  }
}