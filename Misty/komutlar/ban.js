const Discord = require('discord.js');
const fs = require('fs');
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')

let prefix = ayarlar.prefix


exports.run = async (client, message, args) => {
  
  let banayarla = await db.fetch(`banayarla_${message.guild.id}`);
  
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
       if (!message.member.roles.has(banayarla)) return message.channel.send(teyitmsj)
  
if (!message.guild) {
  const ozelmesajuyari = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setTimestamp()
  .setAuthor(message.author.username, message.author.avatarURL)
  .addField('❌ Uyarı ❌', '`ban` adlı komutu özel mesajlarda kullanamazsın.')
    
  return message.author.send(ozelmesajuyari); }
  let guild = message.guild
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  let banlogkanal= await db.fetch(`banlog_${message.guild.id}`);
  
       const usat = new Discord.RichEmbed() 
   .setColor("RANDOM") 
        .setDescription(` ${emojiler} Yanlış kullanım! Kişi etiketlemelisiniz!  \`\` ${prefix}ban @kişi [sebep] \`\` `)
  
     if (message.mentions.users.size < 1) return message.channel.send(usat).catch(console.error);

 const ozel = new Discord.RichEmbed() 
   .setColor("RANDOM") 
        .setDescription(` ${emojiler} Kullanıcıyı banlayamam, çünkü benden daha üstün rolü var.`)
  
  if (!message.guild.member(user).bannable) return message.channel.send(ozel);
  
      const kanalmesaj = new Discord.RichEmbed()
   .setColor('RANDOM')
        .setColor("RED")
          .setDescription('**__KULLANICI BAŞARIYLA BANLANDI!__**')
       .addField('Yasaklanan:', `${user}`, true)
      .addField('Sebep:', `${reason}`, true)
       .setTimestamp()
      .setFooter(`Yetkili: ${message.author.username}`, `${message.author.displayAvatarURL}`)

      //log
             const banlog = new Discord.RichEmbed()        
  .setColor('RANDOM')
 .setAuthor('Ban Log')
  .setDescription(`Banlanan Kullanıcı: ${user} 
**Yasaklanma Sebebi:** \` ${reason} \`
**Tür:** \` Etiket Ban. \`
Yetkili:  ${message.author.username}`)
   .setTimestamp()
             
   
    const kullanciya = new Discord.RichEmbed()
   .setColor('RANDOM')   
    .setAuthor('Sunucudan yasaklandın!')
    .setThumbnail(client.user.avatarURL)
      .setDescription(`**Yasaklanma Sebebin:** ${reason} | **Komutu Kullanan Yetkili:** ${message.author.username}`) 

  message.channel.send(kanalmesaj) //kanala atar
  user.send(kullanciya) //kullanciya mesaj atar
    message.guild.member(user).ban({
            reason: `${reason}`
          }); //banlar.
  client.channels.get(banlogkanal).send(banlog) //log kanalına atar
  


     
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['ban'],
  permLevel: 3,
  kategori: "moderasyon",
};

exports.help = {
  name: 'ban',
  description: 'İstediğiniz kişiyi sunucudan yasaklar.',
  usage: 'ban <@kullanıcı> <sebep>',
 
};