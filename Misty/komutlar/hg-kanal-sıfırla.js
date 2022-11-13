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
        .setDescription(` ${emojiler} Bu komutu kullanmaya yetkin yok!`)
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(teyitmsj);
	
let user = message.mentions.users.first() || message.guild.members.get(args[0]);
  let hgkanal = await db.fetch(`hgkanal_${message.guild.id}`);
  
    if (!hgkanal) {
    const embed = new Discord.RichEmbed()
      .setColor("RED")
     .setAuthor(`${bot.user.username}`, bot.user.avatarURL)
      .setDescription(` ${emojiler} Hg Kanal Ayarlanmamış! `)
    message.channel.send(embed);
    return;
  }
  
const leonesias = new Discord.RichEmbed()  
        
  .setColor('RANDOM')
    .setAuthor(`${bot.user.username}`, bot.user.avatarURL)
      .setDescription(`${hgkanal} Başarıyla sıfırlandı!`)
  .setFooter(`Komutu kullanan yetkili: ${message.author.username}`, `${message.author.displayAvatarURL}`) 
    
   message.channel.sendEmbed(leonesias)
  
  db.delete(`hgkanal_${message.guild.id}`)
} 
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['hgbb-kanal-sıfırla'],
    permLevel: 0
}

exports.help = {
    name: 'hg-kanal-sıfırla',
    description: 'hg-kanal-sıfırla',
    usage: 'hg-kanal-sıfırla'
}