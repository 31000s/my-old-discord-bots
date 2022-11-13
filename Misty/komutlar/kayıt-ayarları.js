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
     .setAuthor(`${bot.user.username}`, bot.user.avatarURL)
        .setDescription(` ${emojiler} Bu komutu kullanmaya yetkin yok!`)
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(teyitmsj);
	
let user = message.mentions.users.first() || message.guild.members.get(args[0]);
  
    let teyitci = await db.fetch(`teyitci_${message.guild.id}`);
    let erkek = await db.fetch(`erkekverolk_${message.guild.id}`);
   let kadin = await db.fetch(`kizkadinbayank_${message.guild.id}`); 
  let kayitsiz = await db.fetch(`kayitsiz_${message.guild.id}`);
  let tag = await db.fetch(`tag_${message.guild.id}`);
  let kayitemoji = await db.fetch(`banemoyar_${message.guild.id}`);
    
const migoc = new Discord.RichEmbed()  

   .setColor('RANDOM')
        .setColor("RED")
          .setDescription('**__KAYIT AYARLARI!__**')
         .addField('Tag:', `${tag}`, true)
     .addField('Teyitçi:', `<@&${teyitci.id}>`, true)
      .addField('Erkek Rolü:', `<@&${erkek.id}>`, true)
      .addField('Kadın Rolü:', `<@&${kadin.id}>`, true)
     .addField('Kayıtsız Rolü:', `<@&${kayitsiz.id}>`, true)
       .setTimestamp()
      .setFooter(`Yetkili: ${message.author.username}`, `${message.author.displayAvatarURL}`)
    
   message.channel.sendEmbed(migoc)
} 
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['kayıt-ayarları'],
    permLevel: 0
}

exports.help = {
    name: 'kayıt-ayarları',
    description: 'kayıt-ayarlar',
    usage: 'kayıt-ayarlar'
}