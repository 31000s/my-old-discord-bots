const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db')
let prefix = ayarlar.prefix

module.exports.run = async (bot, message, args) => {
  
  if(message.author.id !== '677194506621288448') return message.channel.send(`Bu komutu sadece <@677194506621288448> kullanabilir!`) 
  
  let user = message.mentions.users.first()
  
   const giris = args[0]
  
  let para = args[1] 

  if(!user) {message.channel.send(`Bir kullanıcı etiketmelisin!`)}
  
  if (!para) {message.channel.send("gönderilecek para miktarını girmelisin!")}
  
  
  if(giris === "dosya") {
  
  message.channel.send(`Başarıyla ${user} kullanıcısına ${para} eklendi!`)
  
  db.add(`pplevel_${user.id}`,+para) 
  }
  
    if(giris === "gif") {
  
   message.channel.send(`Başarıyla ${user} kullanıcısına ${para} eklendi!`)
  
  db.add(`gifrank_${user.id}`,+para) 
  }
  
   if(giris === "pp") {
  
  message.channel.send(`Başarıyla ${user} kullanıcısına ${para} eklendi!`)
  
  db.add(`photorank_${user.id}`,+para) 
  }

  
};
  
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['rankekle'],
    permLevel: 0
};

exports.help = {
    name: 'rankekle',
    description: 'rankekle',
    usage: 'rankekle'
};

