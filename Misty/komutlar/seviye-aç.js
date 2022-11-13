const Discord = require('discord.js');
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')



exports.run = async(client, message, args) => { 

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
     .setAuthor(`${client.user.username}`, client.user.avatarURL)
        .setDescription(` ${emojiler} Bu komutu kullanmaya yetkin yok!`)
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(teyitmsj);

 let hm = await db.fetch(`seviyeacik_${message.guild.id}`)
  
  let migoleon = new Discord.RichEmbed()
  .setAuthor(`${client.user.username}`, client.user.avatarURL)
  .setColor('RANDOM')
  .setDescription(`Seviye sistemi **aktif edildi!**`)
  .setFooter(`Yetkili: ${message.author.username}`, `${message.author.displayAvatarURL}`)
  message.channel.send(migoleon)

db.set(`seviyeacik_${message.guild.id}`, 'açık')

};
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: [], 
  permLevel: 0
};

exports.help = {
  name: 'seviye-aç',
  description: 'taslak', 
  usage: 'seviye-aç'
};