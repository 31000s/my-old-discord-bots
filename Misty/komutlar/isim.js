const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require("quick.db");
var prefix = ayarlar.prefix


exports.run = async(client ,message ,args) => {

  
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
  if (!message.member.hasPermission("MANAGE_NICKNAMES")) return message.channel.send(teyitmsj);
    
let user = message.mentions.members.first()

      let modlog = await db.fetch(`modlog_${message.guild.id}`);

  let isim = args[1]
  let yaş = args[2]
  
   var tagX = await db.fetch(`tag_${message.guild.id}`);
  let tag = "";
  if (tagX === null || tagX === undefined){
    tag = "";
  }else {
    tag = tagX
  };
  
    if(!user)
    return message.channel.send(
      new Discord.RichEmbed()
      .setDescription(`${emojiler} Yanlış Kullanım! Kullanıcı etiketmelisin! \` ${prefix}isim @kullanıcı [isim] [yaş] \` `)
      .setColor('RED')
    )
  
  if(!isim)
    return message.channel.send(
      new Discord.RichEmbed()
      .setDescription(`${emojiler} Yanlış Kullanım! İsim belirtmelisin!`)
      .setColor('RED')
    )
  
    
  if(!yaş)
    return message.channel.send(
      new Discord.RichEmbed()
      .setDescription(`${emojiler} Yanlış Kullanım! Yaş belirtmelisin!`)
      .setColor('RED')
    )
  
  

  
      const nog = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setTitle('Nick Log')
  .addField('Kullanıcı', `${user}`, true)
  .addField('Yeni Adı:', `${tag} ${isim} | ${yaş}`, true)
  .setThumbnail(message.author.displayAvatarURL)
  .setTimestamp()
  .setFooter(`Yetkili: ${message.author.username}`, `${message.author.displayAvatarURL}`)
  //log

      const mames = new Discord.RichEmbed()
  .setColor('GREEN')
  .setAuthor(`${client.user.username} `, client.user.avatarURL)
  .setThumbnail(user.user.avatarURL)
  .setDescription(`${user} adlı kullanıcının adı: 
  \`${tag} ${isim} | ${yaş} \` olarak değiştirildi!`)
  .setTimestamp()
  .setFooter(`Yetkili: ${message.author.username}`, `${message.author.displayAvatarURL}`)
  message.channel.send(mames)
  
  user.setNickname(`${tag} ${isim} | ${yaş}`)
  client.channels.get(modlog.id).send(nog)
  
  
  
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['isim'],
  permLevel: 0
}

exports.help = {
  name: 'isim',
  
  };