const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '$ ';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);  
});

let commandes = [
  {
    name: 'ping',
    action: (args, message) => {
      message.channel.send(`ping : \`${client.ping}\` ms`);
    }
  },
  {
    name: 'team',
    help (): 'the help',
    action: (args, message, commande) => {
      console.log(args);
      if (args.length > 0) {
        makeChannel(message.guild, args[0]); 
      }
      else {
        error(message, `\`${commande.name}\`commande need 1 paramenter\nSee the help: \`${prefix}${commande.name} -h\``);
      }
    }
  }
];

function help(commande) {
  
}

client.on('message', message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  
  let texte = message.content.substr(prefix.length);
  let args = split(texte);
  
  commandes.forEach(commande => {
    if (args[0] === commande.name) {
      args.shift();
      commande.action(args, message, commande);
    }
  });
});

function makeChannel(guild, name){
  cheeckTeam(guild);
  guild.createChannel(name, "text");
}

function error(message, text) {
  console.log(message);
  message.reply('ERROR:\n' + text,
  {embed:{
    color:2342324
  }});
}



function cheeckTeam(guild,name) {
  let roles = guild.roles;
  
   roles.find(role => role.name === 'Team_1');
}

function split(input) {
  let array = [];
  let previous = 0;
  input += ' ';
  let string = false;

  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    switch (char) {
      case ' ':
        if (!string) {
          if (previous !== i) array.push(input.substring(previous, i));
          previous = i+1;
        }
      break;
      case '"':
        if (previous !== i) array.push(input.substring(previous, i));
        previous = i+1;
        string = !string;
      break;
    
      default:
        break;
    }
  }
  if (string) {
    throw `syntaxe error : " at ${previous} is never close`;
  }

  return array;
}




client.login('NjQ1ODk1ODM1NzExOTYzMTQ3.XdJX_w.ltF3lk7DHCa-nWGWhVIkO18mUdY');