const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = function (client, message, args) {

    let user = message.mentions.users.first();
  
  const leon = new Discord.RichEmbed()
  .setColor('BLACK')
  .setDescription(':x: Kimseyi etkiketlemedin! Doğru kullanım: ``' + ayarlar.prefix + 'avatar @üye``')
  
  
    if (!user) return message.channel.send(leon)
    let target = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    message.channel.sendEmbed(new Discord.RichEmbed()
        .setDescription(`${target.user.username}`)
        .setImage(target.user.displayAvatarURL)
        .setFooter(`Yetkili: ${message.author.username}`, `${message.author.displayAvatarURL}`)  
        .setColor("BLUE"));
}


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['avatar'],
    permLevel: 0
};

exports.help = {
    name: 'avatar',
    description: 'Avatar atar.',
    usage: 'avatar <@kullanıcı>'
};