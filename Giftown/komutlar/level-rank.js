const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json")
const db = require("quick.db")

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

module.exports.run = async (client, message) => {
  
      //message.delete();
  const yasak = client.emojis.get('744501616698327061');
  if (message.channel.id !== '744532687250915389') return message.channel.send(`${yasak} **Bu komutun kullanımı yasaktır, sadece <#744532687250915389> kanalında kullanabilirsin.**`).then(m => m.delete(5000));
  
 let user = message.mentions.users.first() || message.author
  
   var id = user.id
  var gid = message.guild.id;
  
   var xp = await db.fetch(`xp_${id}_${gid}`);
  var lvl = await db.fetch(`lvl_${id}_${gid}`);
  var xpToLvl = await db.fetch(`xpToLvl_${id}_${gid}`);
  
   var kar = await db.fetch(`lvl_${id}_${gid}`);
  let baba = "";
  if (kar === null || kar === undefined){
    baba = "0";
  }else {
    baba = kar
  };
  
     var sido = await db.fetch(`xp_${id}_${gid}`);
  let vader = "";
  if (sido === null || sido === undefined){
    vader = "0";
  }else {
    vader = sido
  };
  
  
  

    const stats = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setDescription('**__LEVEL RANK__**')
  
   .addField('Level:', `${space(baba)}`, true)
  .addField('Xp:    ', ` ${space(vader)}`, true)
    
    .setThumbnail(user.avatarURL)
  .setTimestamp()
    
  .setFooter(`${message.author.username}`, `${message.author.displayAvatarURL}`)
  message.channel.send(stats)
  
};
module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['level-rank'],
  permLevel: 0,
  kategori: "level-rank"
};

module.exports.help = {
  name: "level-rank",
  description: "level-rank",
  usage: "level-rank"
};