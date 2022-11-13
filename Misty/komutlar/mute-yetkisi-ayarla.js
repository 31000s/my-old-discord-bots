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
	
  let muteyetkisi = message.mentions.roles.first();
  
            if (!muteyetkisi) {
    const embed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(` ${emojiler} Rol etiketlemelisin! Örnek: \`\` ${prefix}mute-yetkisi-ayarla @rol \`\` `)
    message.channel.send(embed);
    return;
  }
  
  const leonesias = new Discord.RichEmbed()          
  .setColor('RANDOM')
  .setAuthor(`${bot.user.username}`, bot.user.avatarURL)
  .setDescription(`Mute yetki rolü <@&${muteyetkisi.id}> olarak ayarlandı!`)
  .setFooter(`Komutu kullanan yetkili: ${message.author.username}`, `${message.author.displayAvatarURL}`) 
   message.channel.send(leonesias)
   db.set(`muteyetkisi_${message.guild.id}`, muteyetkisi)
} 
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['mute-yetkisi-ayarla', 'set-mute-authority'],
    permLevel: 0
}

exports.help = {
    name: 'mute-yetkisi-ayarla',
    description: 'muteyetki',
    usage: 'mute-yetkisi-ayarla <>'
}