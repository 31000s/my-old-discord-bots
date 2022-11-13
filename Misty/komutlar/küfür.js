const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');
const db = require('quick.db')


exports.run = async (client, message, args) => {
  
  var prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;
  
  //emojii
       var emojiadd = await db.fetch(`mesajamoji_${message.guild.id}`);
  let emojiler = "";
  if (emojiadd === null || emojiadd === undefined){
    emojiler = "❌";
  }else {
    emojiler = emojiadd
  };
  //emoji
  
  let giris = args[0]
  
  if(!giris) {
    const embed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(` ${emojiler} Küfür filtresini açmak için \`\` ${prefix}küfür aç\`\` 
Kapatmak için \`\` ${prefix}küfür kapat\`\` yazabilirsin.`)
    message.channel.send(embed);
    
  }
  
if(giris === "aç") {	const küfür = new Discord.RichEmbed()
  .setColor('RED')
  .setDescription(`Küfür filtresi başarıyla açıldı!`)
  message.channel.send(küfür)
                    
                    db.set(`kufurac_${message.guild.id}`, "acik")
                   
                   }
  
  if(giris === "kapat") {	const küfür = new Discord.RichEmbed()
  .setColor('RED')
  .setDescription(`Küfür filtresi başarıyla açıldı!`)
  message.channel.send(küfür)
                    
                    db.set(`kufurac_${message.guild.id}`, "kapali")
                   
                   }
   
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['küfür'],
      kategori: "xd",
  permLevel: 0
};

exports.help = {
  name: 'küfür',
  description: 'küfür',
  usage: 'küfür'
};
//XiR