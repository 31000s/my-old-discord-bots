const Discord = require('discord.js');
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')
exports.run = async (client, message, args) => {
  
   let capslock = await db.fetch(`capslock_${message.guild.id}`)
  
  let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;
  
    const gan = new Discord.RichEmbed()
    .setColor('f3e7e8')
    .setDescription(`Bu komutu kullanabilmek için **Yönetici olmalısın!**`)
  
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(gan)
  
  let giris = args[0]  
  
  if (!giris) {
    
     const gir = new Discord.RichEmbed()
    .setColor('f3e7e8')
    .setDescription(`Capslock engellemeyi açmak için: \`\`${prefix}capslock-engel aç\`\``)
    
      message.channel.send(gir)
    
  }


   if (giris == 'kapat') {
    
    const em = new Discord.RichEmbed()
    .setColor('f3e7e8')
    .setDescription(`Capslock engelleme **sistemi kapatıldı**!`)
    
    db.delete(`capslock_${message.guild.id}`, 'kapali')
    message.channel.send(em)
  }
 
    if (giris == 'aç') {
    db.set(`capslock_${message.guild.id}`, 'acik')
    
    const xd = new Discord.RichEmbed()
    .setColor('f3e7e8')
    .setDescription(`Capslock engelleme sistemi **aktif**!`)
    
    
    message.channel.send(xd)
  }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['capslockengel','capslock','capslock-engel','cl'],
  permLevel: 3
};
exports.help = {
  name: 'capsengel',
  category: 'Moderasyon komutları!',
  description: 'Capslock kullanımını engeller.',
  usage: 'capslock-engelleme'
};