const Discord = require('discord.js');
const db = require("quick.db")
const ms = require('parse-ms')
exports.run = async(client, message, args) => { 
  
let fc = await db.fetch(`DateNowFC_${message.author.id}`)
if (fc !== null && 86400000 - (Date.now() - fc) > 0) {
let time = ms(86400000 - (Date.now() - fc));

  const tan = new Discord.RichEmbed()
.setColor('BLUE')
   .setAuthor(`${client.user.username} `, client.user.avatarURL)
.setDescription(`Günlük hediyeni almana **${time.hours}** saat **${time.minutes}** dakika, **${time.seconds}** saniye var!`)
  .setTimestamp()
  .setFooter(`${message.author.username}`, `${message.author.displayAvatarURL}`)
  
message.channel.send(tan)
return
}
  
db.add(`Bakiye_${message.author.id}`, 745) 
db.set(`DateNowFC_${message.author.id}`, Date.now()) 
let bakiye = await db.fetch(`Bakiye_${message.author.id}`) || 0

const xd = new Discord.RichEmbed()
.setColor('BLUE')
   .setAuthor(`${client.user.username} `, client.user.avatarURL)
.setDescription(`Günlük ödülün: __**${bakiye}**__ 💷`)
.setFooter('Bir daha ki ödül, 24 saat sonra..')
message.channel.send(xd)
  

  
 };
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: ['günlükhediyem', 'günlük'], 
  permLevel: 0
};

exports.help = {
  name: 'günlük'
};
