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
  
  let user = message.mentions.users.first() || message.guild.members.get(args[0]);
  let mesaj = await db.fetch(`kayitmesaj_${message.guild.id}`);
  let kanal = message.mentions.channels.first()
 
  
      if (!kanal) {
  let emojiadd = await db.fetch(`mesajamoji_${message.guild.id}`);
    const embed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(` ${emojiler} Kanal etiketlemelisin! Örnek: \`\` ${prefix}hgbb-kanal-ayarla #kanal \`\` `)
    message.channel.send(embed);
    return;
  }
      
  const leonesias = new Discord.RichEmbed()     
  .setColor('RANDOM')
     .setAuthor(`${client.user.username}`, client.user.avatarURL)
  .setDescription(`Kanal <#${kanal.id}> olarak ayarlandı!`)
  .setFooter(`Komutu kullanan yetkili: ${message.author.username}`, `${message.author.displayAvatarURL}`) 
   message.channel.send(leonesias)
   db.set(`kayitmesaj_${message.guild.id}`, kanal.id)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['hgbb-kanal-ayarla'],
    permLevel: 0
};

exports.help = {
    name: ['hgbb-kanal-ayarlass'],
      category: ['hgbb-kanal-ayarlass'],
      description: ['hgbb-kanal-ayarla'],
};