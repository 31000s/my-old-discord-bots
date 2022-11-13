const Discord = require("discord.js"),
  db = require("quick.db");

   function space(number){
let mylifeisadamngame = "";
String(number).split("").forEach(ahuh => {
mylifeisadamngame += "" + numbers[Number(ahuh)];
});
return mylifeisadamngame;
}

const numbers = [
    "<a:sfr:742117490917900310>",
    "<a:bir:742117477164515389>",
    "<a:tw:742117490494013480>",
    "<a:threess:742117490703728691>",
    "<a:dort:742117489646764075>",
    "<a:bes:742117490955649084>",
    "<a:altis:742117491169558569>",
    "<a:eyt:742117487231107083>",
    "<a:nayn:742117491282804777>",
    "<a:elevn:742117483384930354>"
  ]

exports.run = async (client, message, args, tools) => {
  
   const yasak = client.emojis.get('744501616698327061');
   if (message.channel.id !== '744532687250915389') return message.channel.send(`${yasak} **Bu komutun kullanımı yasaktır, sadece <#744532687250915389> kanalında kullanabilirsin.**`).then(m => m.delete(5000));
  
  let kişi;
  if (message.mentions.members.first()) {
    kişi = message.mentions.members.first();
  } else {
    kişi = message.author;
  }

  let bilgi = await db.fetch(`davet_${kişi.id}_${message.guild.id}`);
  let sayı2;
  if (!bilgi) {
    sayı2 = 0;
  } else {
    sayı2 = await db.fetch(`davet_${kişi.id}_${message.guild.id}`);
  }
  let veri = await db.fetch(`rol1_${message.guild.id}`);
  let veri12 = await db.fetch(`roldavet1_${message.guild.id}`);
  let veri21 = await db.fetch(`roldavet2_${message.guild.id}`);
  let veri2 = await db.fetch(`rol2_${message.guild.id}`);
  if (!veri) {
    const embed = new Discord.RichEmbed()
.setColor("RANDOM")
    .setAuthor(`Gif Town`, client.user.avatarURL)
     .setDescription(`
 **Davet Sahibi:** <@${kişi.id}>

 **Toplam davet:** **__${space(sayı2)}__**
`)
    .setTimestamp() 
      .setFooter(`Yetkili: ${message.author.username}`, `${message.author.displayAvatarURL}`)
    message.channel.send(embed);
  }
  if (message.member.roles.has(veri2)) {
    const embed = new Discord.RichEmbed()
.setColor("RANDOM")
    .setAuthor(`Gif Town`, client.user.avatarURL)
     .setDescription(`
 **Davet Sahibi:** <@${kişi.id}>

 **Toplam davet:** **__${space(sayı2)}__**
`)
    .setTimestamp() 
    
      
      .setFooter(`Yetkili: ${message.author.username}`, `${message.author.displayAvatarURL}`)
    message.channel.send(embed);
    return;
  }
  
  if (message.member.roles.has(veri)) {
    if (!veri2) {
      const embed = new Discord.RichEmbed()
.setColor("RANDOM")
      .setAuthor(`Gif Town`, client.user.avatarURL)
     .setDescription(`
 **Davet Sahibi:** <@${kişi.id}>

 **Toplam davet:** **__${space(sayı2)}__**
`)
    .setTimestamp() 
      .setFooter(`Yetkili: ${message.author.username}`, `${message.author.displayAvatarURL}`)
      message.channel.send(embed);
      return;
    }
    
  
    }
  
  
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["invites", "davetlerim", 'davet', 'invite'],
  permLevel: 0
};

exports.help = {
  name: "davetler"
};
