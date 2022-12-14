const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (bot, message, args) => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "!";
  if (!message.member.hasPermission("KICK_MEMBERS")) {
    const embed = new Discord.RichEmbed()
      .setDescription(`Ne yazık ki bu komutu kullanmaya yetkin yok.`)
      .setColor("BLUE")
      .setFooter(bot.user.username, bot.user.avatarURL);

    message.channel.send(embed);
    return;
  }

  let msj = args.slice(0).join(" ");
  if (!msj) {
    return message.channel.send(
      new Discord.RichEmbed()
        .setDescription(`Lütfen bir mesaj belirtiniz!

**__Değişkenler:__**
{üye} = Üyenin adını atar.
{üyetag} = Üyeyi taglar.
{sunucu} = Sunucu adını atar.
{hedef} = Hedefi atar.
{hedefkalan} = Kalan kişiyi atar.`)
        .setColor("BLUE")
        .setFooter(bot.user.username, bot.user.avatarURL)
    );
  }

  const embed = new Discord.RichEmbed()
    .setColor("BLUE")
     .setAuthor(`${bot.user.username}`, bot.user.avatarURL)
    .setDescription(`Sayaç Bb mesajı; ${msj} olarak ayarlandı!`)
    .setFooter(message.author.username, message.author.avatarURL);
  message.channel.send(embed);

  db.set(`sayaçmsjbb_${message.guild.id}`, msj);
};

module.exports.conf = {
  aliases: ["bb-mesaj-ayarla"],
  permLevel: 2,
  enabled: true,
  guildOnly: true,
  kategori: "moderasyon"
};

module.exports.help = {
  name: "sayaç mesaj bb",
  description: "sayaç mesaj bb",
  usage: "sayaç mesaj bb"
};
