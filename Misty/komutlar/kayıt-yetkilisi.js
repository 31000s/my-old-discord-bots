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
	
  let teyit = message.mentions.roles.first();
  
        if (!teyit) {
    const embed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(` ${emojiler} Rol etiketlemelisin! Örnek: \`\` ${prefix}kayıt-yetkilisi @rol \`\` `)
    message.channel.send(embed);
    return;
  }
  
  const leonesias = new Discord.RichEmbed()      
  .setColor('RANDOM')
   .setDescription(`Rol ${teyit} olarak ayarlandı!`)
  .setFooter(`Komutu kullanan yetkili: ${message.author.username}`, `${message.author.displayAvatarURL}`) 
   message.channel.send(leonesias)
   db.set(`teyitci_${message.guild.id}`, teyit.id)
} 
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['kayıt-yetkilisi'],
    permLevel: 0
}

exports.help = {
    name: 'kayıt-yetkilisi',
    description: 'teyitcinizab',
    usage: 'kayıt-yetkilisi <rol>'
}