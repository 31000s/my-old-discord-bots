const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db')



exports.run = async (client, message, args) => {
  
  let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;
  
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
    let noxp = message.mentions.roles.first();
  
    if (!noxp) {
    let emojiadd = await db.fetch(`mesajamoji_${message.guild.id}`);
    const embed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(` ${emojiler} Rol etiketlemelisin! Örnek: \`\` ${prefix}no-xp-rol @rol \`\` `)
       message.channel.send(embed);
       return;
  };
        const migobey = new Discord.RichEmbed()
  .setColor('RANDOM')
   .setAuthor(`${client.user.username}`, client.user.avatarURL)
  .setDescription(`No Xp rolü ${noxp} olarak ayarlandı!`)
  .setFooter(`Komutu kullanan yetkili: ${message.author.username}`, `${message.author.displayAvatarURL}`) 
   message.channel.send(migobey)
   db.set(`noxprol_${message.guild.id}`, noxp.id);   

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['no-xp-rol'],
    permLevel: 0
};

exports.help = {
    name: ['no-xp-rol'],
      category: ['no-xp-rol'],
      description: ['no-xp-rol'],
};