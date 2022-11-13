const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db')

exports.run = async (client, message, args) => {

  let kontrol = await db.fetch(`dil_${message.guild.id}`);
  
  
   if (kontrol == "TR") {
     
      const qxd = new Discord.RichEmbed()
  .setColor('GREY')
  .setDescription(`Sunucu Sahibi: ${message.guild.owner}`)
  
  message.channel.send(qxd)
   
  
  } 
  
  else {
    
     const xd = new Discord.RichEmbed()
  .setColor('GREY')
  .setDescription(`Owner: ${message.guild.owner}`)
  
  message.channel.send(xd)
   
  }
  
 

};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['taç', "owner", 'crown'],
    permLevel: 0
};

exports.help = {
    name: 'taç',
    description: 'taç',
    usage: 'taç'
};