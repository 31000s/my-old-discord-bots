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
   .setDescription(` ${emojiler} Bu komut **sunucu sahibine** özeldir!`)
   if(message.author.id !== message.guild.owner.user.id) return message.channel.send(teyitmsj);
	
  let uyari = message.mentions.roles.first();
  let xd = args[1]
  
      if (!uyari) {
    const embed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(` ${emojiler} Cezalı rolü etiketlemelisin! Örnek: \`\` ${prefix}uyarı-ayarla @rol <sayı> \`\` `)
       message.channel.send(embed);
       return;} 
  
  if (!xd) {
    const embed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(` ${emojiler} Uyarı sayısını ayarla. Örnek: \`\` ${prefix}uyarı-ayarla @rol <sayı> \`\` `)
       message.channel.send(embed);
       return;
  }
  
  
  const anx = new Discord.RichEmbed()  
  .setColor('RANDOM')
  .setDescription(`
**__Uyarı sayısı ve cezalı rolü ayarlandı!__**

Cezalı rolü: ${uyari}

Uyarı sayısı: **${xd}**`)
  .setFooter(`Yetkili: ${message.author.username}`, `${message.author.displayAvatarURL}`) 
   message.channel.send(anx)
   db.set(`uyariayarla_${message.guild.id}`, uyari.id)
  db.set(`uyarisayi_${message.guild.id}`, xd)
} 
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['uyarı-ayarla', 'alert-set'],
    permLevel: 0
}

exports.help = {
    name: 'uyarı-ayarla',
    description: 'uyarı-ayarla',
    usage: 'uyarı-ayarla @rol <>'
}