const db = require('quick.db')
const Discord = require('discord.js')

exports.run = async (bot, message, args) => {

   
  //emojii
       var emojiadd = await db.fetch(`mesajamoji_${message.guild.id}`);
  let emojiler = "";
  if (emojiadd === null || emojiadd === undefined){
    emojiler = "❌";
  }else {
    emojiler = emojiadd
  };
  //emoji
  
  
  
  const yon = new Discord.RichEmbed()
      .setColor('RED')
      .setDescription(`Bu komudu kullanabilmek için **Sunucu Taç**ının sende olması gerek!`)
  
     if(message.author.id !== message.guild.owner.user.id)
        return message.channel.send(yon)
  
const sis = new Discord.RichEmbed()
.setColor('RED')
.setDescription(`Sağtık ban sistemi açık değil. Açmak için: \` sağtıkban [aç/kapat] \` `)
  
    if (!args[0]) return message.channel.send(sis)

  const sax = new Discord.RichEmbed()
  .setColor('RED')
  .setDescription(`Sağ Tık Ban sistemi açıldı.`)
  
    if (args[0] == 'aç') {
        db.set(`koruma_${message.guild.id}`, 'acik')
        message.channel.send(sax)
      
      

    }
  
    const bab = new Discord.RichEmbed()
  .setColor('RED')
  .setDescription(`Sağ Tık Ban sistemi kapatıldı.`)
  
    if (args[0] == 'kapat') {
        db.set(`koruma_${message.guild.id}`, 'kapali')
        message.channel.send(bab)

    }

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['sağtıkban'],
    permLevel: 0
};

exports.help = {
    name: 'sağtıkban',
    description: '',
    usage: 'sağtıkban aç/kapat'
}; 