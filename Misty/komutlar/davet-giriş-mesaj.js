const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const moment = require('moment');
const db = require('quick.db')

exports.run = async (client, message, args) => {
     
var prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;


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
  
  let hgmesaj = await db.fetch(`davetmesaj_${message.guild.id}`);
  let mesaj = args.join(" ")
   
      if (!mesaj) {
    const embed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(` ${emojiler} Kanal etiketlemelisin! Örnek: \`\` ${prefix}davet-giriş-mesaj [mesaj] \`\`

 __**Değişkenler**__
Sunucuya gelen üyeyi etiketler: \`\`{davetli}\`\`
Üyeyi sunucuya davet eden kişiyi etiketler: \`\`{davetçi}\`\`
Üyenin toplam davet sayısını gösterir: \`\`{toplamdavet}\`\``)
    message.channel.send(embed);
    return;
  }
      
   message.channel.send(`${hgmesaj}`) //,{ split: true, code: "xl" }
   db.set(`davetmesaj_${message.guild.id}`, mesaj)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['davet-giriş-mesaj', 'invite-join-message'],
    permLevel: 0
};

exports.help = {
    name: ['davet-giriş-mesaj'],
      category: ['davet-giriş-mesaj'],
      description: ['davet-giriş-mesaj'],
};