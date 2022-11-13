const Discord = require("discord.js");
const ayarlar = require('../ayarlar.json')
const db = require("quick.db");
const prefix = ayarlar.prefix
exports.run = async (client, message, args) => {
  
     if(message.author.id !== message.guild.owner.user.id) {
    const embed = new Discord.RichEmbed()
      .setDescription(`Ne yazık ki bu komutu kullanmaya yetkin yok.`)
      .setColor("BLUE")
      .setFooter(client.user.username, client.user.avatarURL);
    message.channel.send(embed);
    return;
  }
  
  //emojii
       var emojiadd = await db.fetch(`mesajamoji_${message.guild.id}`);
  let emojiler = "";
  if (emojiadd === null || emojiadd === undefined){
    emojiler = "❌";
  }else {
    emojiler = emojiadd
  };
  //emoji
  
  const dandini = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(` ${emojiler} Anti-raid açılmamış! \`\` ${prefix}anti-raid aç \`\``)
  
  if (db.has(`antiraidK_${message.guild.id}`) === false) {
  
    return message.channel.send(dandini);
  }
  
   const mal = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(` ${emojiler} Bot'un id'sini girmelisin! Örnek: \`\` ${prefix}bot-izni ver [bot-id] \`\` `)
  
  if (!args[1]) return message.channel.send(mal)
 
  if (isNaN(args[1])) {
    
      const tata = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(` ${emojiler} Sadece Bot **ID**'si girmelisin!`)
    
    return message.channel.send(tata);
  }
  if (args[0] == "ver" || args[0] == "give") {
    client.users.get(args[0]);
    
     const mio = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(`${args[1]} **ID**'li bota izin verildi!`)
    
    db.set(`botizin_${message.guild.id}.${args[1]}`, "aktif");
    message.channel.send(mio);
  }
  
  
  if (args[0] == "kaldır" || args[0] == 'remove') {
    
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
  aliases: ['bot-permit', 'bot-izni'],
  permLevel: 0
};
exports.help = {
  name: "bot-izni"
};
 