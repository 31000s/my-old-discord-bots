const Discord = require('discord.js');
const db = require('quick.db');
const {stripIndents} = require('common-tags');
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {
  
  var prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  
   if(message.author.id !== message.guild.owner.user.id) return message.reply('Bu komut sunucu sahibine özeldir!')
  
  var p24 = client.ping
  try {       
    const embed = new Discord.RichEmbed()
	.setColor('RANDOM')
	.setDescription('Sunucu da ki tüm roller ve kanallar silinip, üstüne **Botlist** backupı kurulacaktır.')
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
   message.guild.createChannel('İNFORMATİON', 'category').then(bilgi => {
    message.guild.createChannel('General', 'category').then(toplum => {
    message.guild.createChannel('Other', 'category').then(kayitlar => {
    message.guild.createChannel('Test', 'category').then(sesli => {
      message.guild.createChannel('Log', 'category').then(logs => {

    //Kanallar
    setTimeout(() => {
    	message.guild.createChannel('announcement', 'text').then(rules => {
      
      rules.overwritePermissions(every, {
        SEND_MESSAGES: false
    })
      rules.setParent(bilgi.id)
       })
      
        
    	message.guild.createChannel('rules', 'text').then(reko => {
         reko.send(stripIndents`
        \`\`\`md
# KURALLAR! 
> Din, dil ve ırk ayrımı yapmak, siyaset yapmak yasaktır.
> Sunucu reklamı yapmak yasaktır.
> Küfür, argo, troll yasaktır.
> Sunucu içerisin de üyeler ile b4b yapmak yasaktır.
> Yetkililere, bot başvurunuzdan sonra, "botum ne zaman eklenecek" diye sormak yasaktır.
> Sunucu içi problemlerinizi yansıtmayınız.

> Sunucu içerisin de ki herkes kuralları okumuş sayılacaktır.


- ${client.user.username} -
\`\`\`
`)
      reko.overwritePermissions(every, {
        SEND_MESSAGES: false
    })
      reko.setParent(bilgi.id)
       })

    	

    	message.guild.createChannel('chat-tr', 'text').then(qwe => {
    	qwe.setParent(toplum.id)
    })

      message.guild.createChannel('chat-global', 'text').then(sohbet => {
      sohbet.setParent(toplum.id)
    })
    }, 5000)
    
    setTimeout(() => {
    	message.guild.createChannel('bot-command', 'text').then(komutlar => {
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
    	
      //SAYAÇ
    	message.guild.createChannel('sayaç', 'text').then(sayac => {
    	sayac.setParent(logs.id)
         sayac.send(stripIndents`
    		\`\`\`md
# Merhaba! 
> Bu kanal yeni gelen üyelerle birlikte belirtilen sayıya ne kadar kaldığını söyler.
> Üyelerin bu kanalda konuşmaları yasaklanmıştır.

> Sayaç bu kanala ayarlanmıştır.


- ${client.user.username} - Gelişmiş sayaç sistemi!
\`\`\`
    	`)
          sayac.overwritePermissions(every, {
    		SEND_MESSAGES: false
    	})
    	db.set(`otorolkanal_${message.guild.id}`, sayac.id)
    })
      
      //HG BB
   	message.guild.createChannel('hg-bb', 'text').then(gcc => {
    	gcc.setParent(bilgi.id)
      gcc.send(stripIndents`
    		\`\`\`md
# Merhaba! 
> Hoşgeldin, Güle güle kanalıdır.
> Üyelerin bu kanalda konuşmaları yasaklanmıştır.
> Otomatik olarak hg-bb kanalı olarak ayarlanmıştır.

> Hoşgeldin mesajını ayarlamak için ${prefix}hg-mesaj-ayarla
> Güle güle mesjını ayarlamak için ${prefix}bb-mesaj-ayarla


- ${client.user.username} - 
\`\`\`
    	`)
      
    	db.set(`kayitmesaj_${message.guild.id}`, gcc.id)
         gcc.overwritePermissions(every, {
           
    		SEND_MESSAGES: false
    	})
    })
      
    	message.guild.createChannel('bot-ekleme-şartları', 'text').then(log => {
    	log.setParent(kayitlar.id)
         log.send(stripIndents`
    		\`\`\`md
# Merhaba! 
> Bu oda da 'bot ekleme' şartlarını gösterir.

- ${client.user.username} Gelişmiş Mod-Log Sistemi -
\`\`\`
    	`)
             log.overwritePermissions(every, {
                VIEW_CHANNEL: false,
                		SEND_MESSAGES: false
               
    	
    	})
       
    })
      	message.guild.createChannel('bot-log', 'text').then(guvenlik => {
    	guvenlik.setParent(kayitlar.id)
                guvenlik.send(stripIndents`
    		\`\`\`md
# Merhaba! 
> Bot başvuru, bot onay, bot rededilme; log kanalı.
> Üyelerin buraya mesaj yazması yasaklanmıştır.

- ${client.user.username} -
\`\`\` `)
          guvenlik.overwritePermissions(every, {
    		SEND_MESSAGES: false
    	})
        
      message.guild.createChannel('add-bot', 'text').then(xd => {
      xd.setParent(kayitlar.id)
    })
          
    })
    }, 10000)
      
      

    setTimeout(() => {
      
    message.guild.createChannel('bost-test', 'text').then(shbt1 => {
      shbt1.setParent(sesli.id)
    })

       message.guild.createChannel('bost-test-2', 'text').then(bella => {
      bella.setParent(sesli.id)
    })

    	message.guild.createChannel('Bot Test #1', 'voice').then(shbt => {
    	shbt.setParent(sesli.id)
    })
    	message.guild.createChannel('Bot Test #2', 'voice').then(shbt2 => {
    	shbt2.setParent(sesli.id)
    })
 
    }, 15000)

    })})})})})
      
    setTimeout(() => {
      message.guild.createRole({
        name: 'Owner',
        color: 'fff9f9',
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
       name: 'Administrator',
        color: '8484ca',
        permissions: [
          
            "ADMINISTRATOR",
    ],
    hoist: true
      }).then(d =>  message.guild.owner.addRole(d.id))
      message.guild.createRole({
         name: 'Moderator',
        color: '97ca88',
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
       name: 'Manager',
        color: 'dbe086',
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
      	name: 'Authorized',
        color: '94d3b1',
      	mentionable: true,
         hoist: true
      }).then(d => {
   
    })
      
       message.guild.createRole({
        name: 'Developer',
        color: '32b4da',
        hoist: true,
      })


      message.guild.createRole({
     name: 'Members',
        color: 'a62add',
        hoist: true,
      }).then(d =>  db.set(`otorol_${message.guild.id}`, d.id,    message.guild.members.forEach(async (every) => {
 every.addRole(d.id)})))
                                                                                              
      
    
message.guild.createRole({
         name: 'Automon',
        color: 'fc890d',
         hoist: true,
      })
    const embed = new Discord.RichEmbed()
	.setColor('RANDOM')
	.setDescription('Sunucu kurulumu tamamlandı!')
    .setFooter(`${client.user.username}`, client.user.avatarURL)
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
	aliases: ["botlist", "botlistkur","botlist-kur"],
	permLevel: 4,
	kategori: 'moderasyon'
};

exports.help = {
	name: 'botlist-kur',
	description: 'Sıfırdan Botlist sunucusu kurar.',
	usage: 'botlist-kur'
};