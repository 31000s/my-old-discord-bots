const Discord = require("discord.js");
const ms = require("ms");
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args) => {
  
    let logKanali = await db.fetch(`mutelogkanal_${message.guild.id}`);
  
  let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;
  let üye = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  
   const embed = new Discord.RichEmbed()
        .setColor("RED")
        .setDescription(`❌ Yanlış kullanım! \` ${prefix}mute @Kullanıcı <süre>\`  `)
  
  if(!üye) return message.channel.send(embed);

  let rol = message.guild.roles.find(abc => abc.name === "Susturulmuş");
  if(!rol) {
    
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
    
    
    try {
      rol = await message.guild.createRole({
        name: "Susturulmuş",
        color: "#818386",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(rol, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
          SPEAK: false
        });
      });
    } catch(e) { console.log(e) };
  };

  let süre = args.slice(1).join(' ').replace('gün'.toLowerCase(), 'd').replace('saat'.toLowerCase(), 'h').replace('dakika'.toLowerCase(), 'm').replace('saniye'.toLowerCase(), 's');

  if(üye.roles.has(rol.id)) {
    await(üye.removeRole(rol.id));
    
      const kasık = new Discord.RichEmbed()
        .setColor("BLACK")
        .setAuthor(`${client.user.username}`, client.user.avatarURL)
        .setDescription(`${üye}  adlı üyenin susturulması kaldırıldı!`)
      
    message.channel.send(kasık)
    return
  }
  
  if(!süre) {
    
     const corba = new Discord.RichEmbed()
        .setColor("BLACK")
     .setAuthor(`${client.user.username}`, client.user.avatarURL)
        .setDescription(`${üye}  adlı üye susturuldu! Tekrar aynı işlemi uygulayarak susturulmayı kaldırabilirsiniz.`)
    
    await(üye.addRole(rol.id));
    message.channel.send(corba)
  } else {
    
      const corona = new Discord.RichEmbed()
        .setColor("BLACK")
      .setAuthor(`${client.user.username}`, client.user.avatarURL)
        .setDescription(` ${üye}  adlı üye  **${ms(ms(süre))}**  süre boyunca susturuldu.`)
    
    await(üye.addRole(rol.id));
      const ogum = new Discord.RichEmbed()
        .setColor("BLACK")
      .setAuthor(`${client.user.username}`, client.user.avatarURL)
        .setDescription(`${üye} adlı üye ses kanalında **${ms(ms(süre))}** kadar susturuldu!`)
    message.channel.send(corona);
     client.channels.get(logKanali.id).send(ogum);
    
    
    setTimeout(function(){
      
        const midye = new Discord.RichEmbed()
        .setColor("BLACK")
        .setAuthor(`${client.user.username}`, client.user.avatarURL)
        .setDescription(` ${üye} adlı üyenin susturulma süresi dolduğu için susturulması kaldırıldı!`)
      
      üye.removeRole(rol.id);
      message.channel.send(midye);
    }, ms(süre));
  };
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['sustur', 'mute'],
  permLevel: 0
};

exports.help = {
  name: 'mute',
  description: 'Belirtilen kullanıcıyı belirtilen süre kadar susturur/susturmasını açar.',
  usage: 'mute @Kullanıcı [İsterseniz Süre]',
  kategori: 'yetkili'
};
