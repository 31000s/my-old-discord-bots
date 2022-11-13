const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const moment = require('moment');
const db = require('quick.db')

exports.run = async (client, message, args) => {
     
var prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;


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
  
  let giriş = await db.fetch(`davetmesaj_${message.guild.id}`);
  let çıkış = await db.fetch(`leavemesajd_${message.guild.id}`);
  let kanal = await db.fetch(`davetkanal_${message.guild.id}`);
   
const xd = new Discord.RichEmbed()
  .setColor("RANDOM") 
.setAuthor(`${client.user.username}`, client.user.avatarURL)
.setDescription(`Davet sistemi başarıyla **kapatıldı**!`)
.setFooter(`Yeniden açmak için; davet kanalını ayarlayabilirsin.`)
   message.channel.send(xd)
   db.delete(`davetmesaj_${message.guild.id}`)
  db.delete(`leavemesajd_${message.guild.id}`)
  db.delete(`davetkanal_${message.guild.id}`)
  
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['davet-sistemi-kapat', 'davet-sistemi-kapat'],
    permLevel: 0
};

exports.help = {
    name: ['davet-sistemi-kapat'],
      category: ['davet-sistemi-kapat'],
      description: ['davet-sistemi-kapat'],
};