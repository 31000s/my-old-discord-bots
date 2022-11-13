const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json')
var prefix = ayarlar.prefix;

exports.run = function (client, message, args) {
  
   let user = message.mentions.users.first() || message.author
  
   const yasak = client.emojis.get('744501616698327061');
  if (message.channel.id !== '744532687250915389') return message.channel.send(`${yasak} **Bu komutun kullanımı yasaktır, sadece <#744532687250915389> kanalında kullanabilirsin.**`).then(m => m.delete(5000));
    
    if (!user) return message.channel.send(`Yanlış kullanım! Bir kullanıcı etiketlemelisin! \`${prefix}avatar @kişi\` `)
  
  const xd = new Discord.RichEmbed()
  .setDescription(`${user}`)
   .setImage(user.avatarURL)
  .setFooter(`Gif Town`, client.user.avatarURL)
    .setTimestamp()
  
  message.channel.send(xd)
  
}


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'avatar',
    description: 'Avatar atar.',
    usage: 'avatar <@kullanıcı>'
};