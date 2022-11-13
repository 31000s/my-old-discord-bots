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
	
  let kayitsiz = message.mentions.roles.first();
  
      if (!kayitsiz) {
     let emojiadd = await db.fetch(`mesajamoji_${message.guild.id}`);
    const embed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(` ${emojiler} Rol etiketlemelisin! Örnek: \`\` ${prefix}kayıtsız-rolü @rol \`\` `)
       message.channel.send(embed);
       return;
  } 
  
  
  const kayitsizderler = new Discord.RichEmbed()  
  .setColor('RANDOM')
  .setAuthor(' Kayıtsız rolü ayarlandı!')
  .setDescription(`Rol <@&${kayitsiz.id}> olarak ayarlandı!`)
  .setFooter(`Komutu kullanan yetkili: ${message.author.username}`, `${message.author.displayAvatarURL}`) 
   message.channel.send(kayitsizderler)
   db.set(`kayitsiz_${message.guild.id}`, kayitsiz)
} 
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['kayıtsız-rolü'],
    permLevel: 0
}

exports.help = {
    name: 'kayıtsız-rolü',
    description: 'kayıtsız',
    usage: 'kayıtsız-rolü <rol>'
}