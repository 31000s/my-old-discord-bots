const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')

module.exports.run = async (bot, message, args) => {

var prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix

   //emojii
       var emojiadd = await db.fetch(`mesajamoji_${message.guild.id}`);
  let emojiler = "";
  if (emojiadd === null || emojiadd === undefined){
    emojiler = "❌";
  }else {
    emojiler = emojiadd
  };
  //emoji

   const giris = args[0]

 const yvk =  db.fetch(`yvkak_${message.guild.id}`)
      

     const teyitmsj = new Discord.RichEmbed() 
   .setColor("RANDOM") 
        .setDescription(` ${emojiler} Bu komutu sadece **Sunucu Kurucusu** kullanabilir.`)
    if(message.author.id !== message.guild.owner.user.id) return message.channel.send(teyitmsj);

  if(giris === "aç" || giris === 'AÇ' || giris === 'Aç') {
    
    const migo = new Discord.RichEmbed() 
   .setColor('ORANGE')
   .setAuthor(`${bot.user.username}`, bot.user.avatarURL)
   .setDescription(`Role yetki verme koruması **açıldı**! `)
    .setFooter(`Yetkili: ${message.author.username}`, `${message.author.displayAvatarURL}`) 
    message.channel.send(migo)

    db.set(`yvkak_${message.guild.id}`, 'açık')

  }
  
if(giris === "kapat" || giris === 'KAPAT' || giris === 'Kapat') {
   
const leonesias = new Discord.RichEmbed()  
        
  .setColor('ORANGE')
  .setAuthor(`${bot.user.username}`, bot.user.avatarURL)
      .setDescription(`Role yetki verme **sistemi** kapatıldı!`)
  .setFooter(`Yetkili: ${message.author.username}`, `${message.author.displayAvatarURL}`) 
    
   message.channel.sendEmbed(leonesias)
  
  db.delete(`yvkak_${message.guild.id}`)
}

}; 
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['role-yetki-verme-koruması'],
    permLevel: 0
}

exports.help = {
    name: 'role-yetki-verme-koruması',
    description: 'role-yetki-verme-koruması',
    usage: 'role-yetki-verme-koruması'
}