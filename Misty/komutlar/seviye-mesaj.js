const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const moment = require('moment');
const db = require('quick.db');

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
        .setDescription(` ${emojiadd} Bu komutu kullanmaya yetkin yok!`)
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(teyitmsj);
  
  let levelmesaj = await db.fetch(`levelmesaj_${message.guild.id}`);
  let mesaj = args.join(" ")
   

      
   message.channel.send(`${levelmesaj}`,{ split: true, code: "xl" })
   db.set(`levelmesaj_${message.guild.id}`, mesaj)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['seviye-mesaj'],
    permLevel: 0
};

exports.help = {
    name: ['seviye-mesaj'],
      category: ['seviye-mesaj'],
      description: ['seviye-mesaj'],
};