const Discord = require('discord.js');
const fs = require('fs');
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')

let prefix = ayarlar.prefix



exports.run = async (client, message, args) => {
  
  
     const teyitmsj = new Discord.RichEmbed() 
   .setColor("RANDOM") 
        .setDescription(`Bu komutu kullanmaya yetkin yok!`)
       if (!message.member.roles.has('743224156707094660')) return message.channel.send(teyitmsj)
  
if (!message.guild) {
  const ozelmesajuyari = new Discord.RichEmbed()
  .setColor(client.ayarlar.renk)
  .setTimestamp()
  .setAuthor(message.author.username, message.author.avatarURL)
  .addField('❌ Uyarı ❌', '`ban` adlı komutu özel mesajlarda kullanamazsın.')
    
  return message.author.send(ozelmesajuyari); }
  let guild = message.guild
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  
       const usat = new Discord.RichEmbed() 
   .setColor("RANDOM") 
        .setDescription(`Yanlış kullanım! Kişi etiketlemelisiniz!  \`\` ${prefix}ban @kişi [sebep] \`\` `)
  
     if (message.mentions.users.size < 1) return message.channel.send(usat).catch(console.error);

 const ozel = new Discord.RichEmbed() 
   .setColor("RANDOM") 
        .setDescription(`Kullanıcıyı banlayamam, çünkü benden daha üstün rolü var.`)
  
  if (!message.guild.member(user).bannable) return message.channel.send(ozel);
  
  message.react('745249428541014026')
      const kanalmesaj = new Discord.RichEmbed()
       .setColor('RANDOM')
       .setColor("RED")
       .setDescription(`**__BANLANDI!__**

**Yasaklanan Kişi**: ${user}
**Sebep**: ${reason}`)
         .setThumbnail(message.author.avatarURL)
       .setTimestamp()
      .setFooter(`Yetkili: ${message.author.username}`, `${message.author.displayAvatarURL}`)

      //log
              const banlog = new Discord.RichEmbed()        
  .setColor('RANDOM')
 .setAuthor('Ban Log')
  .setDescription(`**Banlanan Kullanıcı:** ${user}
**Banlanan ID:** \` ${user.id} \`
**Yasaklanma Sebebi: ** \` ${reason} \`
**Tür: ** \` @etiket ban. \`
**Yetkili:** <@${message.author.id}>`)
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
  console.log(`Bir kullanıcı banlandı! kullancı ${user}, idsi: ${user.id} | Sebep: ${reason}, Yetkili: <@${message.author.id}>, Tür: Etiket Ban.`)
  client.channels.get('744249954314485922').send(banlog) //log kanalına atar
  


     
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