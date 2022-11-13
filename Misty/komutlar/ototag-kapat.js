const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');
const prefix = ayarlar.prefix;

exports.run = async(client, message, args) =>{
  
let ototag = await db.fetch(`mistyototag_${message.guild.id}`) || await db.fetch(`mistykanal_${message.guild.id}`)

if(!ototag) return message.reply(`:x: Bu sistem zaten kapalı durumda. Açmak için **${prefix}ototag rol kanal**`)
  
db.delete(`mistyototag_${message.guild.id}`) 
db.delete(`mistykanal_${message.guild.id}`)
  
  const xd = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setAuthor(`${client.user.username}`, client.user.avatarURL)
  .setDescription(`**Ototag kapatıldı!** Yeni gelen kullanıcılara hiç bir rol vermeyeceğim.`)
  
message.channel.send(xd)
};  
exports.conf = {
  enabled: false, 
  guildOnly: false, 
  aliases: ['ototag-kapat', 'autotag-off'],
  permLevel: 0 
};
exports.help = {
  name: 'ototagkapat',
  description: 'Ototag Sistemi',
  usage: 'ototagkapat'
};
