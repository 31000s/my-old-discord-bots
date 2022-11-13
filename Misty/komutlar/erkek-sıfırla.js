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
  
  let erkek = await db.fetch(`erkekverolk_${message.guild.id}`);

  
    if (!erkek) {
    const migo = new Discord.RichEmbed()
    .setColor('BLUE')
    .setDescription(`${emojiler} Ayarlanmamış rolü, sıfırlayamazsın!`)
    .setFooter(`Yetkili: ${message.author.username}`, `${message.author.displayAvatarURL}`)
    
    message.channel.send(migo)
    return;
  }
  
   const hehemigoadim = new Discord.RichEmbed()  
  .setColor('RANDOM')
  .setAuthor(`${client.user.username}`, client.user.avatarURL)
  .setDescription(`<@&${erkek}> Başarıyla sıfırlandı!`)
  .setFooter(`Komutu kullanan yetkili: ${message.author.username}`, `${message.author.displayAvatarURL}`) 
   message.channel.sendEmbed(hehemigoadim)
  db.delete(`erkekverolk_${message.guild.id}`)
  
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['erkek-sıfırla'],
    permLevel: 0
};

exports.help = {
    name: ['erkek-sıfırla'],
      category: ['erkek-sıfırla'],
      description: ['erkek-sıfırla'],
};