const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')

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
        .setDescription(` ${emojiler} Bu komutu kullanmaya yetkin yok!`)
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(teyitmsj);
  
let user = message.mentions.users.first() || message.guild.members.get(args[0]);
  let banayarla = await db.fetch(`banayarla_${message.guild.id}`);
  
  
 
const leonesias = new Discord.RichEmbed()  
        
  .setColor('RANDOM')
   .setAuthor(`${bot.user.username}`, bot.user.avatarURL)
      .setDescription(`<@&${banayarla.id}> Başarıyla sıfırlandı!`)
  .setFooter(`Komutu kullanan yetkili: ${message.author.username}`, `${message.author.displayAvatarURL}`) 
    
   message.channel.sendEmbed(leonesias)
  
  db.delete(`banayarla_${message.guild.id}`)
} 
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['ban-rolü-sıfırla', 'ban-role-reset'],
    permLevel: 0
}

exports.help = {
    name: 'ban-rolü-sıfırla',
    description: 'banssz',
    usage: 'ban-sıfırla'
}