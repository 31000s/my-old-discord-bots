const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const db = require("quick.db");

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


exports.run = async (client, message, args) => {
  
   const yasak = client.emojis.get('744501616698327061');
  if (message.channel.id !== '744532687250915389') return message.channel.send(`${yasak} **Bu komutun kullanımı yasaktır, sadece <#744532687250915389> kanalında kullanabilirsin.**`).then(m => m.delete(5000));
  
  if (!message.guild.member(message.author).hasPermission("SEND_MESSAGES"))
    return;
  


  let bys = message.guild.members.filter(r => r.roles.has('')).size;
  
   // let erkek = message.guild.roles.get().members.size;
  //let kadin = message.guild.roles.get(baayan).members.size;


  const voiceChannels = message.guild.channels.filter(c => c.type === "voice");
  let count = 0;
  for (const [id, voiceChannel] of voiceChannels)
  count += voiceChannel.members.size;
  
  const embed = new Discord.RichEmbed()
    .setTitle(`**__SUNUCU İSTATİKLERİ__**`)
    .setDescription(`**Toplam üye:** **${space(message.guild.memberCount)}**

**Aktif Üye:** **${space(message.guild.members.filter(m => !m.user.bot && m.user.presence.status !== "offline").size)}**
**Son Bir Gün de Giren Üyeler:** ${space(message.guild.members.filter(a => (new Date().getTime() - a.joinedTimestamp) < 86400000).size)}
**Son Bir Hafta İçine Giren Üyeler:** ${space(message.guild.members.filter(a => (new Date().getTime() - a.joinedTimestamp) < 604800000).size)}
**Son Bir Ay da Giren Üyeler:** ${space(message.guild.members.filter(a => (new Date().getTime() - a.joinedTimestamp) < 2629800000).size)}
`)
    .setThumbnail(client.user.avatarURL)
    .setFooter(`Yetkili: ${message.author.tag}`, message.author.avatarURL);
  message.channel.send(embed);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["say"],
  permLevel: 0
};
exports.help = {
  name: "say",
  description:
    "Sunucudaki Ses,Üye,Tag Alan Ve Boost Basan Kullanıcıları GÖsterir.",
  usage: "say"
};
