const Discord = require("discord.js");
const db = require("quick.db")

exports.run = async (client, message, args) => {
	
let bakiye = await db.fetch(`Bakiye_${message.author.id}`) || 0
  
let user = message.mentions.users.first()
let gonder = args[1]


 const mio = new Discord.RichEmbed()
.setColor('RED')
   .setDescription(`Bir kullanıcı etiketlemelisin!`)

if(!user) return message.channel.send(mio)
  
   const tav = new Discord.RichEmbed()
.setColor('RED')
   .setDescription(`Göndereceğin para miktarını yazmalısın!`)
  
if(!gonder) return message.channel.send(tav)
  
   const sith = new Discord.RichEmbed()
.setColor('RED')
   .setDescription(`Yetersiz bakiye! Paran: __${bakiye}__`)
  

if(bakiye < gonder) return message.channel.send(sith)

db.add(`Bakiye_${message.author.id}`,-gonder)
db.add(`Bakiye_${user.id}`,gonder)

   const tan = new Discord.RichEmbed()
.setColor('BLUE')
  // .setAuthor(`${client.user.username} `, client.user.avatarURL)
   .setTitle(`__**Para Gönderildi!**__`)
.setDescription(`Kullanıcı: ${user}
Gönderilen Para Miktarı: __**${gonder}**__
Kalan bakiye: __**${bakiye}**__ 💳 `)
   .setThumbnail(user.avatarURL)
  .setTimestamp()
  .setFooter(`${message.author.username}`, `${message.author.displayAvatarURL}`)
message.channel.send(tan)
  
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['paragönder', 'para-gönder'],
  permLevel: 0,
}
exports.help = {
    name: 'Para Gönder',
    description: 'Ekonomi - Para Gönder Komutu',
    usage: 'pefix+paragönder <kullanıcı>'

}