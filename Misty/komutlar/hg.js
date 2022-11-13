const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db')

let prefix = ayarlar.prefix

  

exports.run = async (client, message, args) => { 
  
  
   const giris = args[0]
  
  if (giris === "yardımcılar"){
    
     const juke = new Discord.RichEmbed()
    .setColor('RANDOM')
     .setAuthor(`${client.user.username} `, client.user.avatarURL)
.setTitle(`${client.user.username} - Hoşgeldin Mesaj Yardımcıları`)
    .setThumbnail(client.user.avatarURL)
    .addField(`**Gelen kullanıcı **`, '`${kullanıcı}`', true)
    .addField(`**Hesap Durumu!**`, '`${güvenlimi}`', true)
    .addField(`**Hesap Ne Kadar Önce Kuruldu?.**`, '`${tarih}`', true)
     
    .addField(`**Hesabın Kuruluş Tarihi.**`, '`${kuruluş}`', true)
    .addField(`**Teyitçi Etiket.**`, '`${teyitçi}`', true)
    .addField(`**Sunucuya Giren Kişi Sayısı**`, '`${kaçkişiolduk}`', true)
     
     .addField(`__Altı Çizgili Yazı__`, '`__Altı Çizgili Yazı__`', true)
     .addField(`**Kalın Yazı**`, '`**Kalın Yazı**`', true)
     .addField(`_İtalik Yazı_`, '`_İtalik Yazı_`', true)
    .setFooter(`Yetkili: ${message.author.username}`, `${message.author.displayAvatarURL}`) 
    .setTimestamp()
    message.channel.send(juke).catch()
  
  }
  
  if (giris === "değişkenler" || giris === 'Değişkenler'){
 
    
     const juke = new Discord.RichEmbed()
    .setColor('RANDOM')
     .setAuthor(`${client.user.username} `, client.user.avatarURL)
.setTitle(`${client.user.username} - Güle Güle Mesaj Yardımcıları`)
    .setThumbnail(client.user.avatarURL)
    .addField(`**Üye'nin **id**sini atar. **`, '`{üye}`', true)
    .addField(`**Üye'ye etiket atar.*`, '`{üyetag}`', true)
    .addField(`**Sunucu adını atar.**`, '`{sunucu}`', true)
     
    .addField(`**Hedefi atar.**`, '`{hedef}`', true)
    .addField(`**Kalan kişiyi atar.**`, '`{hedefkalan}`', true)

    .setFooter(`Yetkili: ${message.author.username}`, `${message.author.displayAvatarURL}`) 
    .setTimestamp()
    message.channel.send(juke).catch()
  
  }
   
    if(giris === "yardım" || giris === "help" || giris === "Yardım" || giris === "Help") {
        
    const embed = new Discord.RichEmbed()
        .setAuthor(`${client.user.username} `, client.user.avatarURL)
        .setColor('BLUE')
        .setTitle(`${client.user.username} - HG-BB Menüsü`)
        .setThumbnail(client.user.avatarURL)
        .setDescription(`• | **${prefix}hg-mesaj-ayarla [mesaj]** | **${prefix}hg-mesaj-sıfırla**: Hoşgeldin mesajı ayarlayabilirsiniz.
• | **${prefix}bb-mesaj-ayarla [mesaj]**: Güle güle mesajı.

• | **${prefix}hgbb-kanal-ayarla #kanal** | **${prefix}hgbb-kanal-sıfırla**: Girdi-Çıktı kanalı ayarlanmalı. 

• | **${prefix}hgbb yardımcılar**: Hoşgeldin, mesajınıza ekleyeceğiniz değişkenler, yazı tipleri vs.

• | **${prefix}hgbb değişkenler**: Güle güle, mesajıınza ekleyeceğiniz değişkenler..`)  
         .setFooter(`Yetkili: ${message.author.username}`, `${message.author.displayAvatarURL}`) 
    return message.channel.sendEmbed(embed);
    }
  

  
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['hgbb', 'w-by'],
    permLevel: 0
};

exports.help = {
    name: 'hgbb',
      category: 'hgbb',
      description: 'hgbb',
};