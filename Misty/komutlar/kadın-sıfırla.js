const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db')
var prefix = ayarlar.prefix;

exports.run = async (client, message, args) => {
  
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
  
  let kizkadinbayan = await db.fetch(`kizkadinbayank_${message.guild.id}`);
  
  
   if (!kizkadinbayan) {
    const migo = new Discord.RichEmbed()
    .setColor('BLUE')
     .setAuthor(`${client.user.username}`, client.user.avatarURL)
    .setDescription(`${emojiler} Ayarlanmamış rolü, sıfırlayamazsın!`)
    .setFooter(`Yetkili: ${message.author.username}`, `${message.author.displayAvatarURL}`)
    
    message.channel.send(migo)
    return;
  }
  
   const hehemigoadim = new Discord.RichEmbed()  
  .setColor('RANDOM')
 .setAuthor(`${client.user.username}`, client.user.avatarURL)
      .setDescription(`<@&${kizkadinbayan}> Başarıyla sıfırlandı!`)
  .setFooter(`Komutu kullanan yetkili: ${message.author.username}`, `${message.author.displayAvatarURL}`) 
   message.channel.sendEmbed(hehemigoadim)
  db.delete(`kizkadinbayank_${message.guild.id}`)
  
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['kadın-sıfırla'],
    permLevel: 0
};

exports.help = {
    name: ['kadın-sıfırla'],
      category: ['kadın-sıfırla'],
      description: ['kadın-sıfırla'],
};