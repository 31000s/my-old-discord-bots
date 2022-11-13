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
        .setDescription(` ${emojiler} Bu komutu kullanmaya yetkin yok!`)
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(teyitmsj);
  
let user = message.mentions.users.first() || message.guild.members.get(args[0]);
  let muted = await db.fetch(`mutelogkanal_${message.guild.id}`);
  
  if (!muted) {
    const muteler = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription(`${emojiler} Kanal zaten ayarlanmamış!`)
    
  }
  
const leonesias = new Discord.RichEmbed()  
        
  .setColor('RANDOM')
  .setAuthor(`${bot.user.username}`, bot.user.avatarURL)
      .setDescription(`<@&${muted}> Başarıyla sıfırlandı!`)
  .setFooter(`Komutu kullanan yetkili: ${message.author.username}`, `${message.author.displayAvatarURL}`) 
    
   message.channel.sendEmbed(leonesias)
  
  db.delete(`mutelogkanal_${message.guild.id}`)
} 
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['mute-log-sıfırla', 'mute-log-reset'],
    permLevel: 0
}

exports.help = {
    name: 'mute-log-sıfırla',
    description: 'mute-log-sıfırla',
    usage: 'mute-log-sıfırla'
}