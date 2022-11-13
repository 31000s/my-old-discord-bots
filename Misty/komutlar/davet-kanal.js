const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db')

exports.run = async (client, message, args) => {
  
var prefix = ayarlar.prefix;

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
  let kanal = message.mentions.channels.first()
 
  
      if (!kanal) {
  let emojiadd = await db.fetch(`mesajamoji_${message.guild.id}`);
    const embed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(` ${emojiler} Kanal etiketlemelisin! Örnek: \`\` ${prefix}davet-kanal #kanal \`\` `)
    message.channel.send(embed);
    return;
  }
      
  const leonesias = new Discord.RichEmbed()     
  .setColor('RANDOM')
     .setAuthor(`${client.user.username}`, client.user.avatarURL)
  .setDescription(`Davet kanalı ${kanal} olarak ayarlandı!`)
  .setFooter(`Komutu kullanan yetkili: ${message.author.username}`, `${message.author.displayAvatarURL}`) 
   message.channel.send(leonesias)
   db.set(`davetkanal_${message.guild.id}`, kanal.id)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['davet-kanal', 'invite-channel'],
    permLevel: 0
};

exports.help = {
    name: ['davet-kanal'],
      category: ['davet-kanal'],
      description: ['davet-kanal'],
};