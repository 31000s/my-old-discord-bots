const Discord = require("discord.js");
const { RichEmbed } = require("discord.js");
const ayarlar = require("../ayarlar.json");
const db = require("quick.db");
const moment = require("moment");

let prefix = ayarlar.prefix

module.exports.run = async (bot, message, args) => {
  
      let kontrol = await db.fetch(`dil_${message.guild.id}`);
  

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
     .setAuthor(`${bot.user.username}`, bot.user.avatarURL)
        .setDescription(` ${emojiler} Bu komutu kullanmaya yetkin yok!`)
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(teyitmsj);
  
  var tag = args.join(" ");
  
   if (kontrol == "TR") {
     
     if (!tag) {
    const embed = new Discord.RichEmbed()
      .setColor("RANDOM")
    .setAuthor(`${bot.user.username}`, bot.user.avatarURL)
      .setDescription(` ${emojiler} Bir tag gir! \`\` ${prefix}tag-ayarla [tag] \`\` `)
    message.channel.send(embed);
    return;
  }
}

  else {
    
     if (!tag) {
    const embed = new Discord.RichEmbed()
      .setColor("RANDOM")
    .setAuthor(`${bot.user.username}`, bot.user.avatarURL)
      .setDescription(` ${emojiler} You should determine tag! Example: \`\` ${prefix}tag-set [tag] \`\` `)
    message.channel.send(embed);
    return;
  }
    
}
  
  
     if (kontrol == "TR") {
       if (!tag) return;
  message.channel.send({
    embed: {
      description: `Tag başarıyla \` ${tag} \` olarak ayarlandı`, //tag succesfully adjusted as tag
      color: Math.floor(Math.random() * 0xffffff),
      timestamp: new Date(),
      footer: {
        text: `${message.author.username}`,
        url: `${message.author.avatarDisplayURL}`
      }
    }
  });
  db.set(`tag_${message.guild.id}`, tag);
     }
  
else {
  if (!tag) return;
  message.channel.send({
    embed: {
      description: `tag succesfully adjusted as tag: \` ${tag} \``, //tag succesfully adjusted as tag
      color: Math.floor(Math.random() * 0xffffff),
      timestamp: new Date(),
      footer: {
        text: `${message.author.username}`,
        url: `${message.author.avatarDisplayURL}`
      }
    }
  });
  db.set(`tag_${message.guild.id}`, tag);
}        
    
    
  
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["tag-ayarla", 'tag-set'],
  permLevel: 0
};

exports.help = {
  name: "tag-ayarla",
  description: "tag",
  usage: "tag-ayarla <rol>"
};
