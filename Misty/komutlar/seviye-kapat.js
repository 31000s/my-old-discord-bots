const Discord = require('discord.js');
const db = require('quick.db')
const ayarlar = require('../ayarlar.json');



exports.run = async(client, message, args) => { 
  
  let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;

   let hm = await db.fetch(`seviyeacik_${message.guild.id}`)

let noxprol = await db.fetch(`noxprol_${message.guild.id}`) //NO XP ROL
let noxpkanal = await db.fetch(`noxpkanal_${message.guild.id}`) //NO XP KANAL
let levelkanal = await db.fetch(`levelkanal_${message.guild.id}`) //LEVEL KANAL

let levelmesaj = await db.fetch(`levelmesaj_${message.guild.id}`)


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

const xd = new Discord.RichEmbed()
      .setColor("RED")
      .setAuthor(`${client.user.username}`, client.user.avatarURL)
      .setDescription(`Seviye sistemi **devre dışı** bırakıldı! `)
      .setFooter(`Yetkili: ${message.author.username}`, `${message.author.displayAvatarURL}`) 

  message.channel.send(xd).then(x => {
    
   db.delete(`seviyeacik_${message.guild.id}`) 
   db.delete(`noxpkanal_${message.guild.id}`) 
   db.delete(`levelkanal_${message.guild.id}`)
   db.delete(`levelmesaj_${message.guild.id}`)

  const embed = new Discord.RichEmbed()
      .setColor("RED")
      .setAuthor(`${client.user.username}`, client.user.avatarURL)
      .setDescription(`Level Sistemi **devre dışı** bırakıldı! Tekrar açmak için: \`\` ${prefix}seviye-aç \`\` `)
      .setFooter(`Yetkili: ${message.author.username}`, `${message.author.displayAvatarURL}`) 
  x.edit(embed)  
    
  }, 5000)
  
  

  
  };
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: [], 
  permLevel: 0
};

exports.help = {
  name: 'seviye-kapat',
  description: 'level', 
  usage: 'seviye-kapat'
};