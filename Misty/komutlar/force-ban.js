const Discord = require('discord.js');
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')

var prefix = ayarlar.prefix

    exports.run = async (client, message, args, level) => {
 
    let banayarla = await db.fetch(`banayarla_${message.guild.id}`);
  
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
       if (!message.member.roles.has(banayarla)) return message.channel.send(teyitmsj)
      
      let banlogkanal= await db.fetch(`banlog_${message.guild.id}`);
    
    let member = args[0];
       let reason = args.slice(1).join(' ');
      
      const yanlis = new Discord.RichEmbed()
      .setColor('RED')
      .setDescription(` ${emojiler} Yanlış kulllanım! ID girmelisin!  \`\` ${prefix}force-ban [id] [sebep] \`\` `)
      
      
       const yan = new Discord.RichEmbed()
      .setColor('RED')
      .setDescription(` ${emojiler} Yanlış kulllanım! Sebep girmelisin!  \`\` ${prefix}force-ban [id] [sebep] \`\` `)
      
    if (isNaN(member)) return message.channel.send(yanlis);
      if (!reason) return message.channel.send(yan)
      
      const userim = new Discord.RichEmbed()
      .setColor('RED')
      .setDescription(`Sunucudan banlandın! Yasaklanma sebebin: ${reason}`)
      
                const banlog = new Discord.RichEmbed()        
  .setColor('RANDOM')
 .setAuthor('Ban Log')
  .setDescription(`**Banlanan Kullanıcı:** <@${member}>
**Banlanan ID:** \` ${member} \`
**Yasaklanma Sebebi: ** \` ${reason} \`
**Tür: ** \` id ban. \`
**Yetkili:** <@${message.author.id}>`)
   .setTimestamp()

    const onlyspajki = args.splice(1, args.length).join(' ') || `Lütfen sebep belirtiniz.`;
    message.guild.ban(member, " "+reason).then(() => {
      
         message.react('729746353067917453')
      const kanalmesaj = new Discord.RichEmbed()
   .setColor('RANDOM')
        .setColor("RED")
      .setThumbnail(message.avatarURL)
          .setDescription('**__FORCE BAN ATILDI!__**')
      .addField('Yasaklanan Kişi:', `<@${member}>`, true)
       .addField('Yasaklanan Id:', `${member}`, true)
  .addField('Sebep:', `${reason}`, true)
        
       .setTimestamp()
      .setFooter(`Yetkili: ${message.author.username}`, `${message.author.displayAvatarURL}`)
      
        message.channel.send(kanalmesaj);
        client.channels.get(banlogkanal).send(banlog) //log kanalına atar
      member.send(kanalmesaj);
            
  })
            .catch((err) => {
                console.log(err);
            });
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['id-ban' ,'force-ban'],
    permLevel: 2
};

exports.help = {
    name: 'force-ban',
    category: '',
    description: 'Üyenin IDsi ile ona ban atarsınız.',
    usage: 'force <kişi id>'
};