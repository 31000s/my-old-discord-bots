const Discord = require("discord.js");
const db = require("quick.db")

exports.run = async (client, message, args) => {

let user = message.mentions.users.first() || message.author

let bakiye = await db.fetch(`Bakiye_${user.id}`) || 0

const bak = new Discord.RichEmbed()
.setColor('RED')
.setTitle(`__**Bakiye**__`)
.setDescription(`
Kullanıcı: ${user}
Bakiyesi: __${bakiye}__`)
.setThumbnail(user.avatarURL)
  .setTimestamp()
  .setFooter(`${message.author.username}`, `${message.author.displayAvatarURL}`)

message.channel.send(bak)
  
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['bakiyem', 'bakiye'],
  permLevel: 0,
}
exports.help = {
    name: 'bakiye',
    description: 'Ekonomi botu - Bakiye',
    usage: 'prefix+bakiyem'
}