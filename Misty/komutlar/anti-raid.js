const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require('../ayarlar.json')
const prefix = ayarlar.prefix
exports.run = async (client, message, args) => {
  
  
  
     if(message.author.id !== message.guild.owner.user.id) {
       
       
       
    let kontrol = await db.fetch(`dil_${message.guild.id}`);

 if (kontrol == "TR") {
   
   const embed = new Discord.RichEmbed()
      .setDescription(`Bu komutu sadece **Owner** kullanabilir.`)
      .setColor("BLUE")
      .setFooter(client.user.username, client.user.avatarURL);
    message.channel.send(embed);
    return;
 
  } 
  
  else {
    
    const embed = new Discord.RichEmbed()
      .setDescription(`Only **Owner** can use this command.`)
      .setColor("BLUE")
      .setFooter(client.user.username, client.user.avatarURL);
    message.channel.send(embed);
    return;
    
  }
       
    
  }
  
  if (args[0] == "aç" || args[0] == "open") {
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
 
  if (args[0] == "kapat" || args[0] == "close") {
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
 