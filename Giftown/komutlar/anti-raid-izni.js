const Discord = require("discord.js");
const ayarlar = require('../ayarlar.json')
const db = require("quick.db");
const prefix = ayarlar.prefix
exports.run = async (client, message, args) => {
  
 if(message.author.id !== '677194506621288448') return message.channel.send("Yetkin yok!")

  
  const dandini = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(` Anti-raid açılmamış! \`\` ${prefix}anti-raid aç \`\``)
  
  if (db.has(`antiraidK_${message.guild.id}`) === false) {
  
    return message.channel.send(dandini);
  }
  
   const mal = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(`Bot'un id'sini girmelisin! Örnek: \`\` ${prefix}bot-izni ver [bot-id] \`\` `)
  
  if (!args[1]) return message.channel.send(mal)
 
  if (isNaN(args[1])) {
    
      const tata = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(`Sadece Bot **ID**'si girmelisin!`)
    
    return message.channel.send(tata);
  }
  if (args[0] == "ver") {
    client.users.get(args[0]);
    
     const mio = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(`${args[1]} **ID**'li bota izin verildi!`)
    
    db.set(`botizin_${message.guild.id}.${args[1]}`, "aktif");
    message.channel.send(mio);
  }
  if (args[0] == "kaldır") {
    
    const mito = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(`${args[1]} **ID**'li botun izni kaldırıldı!`)
    
    db.delete(`botizin_${message.guild.id}.${args[1]}`, "aktif");
    message.channel.send(mito);
  }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: "bot-izni"
};
 