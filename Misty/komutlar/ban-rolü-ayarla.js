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
        .setDescription(` ${emojiler} Bu komutu sadece **Sunucu kurucusu** kullanabilir!`)
    if(message.author.id !== message.guild.owner.user.id) return message.channel.send(teyitmsj);
  
  
	
  let banayarla = message.mentions.roles.first();
  
            if (!banayarla) {
    const embed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(` ${emojiler} Rol etiketlemelisin! Örnek: \`\` ${prefix}ban-rolü-ayarla @rol \`\` `)
    message.channel.send(embed);
    return;
  }
  
  const leonesias = new Discord.RichEmbed()          
  .setColor('RANDOM')
  .setAuthor('Ban rolü ayarlandı!', )
  .setDescription(`Rol <@&${banayarla.id}> olarak ayarlandı!`)
  .setFooter(`Komutu kullanan yetkili: ${message.author.username}`, `${message.author.displayAvatarURL}`) 
   message.channel.send(leonesias)
   db.set(`banayarla_${message.guild.id}`, banayarla.id)
} 
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['ban-rolü-ayarla', 'set-ban-role'],
    permLevel: 0
}

exports.help = {
    name: 'ban-rolü-ayarla',
    description: 'bans',
    usage: 'ban-ayarla <rol>'
}