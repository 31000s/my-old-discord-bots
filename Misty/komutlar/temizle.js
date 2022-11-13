const Discord = require('discord.js');

exports.run = function(client, message, args) {
  if (!message.guild) {
  const ozelmesajuyari = new Discord.RichEmbed()
  .setColor(0xD97634)
  .setTimestamp()
  .setAuthor(message.author.username, message.author.avatarURL)
  .addField('⚠️ Uyarı ⚠️', '`temizle` adlı komutu özel mesajlarda kullanamazsın.')
  return message.author.sendEmbed(ozelmesajuyari); }
  if (!message.member.hasPermission("MANAGE_MESSAGES")) {
    const botunmesajyonet = new Discord.RichEmbed()
    .setColor(0xD97634)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('⚠️ Uyarı ⚠️', 'Mesajları silebilmen için `Mesajları Yönet` yetkisine sahip olmalısın.')
    return message.author.sendEmbed(botunmesajyonet);
  }
  let messagecount = parseInt(args.join(' '));
  message.channel.fetchMessages({
    limit: messagecount
  }).then(messages => message.channel.bulkDelete(messages));
  
  const temiz = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setTitle("Silme İşlemi Tamamlandı!")
  .setDescription(`<a:temizle:743130269774512178> **Eylem:** Sohbet silme
<a:temizle:743130269774512178> **Kaç Adet:** __${messagecount}__`)
   .setTimestamp()
  .setFooter(`Yetkili: ${message.author.username}`, `${message.author.displayAvatarURL}`) 
      
    return message.channel.sendEmbed(temiz).then(msg => msg.delete(5000));
    console.log("**Sohbet " + message.member + " tarafından silindi! **").then(msg => msg.delete(5000));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['temizle', 'sil', 'clean'],
  permLevel: 2
};

exports.help = {
  name: 'temizle',
  description: 'Belirlenen miktar mesajı siler.',
  usage: 'temizle <temizlenecek mesaj sayısı>'
};