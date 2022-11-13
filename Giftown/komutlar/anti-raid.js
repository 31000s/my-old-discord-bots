const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require('../ayarlar.json')
const prefix = ayarlar.prefix
exports.run = (client, message, args) => {
  
 if(message.author.id !== '677194506621288448') return message.channel.send("Yetkin yok!")
  
  if (args[0] == "aç") {
    if (db.has(`antiraidK_${message.guild.id}`) === true) {
      
       const mal = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(`Anti-raid zaten açık!`)
      
      return message.channel.send(mal);
    }
    db.set(`antiraidK_${message.guild.id}`, "anti-raid-aç");
    
     const tago = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(`Anti-raid sistemi açıldı!`)
     
    message.channel.send(tago);
  }
 
  if (args[0] == "kapat") {
    if (db.has(`antiraidK_${message.guild.id}`) === false) {
      
       const takogecesi = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(`Anti-raid açılmamış! Açmak için: \`\` ${prefix}anti-raid [aç] \`\` `)
      
      return message.channel.send(takogecesi);
    }
    db.delete(`antiraidK_${message.guild.id}`, "anti-raid-aç");
     const hazine = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(`Anti-raid sistemi kapatıldı`)
    
    message.channel.send(hazine);
  }
  
   const imkan = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(`Anti-raid'i açmak için, \`\` ${prefix}anti-raid [aç] \`\` `)
  if (!args[0])
    
    return message.channel.send(imkan);
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: "anti-raid"
};
 