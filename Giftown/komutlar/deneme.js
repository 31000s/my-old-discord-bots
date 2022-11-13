const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json")
const db = require("quick.db")


module.exports.run = async (client, message, args) => {
  
  let xd = args[0]
  
    let kontrol = await db.fetch(`dil_${message.guild.id}`);

 if (kontrol == "TR") {
   
  
  } 
  
  else {
   
  }

  
  if (kontrol == "TR") {
   
   if(xd == 'kapat'|| xd == 'close') { 
   
   message.channel.send('kapattı')
   }
  } 
  
  else {
     if(xd == 'kapat' || xd == 'close') { 
    message.channel.send('closed')
     }
  }



  
  
  
  
};
module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['de'],
  permLevel: 0,
  kategori: "de"
};

module.exports.help = {
  name: "de",
  description: "de",
  usage: "de"
};