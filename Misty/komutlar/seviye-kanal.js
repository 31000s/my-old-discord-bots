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
  let seviyekanal = message.mentions.channels.first()
    let levelmesaj = await db.fetch(`levelmesaj_${message.guild.id}`); 
  
      if (!seviyekanal) {
    const embed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(` ${emojiler} Kanal etiketlemelisin! Örnek: \`\` ${prefix}seviye-kanal #kanal \`\` `)
    message.channel.send(embed);
    return;
  }
      
  const leonesias = new Discord.RichEmbed()     
  .setColor('RANDOM')
     .setAuthor(`${client.user.username}`, client.user.avatarURL)
  .setDescription(`Seviye Kanalı ${seviyekanal} olarak ayarlandı!`)
  .setFooter(`Yetkili: ${message.author.username}`, `${message.author.displayAvatarURL}`) 
   message.channel.send(leonesias)
   db.set(`levelkanal_${message.guild.id}`, seviyekanal.id)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['seviye-kanal'],
    permLevel: 0
};

exports.help = {
    name: ['seviye-kanal'],
      category: ['seviye-kanal'],
      description: ['seviye-kanal'],
};