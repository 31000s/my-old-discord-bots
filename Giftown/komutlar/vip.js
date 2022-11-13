const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json')
const ayar = require('../ayar.json');
const db = require('quick.db')

module.exports.run = async (bot, message, args) => {
 if (!message.member.roles.has('743591658561601789'))  return message.reply("Bu komutu kullanmak için gerekli yetkiye sahip değilsin.");
  let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
 
   let lenopod = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setDescription(`Bir kullanıcı etiketlemelisin!`)
  .setFooter(`Komutu kullanan yetkili: ${message.author.username}`, `${message.author.displayAvatarURL}`) 
  if (!user) return message.channel.sendEmbed(lenopod)

const leonesia = new Discord.RichEmbed()  
  .setColor('RANDOM')
  .setDescription(`${user} adlı kullanıcıya <@&742492025731154041> rolü başarıyla verildi!`)
  .setFooter(`Yetkili: ${message.author.username}`, `${message.author.displayAvatarURL}`) 
  
   user.addRole('742492025731154041')
   message.channel.sendEmbed(leonesia)

} 
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['vip'],
    permLevel: 0
}

exports.help = {
    name: 'vip',
    description: 'vip rolü verir',
    usage: 'vip <kişi>'
}