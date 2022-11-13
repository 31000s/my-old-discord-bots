const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json')

exports.run = function (client, message, args) {
  
   let kişi = client.users.get(message.author.id)
  
  const leon = new Discord.RichEmbed()
  .setColor('BLACK')
  .setDescription(':x: Kimseyi etkiketlemedin! Doğru kullanım: ``' + ayarlar.prefix + 'avatarım``')
  
  
  
   // if (!user) return message.channel.send(leon)
    //let target = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

  const xd = new Discord.RichEmbed()
    .setDescription(`<@${message.author.id}>`)
   .setImage(message.author.displayAvatarURL)
        .setColor("BLUE")
  
    message.channel.sendEmbed(xd)

};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['avatarım', 'meav'],
    permLevel: 0
};

exports.help = {
    name: 'avatarı',
    description: 'Avatarım atar.',
    usage: 'avatarım <@kullanıcı>'
};