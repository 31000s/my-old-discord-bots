const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db')
var prefix = ayarlar.prefix;

exports.run = async (client, message, args) => {
  
  
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
        .setDescription(` ${emojiler} Bu komutu kullanmaya yetkin yok!`)
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(teyitmsj);

  let user = message.mentions.users.first() || message.guild.members.get(args[0]);
    let kizkadinbayan = message.mentions.roles.first();
  
    if (!kizkadinbayan) {
    const embed = new Discord.RichEmbed()
      .setColor("RED")
     .setAuthor(`${client.user.username}`, client.user.avatarURL)
      .setDescription(` ${emojiler} Rol etiketlemelisin! Örnek: \`\` ${prefix}kadın-rolü @rol \`\` `)
       message.channel.send(embed);
       return;
  };
        const migobey = new Discord.RichEmbed()
  .setColor('RANDOM')
   .setAuthor(`${client.user.username}`, client.user.avatarURL)
  .setDescription(`Rol ${kizkadinbayan} olarak ayarlandı!`)
  .setFooter(`Komutu kullanan yetkili: ${message.author.username}`, `${message.author.displayAvatarURL}`) 
   message.channel.send(migobey)
   db.set(`kizkadinbayank_${message.guild.id}`, kizkadinbayan.id)   

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['kadın-rolü'],
    permLevel: 0
};

exports.help = {
    name: ['kadın-rolü'],
      category: ['kadına'],
      description: ['kadın-rolü'],
};