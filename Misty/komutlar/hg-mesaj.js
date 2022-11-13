const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')

module.exports.run = async (bot, message, args) => {
  
   //emojii
       var emojiadd = await db.fetch(`mesajamoji_${message.guild.id}`);
  let emojiler = "";
  if (emojiadd === null || emojiadd === undefined){
    emojiler = "❌";
  }else {
    emojiler = emojiadd
  };
  //emoji
     const teyitmsj = new Discord.RichEmbed() 
   .setColor("RANDOM") 
        .setDescription(` ${emojiadd} Bu komutu kullanmaya yetkin yok!`)
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(teyitmsj);
  
let user = message.mentions.users.first() || message.guild.members.get(args[0]);
  
  let hgmesaj = await db.fetch(`hgmesaj_${message.guild.id}`)
  let mego = "";
  if (hgmesaj === null || hgmesaj === undefined){
    mego = "";
  }else {
    mego = hgmesaj
  };
  
       if (!hgmesaj) {
    const embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setDescription(` ${emojiler} Mesaj ayarlanmamış!`)
    message.channel.send(embed);
    return;
  }
  
const migo = new Discord.RichEmbed()  
        
  .setColor('RANDOM')
 .setAuthor('Hg Mesajı')
  .setDescription(`${hgmesaj}`)
.setFooter(`Komutu kullanan yetkili: ${message.author.username}`, `${message.author.displayAvatarURL}`) 
    
   message.channel.send(migo)
} 
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['hg-mesaj'],
    permLevel: 0
}

exports.help = {
    name: 'hg-mesaj',
    description: 'hg-mesaj',
    usage: 'hg-mesaj'
}