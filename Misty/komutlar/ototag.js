
const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');
const prefix = ayarlar.prefix;

exports.run = async(client, message, args) => {

	//emojii
       var emojiadd = await db.fetch(`mesajamoji_${message.guild.id}`);
  let emojiler = "";
  if (emojiadd === null || emojiadd === undefined){
    emojiler = "❌";
  }else {
    emojiler = emojiadd
  };
  //emoji
  
    let kontrol = await db.fetch(`dil_${message.guild.id}`);

  if (kontrol == "TR") {
    
    const teyitmsj = new Discord.RichEmbed() 
   .setColor("RANDOM") 
     .setAuthor(`${client.user.username}`, client.user.avatarURL)
        .setDescription(` ${emojiler} Bu komutu sadece **Sunucu kurucusu kullanabilir.**`)
    if(message.author.id !== message.guild.owner.user.id) return message.channel.send(teyitmsj);
  
let ototagm = await db.fetch(`mistyototag_${message.guild.id}`) || await db.fetch(`mistykanal_${message.guild.id}`)

const embed = new Discord.RichEmbed()
      .setColor("RED")
      .setAuthor(`${client.user.username}`, client.user.avatarURL)
      .setDescription(`${emojiler} Bu sistem zaten **aktif** durumda. Kapatmak için: \`\`${prefix}ototagkapat\`\``)
if(ototagm) return message.channel.send(embed)

let kanalmisty = message.mentions.channels.first()
let tagmisty = args.slice(1).join(' ')

 const qwe = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(`Ototag sistemini ayarlamak için **kanal ve tag** belirtmelisin.`)

if(!kanalmisty || !tagmisty) return message.channel.send(qwe)
  
db.set(`mistyototag_${message.guild.id}`,tagmisty) 
db.set(`mistykanal_${message.guild.id}`,kanalmisty.id)


const leon = new Discord.RichEmbed()          
  .setColor('RANDOM')
   .setAuthor(`${client.user.username}`, client.user.avatarURL)
  .setDescription(`Ototag aktif edildi!
	Yeni gelen kullanıcılara **${tagmisty}** vereceğim.`)
  .setFooter(`Komutu kullanan yetkili: ${message.author.username}`, `${message.author.displayAvatarURL}`) 
   message.channel.send(leon)
    
  } else {
    
    //İNGİLİZCE
    
    const teyitmsj = new Discord.RichEmbed() 
   .setColor("RANDOM") 
     .setAuthor(`${client.user.username}`, client.user.avatarURL)
        .setDescription(` ${emojiler} Only Server installer can use this command. Only Server installer can use this command.`)
    if(message.author.id !== message.guild.owner.user.id) return message.channel.send(teyitmsj);
  
let ototagm = await db.fetch(`mistyototag_${message.guild.id}`) || await db.fetch(`mistykanal_${message.guild.id}`)

const embed = new Discord.RichEmbed()
      .setColor("RED")
      .setAuthor(`${client.user.username}`, client.user.avatarURL)
      .setDescription(`${emojiler} This system is already **active**. To turn off: \`\`${prefix}autotag-off\`\``)
if(ototagm) return message.channel.send(embed)

let kanalmisty = message.mentions.channels.first()
let tagmisty = args.slice(1).join(' ')

 const qwe = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(`To set the autotag system, you must specify a channel and tag.`)

if(!kanalmisty || !tagmisty) return message.channel.send(qwe)
  
db.set(`mistyototag_${message.guild.id}`,tagmisty) 
db.set(`mistykanal_${message.guild.id}`,kanalmisty.id)


const leon = new Discord.RichEmbed()          
  .setColor('RANDOM')
   .setAuthor(`${client.user.username}`, client.user.avatarURL)
  .setDescription(`Ototag has been activated!
	 I will give ${tagmisty} to new users.`)
  .setFooter(`Authorized: ${message.author.username}`, `${message.author.displayAvatarURL}`) 
   message.channel.send(leon)
    
    
  }

  
  

};  
exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: ['ototagayarla', 'ototag-ayarla', 'auto-tag'],
  permLevel: 0 
};
exports.help = {
  name: 'ototag',
  description: 'Ototag Sistemi',
  usage: 'ototag #kanal <tag>'
};
