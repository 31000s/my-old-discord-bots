const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json')
const ayar = require('../ayar.json');
const db = require('quick.db')

module.exports.run = async (bot, message, args) => {
  
  var p = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;
  
  
  const xd = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setDescription(`__**Yardım Menüsü**__
<a:kristal1:743100937412804689> **${p}rank** = Attığınız dosya(resim, gif) sayısını gösterir.
<a:kristal1:743100937412804689> **${p}top** = Gif/Pp sıralamasını gösterir.
<a:kristal1:743100937412804689> **${p}level-rank** = Seviyenizi gösterir.
<a:kristal1:743100937412804689> **${p}invites** = Davet sayını gösterir.
<a:kristal1:743100937412804689> **${p}davet-top** = Davet sıralamasını gösterir.
<a:kristal1:743100937412804689> **${p}say** = Sunucunun istatiklerini gösterir.
`)


  
message.channel.send(xd)

  


} 
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['help', 'yardım'],
    permLevel: 0
}

exports.help = {
    name: 'help',
    description: 'help',
    usage: 'help'
}