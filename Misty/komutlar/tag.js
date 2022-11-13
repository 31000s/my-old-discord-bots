const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db')
var prefix = ayarlar.prefix;



exports.run = async (client, message, args) => {
  
  let tag = await db.fetch(`tag_${message.guild.id}`); 
  let kontrol = await db.fetch(`dil_${message.guild.id}`);

  if (kontrol == "TR") {
         if (!tag) {
    const embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setDescription(`Tag ayarlanmamış! \`\` ${prefix}tag-set [tag] \`\` `)
    message.channel.send(embed);
           
           message.channel.send(tag)
  }
  }
  else {
      
         if (!tag) {
    const embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setDescription(`Tag wasnt adjusted To adjust: \`\` ${prefix}tag-set [tag] \`\` `)
    message.channel.send(embed);
           
           message.channel.send(tag)
  }
    }

      
  }

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['tag'],
    permLevel: 0
};

exports.help = {
    name: ['tag'],
      category: ['tag'],
      description: ['tag'],
};