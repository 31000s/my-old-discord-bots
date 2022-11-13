const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db')
let prefix = ayarlar.prefix

module.exports.run = async (bot, message, args) => {
  
   let teyitci = await db.fetch(`teyitci_${message.guild.id}`)
  
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
 //if (!message.member.roles.has(teyitci.id)) return message.channel.send(teyitmsj);
  
 if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(teyitmsj);
  
  let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  
  let kullanıcı = message.mentions.members.first()
  
   const migoderler = new Discord.RichEmbed()
      .setColor("RANDOM")
       .setDescription(` ${emojiadd} Yanlış kullanım! Örnek: \`\` ${prefix}kadın @kişi <isim> <yaş> \`\` `)
		if(!kullanıcı) return message.channel.send(migoderler)

	let isim = args[1]
	let yaş = args[2]
  
  var tagX = await db.fetch(`tag_${message.guild.id}`);
  let tag = "";
  if (tagX === null || tagX === undefined){
    tag = "";
  }else {
    tag = tagX
  };
  //
  let verol = await db.fetch(`kizkadinbayan_${message.guild.id}`); 
  let alrol = await db.fetch(`kayitsiz_${message.guild.id}`); //kayitsiz
  
    
    var emojiX =  await db.fetch(`banemoyar_${message.guild.id}`);
  let emoji = "";
  if (emojiX === null || emojiX === undefined || emojiX === ''){
    emoji = "✅";
  }else {
    emoji = emojiX
  };

  //ayarlanmamış
  
  if (!verol) {
    const embed = new Discord.RichEmbed()
         .setColor("RANDOM")
       .setDescription(` ${emojiler} Verilecek rol ayarlanmamış! \`\` ${prefix}kadın-rolü @rol \`\` `)
    message.channel.send(embed);
    return;
  }
  
          if (!alrol) {
    const embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setDescription(` ${emojiler} Alınacak rol ayarlanmamış! \`\` ${prefix}kayıtsız-rolü @rol \`\` `)
    message.channel.send(embed);
    return;
  }
  

          if (!yaş) {
    const embed = new Discord.RichEmbed()
       .setColor("RANDOM")
       .setDescription(` ${emojiler} Yanlış kullanım! Yaş belirtmelisin! \`\` ${prefix}kadın @kişi <isim> <yaş> \`\` `)
    message.channel.send(embed);
    return;
  }
          if (!isim) {
    const embed = new Discord.RichEmbed()
       .setColor("RANDOM")
      .setDescription(` ${emojiler} Yanlış kullanım! İsim yazmalısın! \`\` ${prefix}kadın @kişi <isim> <yaş> \`\` `)
    message.channel.send(embed);
    return;
  }
   

    const lenopod = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setDescription(` ${emojiler} Yanlış kullanım! Bir kullanıcı etiketlemelisin!`)
  if (!user) return message.channel.sendEmbed(lenopod)
  
  
   message.react(emoji)
const leoniew = new Discord.RichEmbed()        
  .setColor('RANDOM')
  .setDescription(`${user} adlı kullanıcı başarıyla kayıt edildi!`)
  .setFooter(`Komutu kullanan yetkili: ${message.author.username}`, `${message.author.displayAvatarURL}`) 
.setTimestamp()
 user.addRole(verol)
  user.removeRole(alrol)
   kullanıcı.setNickname(`${tag} ${isim} | ${yaş}`)
   message.channel.sendEmbed(leoniew)
  
   db.add(`kayitKiz_${message.author.id}`, + 1);
 
} 
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['k', 'kadın', 'kız'],
    permLevel: 0
}

exports.help = {
    name: 'k',
    description: 'kadın komutu',
    usage: 'k @kişi <isim> <yaş>'
}