const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')
let prefix = ayarlar.prefix

module.exports.run = async (bot, message, args) => {
 //emojii
       var emojiadd = await db.fetch(`mesajamoji_${message.guild.id}`);
  let emojiler = "";
  if (emojiadd === null || emojiadd === undefined){
    emojiler = "❌";
  }else {
    emojiler = emojiadd
  };
  //emoji
     const teyitmsj = new Discord.RichEmbed() 
   .setColor("RANDOM") 
     .setAuthor(`${bot.user.username}`, bot.user.avatarURL)
        .setDescription(` ${emojiler} Bu komutu sadece **Sunucu kurucusu kullanabilir.**`)
    if(message.author.id !== message.guild.owner.user.id) return message.channel.send(teyitmsj);
	
   let kanal = message.mentions.channels.first()
  
            if (!kanal) {
    const embed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(` ${emojiler} Kanal etiketlemelisin! Örnek: \`\` ${prefix}ban-log #kanal \`\` `)
    message.channel.send(embed);
    return;
  }
  
  const leonesias = new Discord.RichEmbed()          
  .setColor('RANDOM')
   .setAuthor(`${bot.user.username}`, bot.user.avatarURL)
  .setDescription(`Ban log kanalı ${kanal} olarak ayarlandı!`)
  .setFooter(`Komutu kullanan yetkili: ${message.author.username}`, `${message.author.displayAvatarURL}`) 
   message.channel.send(leonesias)
   db.set(`banlog_${message.guild.id}`, kanal.id)
} 
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['ban-log'],
    permLevel: 0
}

exports.help = {
    name: 'ban-log',
    description: 'ban-log',
    usage: 'ban-log <>'
}