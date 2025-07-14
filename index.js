const { Client, GatewayIntentBits, Collection } = require('discord.js')
const fs = require('fs')
const path = require('path')

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
})

client.commands = new Collection()

// Load commands
const loadCommands = (dir) => {
  const commandPath = path.join(__dirname, 'src', 'commands', dir);
  const files = fs.readdirSync(commandPath);

  for (const file of files) {
    const fullPath = path.join(commandPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      loadCommands(path.join(dir, file));
    } else if (file.endsWith('.js')) {
      const Command = require(fullPath);
      const command = new Command();
      client.commands.set(command.data.name, command);
    }
  }
};
loadCommands();

// Events handler
const eventsPath = path.join(__dirname, 'src', 'events');
fs.readdirSync(eventsPath).forEach((file) => {
  const event = require(path.join(eventsPath, file));
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
});

client.login(process.env.DISCORD_TOKEN);