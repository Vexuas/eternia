const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const eternia = new Discord.Client();
eternia.commands = new Discord.Collection();

/**
 * Reads content of commands directory and returns an array of folders
 * For each folder, reads content inside it and filters files ending with .js
 * Then for each file, adds them as a command in eternia's collection as key:value
 * This right here is a thing of beauty
 */
const commandFolder = fs.readdirSync('./commands/');

for (const folder of commandFolder) {
  const commandFiles = fs
    .readdirSync(`./commands/${folder}`)
    .filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    eternia.commands.set(command.name, command);
  }
}

eternia.once('ready', () => {
  console.log('Lets go! (˶◕‿◕˶✿)');
});

eternia.on('ready', () => {});

eternia.on('message', message => {
  /**
   * Send command response if it exists, else throw a invalid message
   */
  const args = message.content.slice(prefix.length).split();
  const command = args.shift().toLowerCase();

  if (message.content.startsWith(prefix)) {
    if (eternia.commands.has(command)) {
      try {
        message.channel.startTyping();
        setTimeout(() => {
          eternia.commands.get(command).execute(message, args);
        }, 1000);
        message.channel.stopTyping();
      } catch (e) {
        console.log(error);
      }
    } else {
      try {
        message.channel.startTyping();
        setTimeout(() => {
          message.channel.send(
            `Sorry about that Master ${
              message.author.username
            }, I'm a work-in-progress and a lot of my functions are still being developed (◕︿◕✿)`
          );
        }, 1000);
        message.channel.stopTyping();
      } catch (error) {
        console.log(error);
      }
    }
  }
});

eternia.login(token);
