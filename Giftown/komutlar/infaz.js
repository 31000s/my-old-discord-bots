const Discord = require('discord.js');
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')

var prefix = ayarlar.prefix

    exports.run = async (client, message, args, level) => {


    if (!message.member.roles.has('743224156707094660')) return message.channel.send('Bu komutu kullanmaya yetkin yok!')
      
    
    let member = args[0];
       let reason = args.slice(1).join(' ');
      
      const yanlis = new Discord.RichEmbed()
      .setColor('RED')
      .setDescription(`Yanlış kulllanım! ID girmelisin!  \`\` ${prefix}force-ban [id] [sebep] \`\` `)
      
      
       const yan = new Discord.RichEmbed()
      .setColor('RED')
      .setDescription(`Yanlış kulllanım! Sebep girmelisin!  \`\` ${prefix}force-ban [id] [sebep] \`\` `)
      
    if (isNaN(member)) return message.channel.send(yanlis);
      if (!reason) return message.channel.send(yan)
      
      const userim = new Discord.RichEmbed()
      .setColor('RED')
      .setDescription(`Sunucudan banlandın! Yasaklanma sebebin: ${reason}`)
      
      const kullanciya = new Discord.RichEmbed()
   .setColor('RANDOM')   
    .setAuthor('Sunucudan yasaklandın!')
    .setThumbnail(client.user.avatarURL)
      .setDescription(`**Yasaklanma Sebebin:** ${reason} | **Komutu Kullanan Yetkili:** ${message.author.username}`) 
      
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
      
         message.react('745249428541014026')
      const kanalmesaj = new Discord.RichEmbed()
   .setColor('RANDOM')
        .setColor("RED")
      .setThumbnail(message.avatarURL)
          .setDescription(`**__FORCE BAN ATILDI!__**

**Yasaklanan Kişi**: <@${member}>
**Id**: ${member}
**Sebep**: ${reason}`)
         .setThumbnail(message.author.avatarURL)
        
       .setTimestamp()
      .setFooter(`Yetkili: ${message.author.username}`, `${message.author.displayAvatarURL}`)
        message.channel.send(kanalmesaj);
        client.channels.get('744249954314485922').send(banlog) //log kanalına atar
      member.send(kullanciya);
            
  })
            .catch((err) => {
                console.log(err);
            });
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['id-ban' ,'infaz'],
    permLevel: 2
};

exports.help = {
    name: 'force-ban',
    category: '',
    description: 'Üyenin IDsi ile ona ban atarsınız.',
    usage: 'force <kişi id>'
};