const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async(client, message, args) => {

     const teyitmsj = new Discord.RichEmbed() 
   .setColor("RANDOM") 
        .setDescription(`Bu komutu kullanmaya yetkin yok!`)

       if (!message.member.roles.has('743224156707094660')) return message.channel.send(teyitmsj);
  
    const medde = new Discord.RichEmbed()
  .setColor('RED')
   .setDescription(`Kaldırılacak banlı kullanıcının IDsini girmelisin. (Tüm banları kaldırmak için **toplu** yazmalısın)`)
  
  if(!args[0]) return message.channel.send(medde)
    if(args[0] === "toplu") {
    
        message.guild.fetchBans().then(bans => {
          bans.forEach(user => {
            message.guild.unban(user)
          });
        });
      
      const embed = new Discord.RichEmbed()
      .setcolor('RED')
      .setDescription(`**Sunucudaki banların tümü başarıyla kaldırılıyor...**`)
      
        message.channel.send(embed)
      return
    }    
  
  const mesaj = new Discord.RichEmbed()
  .setColor('RED')
   .setDescription(`Banı kaldırılacak kullanıcının ID numarasını girmelisin!`)
  
    if(isNaN(args[0])) return message.channel.send(mesaj).then(x => x.delete(5000))
    try {
      message.guild.unban(args[0])
      
    
      client.fetchUser(args[0]).then(x => message.channel.send(
        
        new Discord.RichEmbed()
        .setTimestamp()
        .setColor("RED")
        .setFooter(`Yetkili: ${message.author.username}`, `${message.author.displayAvatarURL}`) 
        .setDescription(`**__BAN KALDIRILDI__**`)
         .setThumbnail(x.avatarURL)
        .addField('Banı kaldırılan', `${x}`, true)
        .addField('ID', `${x.id}`, true)
      ))
      
    } catch(err) { message.reply('Belirtilen ID numarasının banı kaldırılamadı!').then(x => x.delete(5000)) }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['unban', 'ban-kaldır'],
  permLevel: 0,
};

exports.help = {
  name: 'unban',
  description: 'Sunucudan ban kaldırmanızı sağlar.',
  usage: 'unban id/toplu',
};