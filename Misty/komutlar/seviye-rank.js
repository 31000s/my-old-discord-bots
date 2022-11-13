const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db')



exports.run = async (client, message, args) => {
  
  let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;
  
 //emojii.
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
        .setDescription(` ${emojiler} Bu komutu kullanmaya yetkin yok!`)
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(teyitmsj);


    let uye = message.mentions.users.first() || message.author;

    var xd = await db.fetch(`lvl_${uye.id}_${message.guild.id}`);
  let ana = "";
  if (xd === null || xd === undefined){
    ana = "0";
  }else {
    ana = xd
  };
  
    var giz = await db.fetch(`xp_${uye.id}_${message.guild.id}`);
  let bebek = "";
  if (giz === null || giz === undefined){
    bebek = "0";
  }else {
    bebek = giz
  };
  
  
    const stats = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setDescription('**__RANK__**')
  .addField('Level:', `${ana}`, true)
  .addField('Xp:', ` ${bebek}`, true)
  .setThumbnail(uye.avatarURL)
  .setTimestamp()
  .setFooter(`Yetkili: ${message.author.username}`, `${message.author.displayAvatarURL}`)
  message.channel.send(stats)
  
 
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['rank'],
    permLevel: 0
};

exports.help = {
    name: ['rank'],
      category: ['rank'],
      description: ['rank'],
};