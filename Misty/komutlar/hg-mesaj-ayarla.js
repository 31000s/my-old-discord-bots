const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const moment = require('moment');
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
        .setDescription(` ${emojiadd} Bu komutu kullanmaya yetkin yok!`)
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(teyitmsj);
  
  let hgmesaj = await db.fetch(`hgmesaj_${message.guild.id}`);
  let mesaj = args.join(" ")
  
 
  
  //${member.guild.members.size}
   
      if (!mesaj) {
    const embed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(` ${emojiler} Kanal etiketlemelisin! Örnek: \`\` ${prefix}hg-mesaj-ayarla [mesaj] \`\` `)
    message.channel.send(embed);
    return;
  }
      
   message.channel.send(`${hgmesaj}`,{ split: true, code: "xl" })
   db.set(`hgmesaj_${message.guild.id}`, mesaj)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['hg-mesaj-ayarla'],
    permLevel: 0
};

exports.help = {
    name: ['hg-mesaj-ayarla'],
      category: ['hg-mesaj-ayarlass'],
      description: ['kayıt-mesaj-ayarlass'],
};