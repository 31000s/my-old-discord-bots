const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const ayar = require('../ayar.json');
var prefix = ayarlar.prefix;



exports.run = (client, message, args) => {
  
   const giris = args[0]
   
   
  
    if(giris === "botlist" || giris === "Botlist" || giris === "BOTLİST") {
      
      let lenopod = new Discord.RichEmbed()
  .setColor('BLACK')
  .setAuthor('ℹ️ BOTLİST İNFO')
  .setDescription(`
**KANALLAR**:
\`\`\`
#announcement
#rules
#hg-bb

#chat-tr
#chat-global
#bot-command

#bot-ekleme-şartları
#bot-log
#add-bot

#bost-test
#bost-test-2

#sayaç

\`\`\`
**Sesli Oda Kanalları**:
\`\`\`
Bost Test #1
Bost Test #2
\`\`\`
**Kategori Kanalları**:
\`\`\`
İnformation
General
Other
Test
Log
\`\`\`
**Roller**:
\`\`\`
Owner
Administrator
Moderator
Manager
Authorized

Developer
Members
Automon

\`\`\``)
      
      message.channel.send(lenopod)
  }
  

  
  


      
  
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['template-info', 'şablon-bilgi'],
    permLevel: 0
};

exports.help = {
    name: ['template-info'],
      category: ['template-info'],
      description: ['template-info <şablon adı>'],
};