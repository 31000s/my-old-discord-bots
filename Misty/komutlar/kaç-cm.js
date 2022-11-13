const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = async(client, message) => {
  
  const leon = new Discord.RichEmbed()
  .setColor('PURPLE')
  .setDescription('Hemen ölçüyorum abim bir saniye..')

  message.channel.send(leon).then(message => {
    var espri = Math.floor(Math.random() * 100);
    
    const miguel = new Discord.RichEmbed()
  .setColor('PURPLE')
  .setDescription(`**Senin Bamya ${espri}cm ** :eggplant:`)
    
    message.edit(miguel);
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kaç-cm', 'kaccm', 'kac-cm'],
  permLevel: 0,
};

exports.help = {
  name: 'kaçcm',
  description: 'Malafatının Büyüklüğünü Söyler.',
  usage: 'kaçcm',
  kategori: 'eğlence'
};
