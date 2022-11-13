const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db')

exports.run = async (client, message, args) => {
  
  let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;
  
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
  let noxpkanal = message.mentions.channels.first()
 
  
      if (!noxpkanal) {
  let emojiadd = await db.fetch(`mesajamoji_${message.guild.id}`);
    const embed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(` ${emojiler} Kanal etiketlemelisin! Örnek: \`\` ${prefix}no-xp-kanal #kanal \`\` `)
    message.channel.send(embed);
    return;
  }
      
  const leonesias = new Discord.RichEmbed()     
  .setColor('RANDOM')
     .setAuthor(`${client.user.username}`, client.user.avatarURL)
  .setDescription(`No Xp Kanalı ${noxpkanal} olarak ayarlandı!`)
  .setFooter(`Komutu kullanan yetkili: ${message.author.username}`, `${message.author.displayAvatarURL}`) 
   message.channel.send(leonesias)
   db.set(`noxpkanal_${message.guild.id}`, noxpkanal.id)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['no-xp-kanal'],
    permLevel: 0
};

exports.help = {
    name: ['no-xp-kanal'],
      category: ['no-xp-kanal'],
      description: ['no-xp-kanal'],
};