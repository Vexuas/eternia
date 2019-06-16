const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const eternia = new Discord.Client();

eternia.commands = new Discord.Collection();

eternia.once('ready', () => {
  console.log('Lets go! (˶◕‿◕˶✿)');
});

eternia.on('ready', () => {});

eternia.on('message', message => {
  if (message.content.startsWith(prefix)) {
    message.channel.send(
      `Sorry about that Master ${
        message.author.username
      }, I'm a work-in-progress and a lot of my functions are still being developed (◕︿◕✿)`
    );
  }
});

eternia.login(token);
