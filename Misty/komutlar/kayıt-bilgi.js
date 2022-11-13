const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')
const moment = require('moment');

module.exports.run = async (bot, message, args) => {
  
  let uye = message.mentions.users.first() || message.author;
let kiz = db.fetch(`kayitKiz_${uye.id}`)
let erkek = db.fetch(`kayiterkek_${uye.id}`)

  var xd = db.fetch(`kayiterkek_${uye.id}`)
  let ana = "";
  if (xd === null || xd === undefined){
    ana = "0";
  }else {
    ana = xd
  };
  
    var giz = db.fetch(`kayitKiz_${uye.id}`)
  let bebek = "";
  if (giz === null || giz === undefined){
    bebek = "0";
  }else {
    bebek = giz
  };
  
  
    const stats = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setDescription('**__KAYIT İSTATİSTİĞİ__**')
  .addField('Erkek:', `${ana}`, true)
  .addField('Kadın:', ` ${bebek}`, true)
  .addField('Toplam:', ` ${kiz+erkek}`, true)
    .setThumbnail(uye.avatarURL)
  .setTimestamp()
    
  .setFooter(`Yetkili: ${message.author.username}`, `${message.author.displayAvatarURL}`)
  message.channel.send(stats)
  

} 

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['kayıt-bilgi'],
    permLevel: 0
}

exports.help = {
    name: 'kayıt-bilgi',
    description: 'kayıt-bilgi',
    usage: 'kayıt-bilgi'
}