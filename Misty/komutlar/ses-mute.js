const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const ms = require('ms');
const db = require('quick.db')

exports.run = async(client, message, args, prefix, ayar, emoji) => {
  // !sesmute @etiket 5m
  
  
  let uye = message.mentions.members.first();
  let sure = args[1];
  let sebep = args.slice(2).join(' ');
  let logKanali = await db.fetch(`mutelogkanal_${message.guild.id}`);
  
  let muteds = await db.fetch(`muteyetkisi_${message.guild.id}`);
  
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
       if (!message.member.roles.has(muteds.id)) return message.channel.send(teyitmsj)
  
  
   const usat = new Discord.RichEmbed() 
   .setColor("RANDOM") 
        .setDescription(` ${emojiler} Yanlış kullanım! Kişi etiketlemelisiniz!  \`\` ${ayarlar.prefix}vmute @kişi [süre] [sebep] \`\` `)
  
  if (!uye || !sure || !sebep) return message.channel.send(usat)
  
   const mal = new Discord.RichEmbed() 
   .setColor("RANDOM") 
        .setDescription(` ${emojiler} Kişi bir ses kanalda değil!`)
  if (!uye.voiceChannel) return message.channel.send(mal);
  

  uye.setMute(true);  
   const agam = new Discord.RichEmbed()
        .setColor("BLACK")
        .setDescription(`${uye} adlı üye ses kanalında **${sure}** kadar susturuldu!`)

 const babam = new Discord.RichEmbed()
        .setColor("BLACK")
        .setDescription(`${uye} adlı üye ses kanalında **${sure}** kadar, **${sebep}** nedeniyle susturuldu!`)
                        
  message.channel.send(agam);
  client.channels.get(logKanali.id).send(babam);
  setTimeout(() => {
    
    const anam = new Discord.RichEmbed()
        .setColor("BLACK")
        .setDescription(`${uye} adlı üyenin ses susturması kaldırıldı!`)
 const hosgelis = new Discord.RichEmbed()
        .setColor("BLACK")
        .setDescription(`${uye} adlı üyenin ses susturması kaldırıldı!`)
    
    uye.setMute(false);
    message.channel.send(anam);
    client.channels.get(logKanali.id).send(hosgelis);
  }, ms(sure));
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['ses-mute', 'vmute'],
  permLevel: 0
};

exports.help = { 
  name: 'sesmute', 
  description: 'Sesmute.',
  usage: 'sesmute @üye süre sebep',
  kategori: 'kullanıcı'
};