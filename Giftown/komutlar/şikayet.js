const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json')
var prefix = ayarlar.prefix

exports.run = function(client, message, args) {
    let type = args.slice(0).join(' ');
    if (type.length < 1) return message.channel.send(
new Discord.RichEmbed()
.setDescription(`❌ Yanlış kullanım! \`\`${prefix}şikayet [sebep]\`\` `));
const embed = new Discord.RichEmbed()
.setColor('RANDOM')
.setDescription('Şikayetiniz bildirildi! En kısa zaman da geri dönüş yapılacaktır.')
message.channel.send(embed)
  
const embed2 = new Discord.RichEmbed()
.setColor("RANDOM")
.setDescription(`**${message.author.tag}** adlı kullanıcının Şikayeti:`)
.addField(`Kulanıcı Bilgileri`, `Kullanıcı ID: ${message.author.id}\nKullanıcı Adı: ${message.author.username}\nKullanıcı Tagı: ${message.author.discriminator}`)
.addField("Şikayet", type)
.setThumbnail(message.author.avatarURL)
client.channels.get('749310214188302416').send(embed2); // Kanal ID 
};
exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ['şikayet'],
  permLevel: 0 
};
exports.help = {
  name: 'sikayet',
  description: 'Şikayet de bulunursunuz.',
  usage: 'sikayet <Şikayet>'
};