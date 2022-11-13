const Discord = require('discord.js');
const db = require('quick.db');
const {stripIndents} = require('common-tags');

exports.run = async (client, message, args) => {
  
   if(message.author.id !== message.guild.owner.user.id) return message.reply('Bu komut sunucu sahibine özeldir!')
  
  var p24 = client.ping
  try {
 
   const embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setDescription('Sunucu da ki tüm roller ve kanallar silinip, üstüne **Oyun sunucusu 1** template kurulacaktır.')
  .setFooter('`evet` yazmazsanız, 10 saniye içinde iptal edilecektir.', client.user.avatarURL)
   
   message.channel.send({embed: embed})
   message.channel.awaitMessages(response => response.content === 'evet', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
      .then((collected) => {
          message.guild.channels.forEach((kanal) => {
            kanal.delete()
          })
           setTimeout(() => {
          message.guild.roles.forEach((rol) => {
            rol.delete()
          })
      }, 5000)
     
     const embedd = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setDescription('Sunucu kanalları ve kategorileri siliniyor, zaman alabilir.')
     .setFooter(`${client.user.username}`, client.user.avatarURL)
   message.author.send({embed: embedd})

    let every = message.guild.roles.find(r => r.name === '@everyone')

    //Kategoriler
    message.guild.createChannel('Bilgilendirme', 'category').then(bilgi => {
    message.guild.createChannel('Toplum', 'category').then(toplum => {
    message.guild.createChannel('Kayıtlar', 'category').then(kayitlar => {
    message.guild.createChannel('Sesli Kanallar', 'category').then(sesli => {
       message.guild.createChannel('Oyun Odalları', 'category').then(oyun => {

    //Kanallar
    setTimeout(() => {
      message.guild.createChannel('kurallar', 'text').then(kurallar => {
      kurallar.overwritePermissions(every, {
        SEND_MESSAGES: false
      })
      kurallar.setParent(bilgi.id)
      kurallar.send(stripIndents`
      \`\`\`md
> Kurallar
1. Küfür etmek, hakaretlerde bulunmak yasaktır!
2. Reklam yapmak, link atmak sunucu içersin de de, sunucudaki bir üyeye özelden mesaj olarak ta kesinlikle yasaktır!
3. #komutlar kanalı dışında bir kanalda komut kullanmak yasaktır!
4. Sesli kanallarda bas açmak vb. hareketler yapmak yasaktır!
5. Din, dil, ırk ayrımı yapmak yasaktır!
6. Siyaset hakkında tartışmak, konuşmak yasaktır!
7. Spam ve flood yapmak yasaktır!
8. Uygunsuz davranışlarda bulunmak, uygunsuz paylaşımlar yapmak yasaktır!
9. Yetkilileri sebesiz, saçma sebepler yüzünden rahatsız etmek yasaktır!
- Kuralları okumamak kesinlikle yasaktır!

> Üyelerin bu kanalda konuşmaları yasaklanmıştır.
\`\`\`
      `)
      kurallar.send(stripIndents`
        \`\`\`md
[NOT]: Sunucudaki her üye *yetkili dahil* kuralları okumuş olarak kabul edilir. Buradaki maddelere herhangi bir karşı gelme olayı olduğu an "bilmiyordum, okumamıştım" gibi bahanelerin *hiç biri* umursanmaz ve gerekli işlem yapılır!
\`\`\`
      `)
    })
      message.guild.createChannel('duyurular', 'text').then(duyurular => {
         duyurular.send(stripIndents`
        \`\`\`md
# Merhaba! 
> Burası duyurular. Burda önemli bilgiler verilir.
> Üyelerin bu kanalda konuşmaları yasaklanmıştır.


- ${client.user.username} -
\`\`\`
      `)
    
      duyurular.overwritePermissions(every, {
        SEND_MESSAGES: false
      })
      duyurular.setParent(bilgi.id)
    })
      message.guild.createChannel('sohbet', 'text').then(sohbet => {
      sohbet.setParent(toplum.id)
         sohbet.send(stripIndents`
        \`\`\`md
# Merhaba! 
> Burası sohbet. Burdan arkadaşlarınla vb sohbet etmek için kuruldu. Uygunsuz konuşmalara izinli değildir.



- ${client.user.username} -
\`\`\`
      `)
    })
     message.guild.createChannel('destek', 'text').then(destek => {
      destek.setParent(toplum.id)
      destek.send(stripIndents`
        \`\`\`md
# Merhaba! 
> Bu kanal destek sistemi kanalıdır! Buraya bir mesaj yazıldığında otomatik olarak bir Destek Talebi açılır ve yetkililerimiz açılan talep kanalında size yardımcı olurlar. 

[Uyarı!]: Gereksiz yere kullanmak yasaktır!

- ${client.user.username} Gelişmiş Destek Sistemi -
\`\`\`
      `)
    
    })
    }, 5000)

    setTimeout(() => {
      message.guild.createChannel('komut-kullanım', 'text').then(komutlar => {
           komutlar.send(stripIndents`
        \`\`\`md
# Merhaba! 
> Burası komutlar odası.



- ${client.user.username} -
\`\`\`
      `)
      komutlar.setParent(toplum.id)
    })
      
    }, 5000)

    setTimeout(() => { 
      message.guild.createChannel('sayaç', 'text').then(sayac => {
      sayac.setParent(kayitlar.id)
        sayac.send(stripIndents`
        \`\`\`md
# Merhaba! 
> Bu kanal yeni gelen üyelerle birlikte belirtilen sayıya ne kadar kaldığını söyler.
> Üyelerin bu kanalda konuşmaları yasaklanmıştır.


- ${client.user.username} Gelişmiş Sayaç Sistemi -
\`\`\`
      `)
          sayac.overwritePermissions(every, {
        SEND_MESSAGES: false
      })
      db.set(`otorolkanal_${message.guild.id}`, sayac.id)
    })
     
    message.guild.createChannel('hg-bb', 'text').then(gcc => {
      gcc.setParent(kayitlar.id)
      gcc.send(stripIndents`
        \`\`\`md
# Merhaba! 
> Bu kanal yeni gelen üyeleri resimli bir şekilde karşılar. 
> Üyelerin bu kanalda konuşmaları yasaklanmıştır.


- ${client.user.username} hg-bb -
\`\`\`
      `)
      db.set(`gcc_${message.guild.id}`, gcc.id)
         gcc.overwritePermissions(every, {
           
        SEND_MESSAGES: false
      })
    })
      
      message.guild.createChannel('moderasyon-kayıtları', 'text').then(log => {
      log.setParent(kayitlar.id)
        log.send(stripIndents`
        \`\`\`md
# Merhaba! 
> Bu kanal sunucuda geçen olayları söyler. 
> Üyelerin bu kanalda konuşmaları yasaklanmıştır.
> Üyelerin bu kanalı görmeleri yasaklanmıştır.


- ${client.user.username} Gelişmiş Mod-Log Sistemi -
\`\`\`
      `)
             log.overwritePermissions(every, {
                VIEW_CHANNEL: false,
                    SEND_MESSAGES: false
               
      
      })
       
    })
        message.guild.createChannel('güvenlik', 'text').then(guvenlik => {
      guvenlik.setParent(kayitlar.id)
               guvenlik.send(stripIndents`
        \`\`\`md
# Merhaba! 
> Bu kanal yeni gelen üyeleri güvenilir olup olmadıklarını tespit eder. 
> Üyelerin bu kanalda konuşmaları yasaklanmıştır.


- ${client.user.username} Gelişmiş Güvenlik Sistemi -
\`\`\`
      `)
          guvenlik.overwritePermissions(every, {
        SEND_MESSAGES: false
      })
          
    })
    }, 10000)

    setTimeout(() => {
      message.guild.createChannel('Sohbet Odası', 'voice').then(shbt => {
      shbt.setParent(sesli.id)
    })
      message.guild.createChannel('Sohbet Odası #2', 'voice').then(shbt2 => {
      shbt2.setParent(sesli.id)
    })
      message.guild.createChannel('Oyun Odası', 'voice').then(oyn => {
      oyn.setParent(oyun.id)
    })
      message.guild.createChannel('Oyun Odası #2', 'voice').then(oyn2 => {
      oyn2.setParent(oyun.id)
    })
 
        message.guild.createChannel('Minecraft', 'voice').then(oyn3 => {
      oyn3.setParent(oyun.id)
    })
       message.guild.createChannel('CS:GO', 'voice').then(csgo => {
      csgo.setParent(oyun.id)
    })
       message.guild.createChannel('LOL', 'voice').then(lol => {
      lol.setParent(oyun.id)
    })
      
         message.guild.createChannel('PUBG', 'voice').then(pubg => {
      pubg.setParent(oyun.id)
    })
      
          message.guild.createChannel('CS 1.6', 'voice').then(cs => {
      cs.setParent(oyun.id)
    })
      
    }, 15000)

    })})})})})
      
    setTimeout(() => {
        message.guild.createRole({
        name: '🔑',
        color: '#EFEBE9',
        permissions: [
          
            "ADMINISTRATOR",
           "MANAGE_GUILD",
            "MANAGE_ROLES",
            "MUTE_MEMBERS",
            "DEAFEN_MEMBERS",
            "MANAGE_MESSAGES",
            "MANAGE_NICKNAMES",
            "KICK_MEMBERS"
    ],
   
      }).then(d =>  message.guild.owner.addRole(d.id))
      message.guild.createRole({
        name: 'Kurucu',
        color: 'BLACK',
        permissions: [
          
            "ADMINISTRATOR",
    ],
    hoist: true
      }).then(d =>  message.guild.owner.addRole(d.id))
      message.guild.createRole({
        name: 'Yönetici',
        color: '00bdff',
        permissions: [
            "MANAGE_GUILD",
            "MANAGE_ROLES",
            "MUTE_MEMBERS",
            "DEAFEN_MEMBERS",
            "MANAGE_MESSAGES",
            "MANAGE_NICKNAMES",
            "KICK_MEMBERS"
    ],
    hoist: true
      })
      message.guild.createRole({
        name: 'Moderator',
        color: '00ff08',
        permissions: [
            "MANAGE_GUILD",
            "MANAGE_ROLES",
            "MUTE_MEMBERS",
            "DEAFEN_MEMBERS",
            "MANAGE_MESSAGES",
            "MANAGE_NICKNAMES"
    ],
    hoist: true
      })
       message.guild.createRole({
        name: 'Destek Ekibi',
        color: 'RED',
        mentionable: true,
         hoist: true
      }).then(d => {
    })
      message.guild.createRole({
        name: 'V.I.P',
        color: '00ffb6',
        hoist: true,
      })


      message.guild.createRole({
        name: 'Üye',
        color: 'caf7fc',
        hoist: true,
      }).then(d =>  db.set(`otorol_${message.guild.id}`, d.id,    message.guild.members.forEach(async (every) => {
 every.addRole(d.id)})))
                                                                                              
      
    
message.guild.createRole({
        name: 'Bot',
        color: 'ff8100',
         hoist: true,
      })
    const embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setDescription('Sunucunuzdaki kanalların, kategorilerin ve rollerin hepsi başarıyla silindi! Ve sunucu kurulumu tamamlandı! Eğer en yukarıda kanallar var ise onlar buglu kanallardır, Paniğe kapılmanıza gerek yok.')
  message.author.send({embed: embed})
    }, 20000)
        })
        .catch(() => {
           const xd = new Discord.RichEmbed()
     .setColor('RED')
     .setDescription("İşlem iptal edildi!")
     .setFooter(`${client.user.username}`, client.user.avatarURL)
     
          message.channel.send(xd)
        });
    
  } catch (err) {
    
  }
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['oyun-sunucusu-kur', 'Oyun-sunucusu-kur'],
  permLevel: 4,
  kategori: 'oyun-sunucusu-kur'
};

exports.help = {
  name: 'oyun-sunucusu-kur',
  description: 'oyun-sunucusu-kur',
  usage: 'oyun-sunucusu-kur <1>'
};