const db = require('quick.db')
const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
var prefix = ayarlar.prefix

exports.run = async (bot, message, args) => {
  
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
  
   const embed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(` ${emojiler} Yanlış kullanım! \`\` ${prefix}sa-as [aç/kapat] \`\` `)
 
  if (!args[0]) return message.channel.send(embed)
  
  if (args[0] == 'aç' || args[0] == 'on') {
    db.set(`saas_${message.guild.id}`, 'açık')
    
     const embed = new Discord.RichEmbed()
      .setColor("GREEN")
      .setDescription(`Başarıyla botun \` Aleyküm selam \` yazmasını açtınız. Artık bot \`sa \` yazıldığında cevap verecek.`)
     .setFooter(`Yetkili: ${message.author.username}`, `${message.author.displayAvatarURL}`) 
      message.channel.send(embed)
    
  }
  
     
    
    
  if (args[0] == 'kapat' || args[0] == 'off') {
    db.set(`saas_${message.guild.id}`, 'kapali')
     const embeds = new Discord.RichEmbed()
      .setColor("GREEN")
     .setTitle(`${bot.user.username}`)
      .setDescription(`Başarıyla \`Aleyküm selam \` yazmasını kapattınız, Artık bot \`sa \` yazıldığında cevap vermeyecek.`)
     .setFooter(`Yetkili: ${message.author.username}`, `${message.author.displayAvatarURL}`) 
      message.channel.send(embeds)
    
  }

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['greeting'],
  permLevel: 0
};

exports.help = {
  name: 'sa-as',
  description: 'Selamün aleyküm, Aleyküm selam',
  usage: 'sa-as'
};