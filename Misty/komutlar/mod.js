const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {
  
  const teyitmsj = new Discord.RichEmbed() 
   .setColor("RANDOM") 
        .setDescription(`Bu komutu kullanmaya yetkin yok!`)
  
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(teyitmsj);

let logk = message.mentions.channels.first();
let logkanal = await db.fetch(`codeminglog_${message.guild.id}`)
  
  if (args[0] === "sıfırla" || args[0] === "kapat" || args[0] === "reset" ) {
    
    const um = new Discord.RichEmbed()          
  .setColor('RANDOM')
  .setAuthor(`${client.user.username}`,client.user.avatarURL)
  .setDescription(`Modlog Kanalı Zaten ayarlı değil.`)
  .setFooter(`Yetkili: ${message.author.username}`, `${message.author.displayAvatarURL}`) 
    
    if(!logkanal) return message.channel.send(um)
    
    db.delete(`modlogderler_${message.guild.id}`)
    db.delete(`modlog_${message.guild.id}`)
    
     const del = new Discord.RichEmbed()          
  .setColor('RANDOM')
  .setAuthor(`${client.user.username}`,client.user.avatarURL)
  .setDescription(`ModLog Kanalı başarıyla sıfırlandı!`)
  .setFooter(`Yetkili: ${message.author.username}`, `${message.author.displayAvatarURL}`) 
   message.channel.send(del)

    return
  }
  
    const qwe = new Discord.RichEmbed()          
  .setColor('RANDOM')
  .setAuthor(`${client.user.username}`,client.user.avatarURL)
  .setDescription(`Bir modlog kanalı belirt.`)
  .setFooter(`Yetkili: ${message.author.username}`, `${message.author.displayAvatarURL}`) 
  
if (!logk) return message.channel.send(qwe)
 

db.set(`modlogderler_${message.guild.id}`, logk.id)
  db.set(`modlog_${message.guild.id}`, logk.id)
  
  const xd = new Discord.RichEmbed()          
  .setColor('RANDOM')
  .setAuthor(`${client.user.username}`,client.user.avatarURL)
  .setDescription(`Mod-Log kanalı ${logk} olarak ayarlandı!`)
  .setFooter(`Yetkili: ${message.author.username}`, `${message.author.displayAvatarURL}`) 

message.channel.send(xd)

console.log(`Mod-log komutu ${message.author.username} Tarafından kullanıldı`)
};



exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['mod-log','modlog'],
    permLevel: 0 ,
  kategori:'moderasyon'
};

exports.help = {
    name: 'mod-log',
    description: 'Mod-Log kanalını belirler.',
    usage: 'mod-log <#kanal>'
};