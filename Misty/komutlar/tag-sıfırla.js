const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')

module.exports.run = async (bot, message, args) => {
  
   let kontrol = await db.fetch(`dil_${message.guild.id}`);
  
   //emojii
       var emojiadd = await db.fetch(`mesajamoji_${message.guild.id}`);
  let emojiler = "";
  if (emojiadd === null || emojiadd === undefined){
    emojiler = "❌";
  }else {
    emojiler = emojiadd
  };
  //emoji
       if (kontrol == "TR") {
         
   const teyitmsj = new Discord.RichEmbed() 
   .setColor("RANDOM") 
     .setAuthor(`${bot.user.username}`, bot.user.avatarURL)
        .setDescription(` ${emojiler} Bu komutu kullanmaya yetkin yok!`)
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(teyitmsj);
  
let user = message.mentions.users.first() || message.guild.members.get(args[0]);
  let tagayarla = await db.fetch(`tag_${message.guild.id}`);
  
  
        if (!tagayarla) {
    const embed = new Discord.RichEmbed()
      .setColor("RED")
    .setAuthor(`${bot.user.username}`, bot.user.avatarURL)
      .setDescription(` ${emojiler} **Tag** ayarlanmamış! `)
    message.channel.send(embed);
    return;
  }
 
const leonesias = new Discord.RichEmbed()  
        
  .setColor('RANDOM')
 .setAuthor('Tag Sıfırlandı')
      .setDescription(`\` ${tagayarla} \` başarıyla sıfırlandı!`)
  .setFooter(`Komutu kullanan yetkili: ${message.author.username}`, `${message.author.displayAvatarURL}`) 
    
   message.channel.sendEmbed(leonesias)
  
  db.delete(`tag_${message.guild.id}`)
       }
  else
    {
        const teyitmsj = new Discord.RichEmbed() 
   .setColor("RANDOM") 
     .setAuthor(`${bot.user.username}`, bot.user.avatarURL)
        .setDescription(` ${emojiler} you have no auuthority to use this command`)
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(teyitmsj);
  
let user = message.mentions.users.first() || message.guild.members.get(args[0]);
  let tagayarla = await db.fetch(`tag_${message.guild.id}`);
  
  
        if (!tagayarla) {
    const embed = new Discord.RichEmbed()
      .setColor("RED")
    .setAuthor(`${bot.user.username}`, bot.user.avatarURL)
      .setDescription(` ${emojiler} Tag isn adjusted`)
    message.channel.send(embed);
    return;
  }
 
const leonesias = new Discord.RichEmbed()  
        
  .setColor('RANDOM')
      .setDescription(`\` ${tagayarla} \` succesfully reseted`)
  .setFooter(`Komutu kullanan yetkili: ${message.author.username}`, `${message.author.displayAvatarURL}`) 
    
   message.channel.sendEmbed(leonesias)
  
  db.delete(`tag_${message.guild.id}`)
      
    }
} 
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['tag-sıfırla', 'tag-reset'],
    permLevel: 0
}

exports.help = {
    name: 'tag-sıfırla',
    description: 'taggss',
    usage: 'tag-sıfırla'
}