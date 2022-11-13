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
  if (!message.guild.member(message.author).hasPermission("SEND_MESSAGES"))
    return;
  
  let tagayarla = await db.fetch(`tag_${message.guild.id}`); //tag

  var bay = await db.fetch(`erkekverolk_${message.guild.id}`);
  var baayan = await db.fetch(`kizkadinbayank_${message.guild.id}`);

  let tamam = message.guild.members.filter(r => r.roles.has(bay)).size;
  let bys = message.guild.members.filter(r => r.roles.has(baayan)).size;
  
   // let erkek = message.guild.roles.get().members.size;
  //let kadin = message.guild.roles.get(baayan).members.size;
  
  let tag = tagayarla;
  let boostcuk = "";

  const voiceChannels = message.guild.channels.filter(c => c.type === "voice");
  let count = 0;
  for (const [id, voiceChannel] of voiceChannels)
  count += voiceChannel.members.size;
  
  let boost = message.guild.members.filter(r => r.roles.has(boostcuk)).size;
  
  const embed = new Discord.RichEmbed()
    .setTitle(`<a:yamuk:742819702014738533>    **__İSTATİKLER__**`)
    .setDescription(`
<a:owner:737459285772075068> **Toplam üye:** **${space(message.guild.memberCount)}**

        	<a:online:738489750121480263> **Aktif Üye:** **${space(message.guild.members.filter(m => !m.user.bot && m.user.presence.status !== "offline").size)}**

          <a:partner:737459283490242570> **Seslideki Üye Sayısı:** ${space(count)}

        	<a:kristal:742863156552007820> **Taglı Üye Sayısı:** **${space(
            message.guild.members.filter(m => m.user.username.includes(tag))
              .size
          )}**

      <a:king:742818799434203146> **Erkek Üye Sayısı:** ${space(tamam)}
      <a:queen:742866640680779848> **Kadın Üye Sayısı:** ${space(bys)}`)
  //\`\`\` [m!tag] ile taglı sayını ayarlayabilirsin. \`\`\`
  //\`\`\`            \`\`\`  
       //  ${space(boost)}
        	//<a:nitrobooster:735479248525066282> **Boostlayan Üye Sayısı:** ${message.guild.premiumTier}
  
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
