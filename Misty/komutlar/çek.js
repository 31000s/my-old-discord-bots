const Discord = require('discord.js');
const db = require('quick.db');
exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("SEND_MESSAGES")) return message.channel.send(`Bu komutu kullanmaya yetkin yok!`);
  
     //emojii
       var emojiadd = await db.fetch(`mesajamoji_${message.guild.id}`);
  let emojiler = "";
  if (emojiadd === null || emojiadd === undefined){
    emojiler = "❌";
  }else {
    emojiler = emojiadd
  };
  //emoji
  
     const leon = new Discord.RichEmbed()
  .setColor('PURPLE')
  .setDescription(`${emojiler} Yanlış kullanım! \` Ses kanalında olman lazım! \` `)
  
    if (!message.member.voiceChannel) { return message.channel.send(leon); }
  
  let kullanıcı = message.mentions.users.first()
  
      const migo = new Discord.RichEmbed()
  .setColor('RED')
  .setDescription(`${emojiler} Yanlış kullanım! \` Kullanıcıyı etiketlemelisin! \` `)
  
  if (!kullanıcı) return message.channel.send(migo).then(m =>m.delete(5000))
  
  let rol = message.mentions.roles.first()
  let member = message.guild.member(kullanıcı)
  
  const migoc = new Discord.RichEmbed()
  .setColor('BLACK')
  .setDescription(`${emojiler} Etiketlenen kullanıcı bir ses kanalında değil!`)
  
  if(!member.voiceChannel) return message.channel.send(migoc).then(m =>m.delete(5000))
  const voiceChannel = message.member.voiceChannel.id;
  
if(!voiceChannel) return
  member.setVoiceChannel(voiceChannel);
   message.react('✅')
   const voiceChannel1 = message.member.voiceChannel.name;
  
  let embed= new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(message.author+" **Tarafından** "+kullanıcı+" **Kullanıcısı** `"+voiceChannel1+"`** Sesli Kanalına Çekildi.**")
    .setFooter(`${message.author.tag}` , `${message.author.displayAvatarURL}`)
   .setTimestamp()  
    message.channel.send(embed).then(m =>m.delete(10000))
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['çek', 'pull'],
  kategori: "KULLANICI KOMUTLARI",
  permLevel: 0
}
exports.help = {
  name: 'çek',
  description: " ",
  usage: 'prefix+çek @kullanıcı'
}