const db = require("quick.db");
const Discord = require("discord.js");
const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args) => {
  
   //emojii
       var emojiadd = await db.fetch(`mesajamoji_${message.guild.id}`);
  let emojiler = "";
  if (emojiadd === null || emojiadd === undefined){
    emojiler = "❌";
  }else {
    emojiler = emojiadd
  };
  //emoji
  
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || ayarlar.prefix;
  if(message.author.id !== message.guild.owner.user.id) {
    const embed = new Discord.RichEmbed()
      .setDescription(`Bu komutu sadece **Sunucu Kurucusu** kullanabilir!`)
      .setColor("BLUE");

    message.channel.send(embed);
    return;
  }
  if (!args[0]) {
    const embed = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(` ${emojiler} Kanal etiketlemelisin! Örnek: \`\` ${prefix}reklam-engel [aç/kapat] \`\` `)

    message.channel.send(embed);
    return;
  }
  let kufur = await db.fetch(`kufur_${message.guild.id}`);
  if (args[0] == "aç") {
    if (kufur) {
      const embed = new Discord.RichEmbed()
.setColor("BLUE")
        .setAuthor(`${client.user.username}`, client.user.avatarURL)
  .setDescription(`Reklam sistemi, zaten **aktif!**`)
  .setFooter(`Yetkili: ${message.author.username}`, `${message.author.displayAvatarURL}`) 

      message.channel.send(embed);
      return;
    } else {
      db.set(`kufur_${message.guild.id}`, "Açık");
      const embed = new Discord.RichEmbed()
.setColor("BLUE")
        .setAuthor(`${client.user.username}`, client.user.avatarURL)
  .setDescription(`Reklam sistemi, başarıyla **açıldı!**`)
  .setFooter(`Yetkili: ${message.author.username}`, `${message.author.displayAvatarURL}`) 

      message.channel.send(embed);
    }
  } else if (args[0] == "kapat") {
    db.delete(`kufur_${message.guild.id}`);
    const embed = new Discord.RichEmbed()
      .setColor("BLUE")
        .setAuthor(`${client.user.username}`, client.user.avatarURL)
  .setDescription(`Reklam sistemi, başarıyla **kapatıldı!**`)
  .setFooter(`Yetkili: ${message.author.username}`, `${message.author.displayAvatarURL}`) 

    message.channel.send(embed);
  }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["reklamengel"],
  permLevel: 2,
  kategori: "sunucu"
};

exports.help = {
  name: "reklam-engel",
  description: "reklam engeli aktif edersiniz.",
  usage: "reklam-engel"
};
