const db = require("quick.db");
const ayarlar = require('../ayarlar.json')
const Discord = require("discord.js");

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
      .setDescription(`Bu komutu sadece **Sunucusu Kurucusu** kullanabilir.`)
      .setColor("BLUE")
      .setFooter(client.user.username, client.user.avatarURL);
    message.channel.send(embed);
    return;
  }
  if (!args[0]) {
    const embed = new Discord.RichEmbed()
      .setColor("BLUE")
       .setAuthor(`${client.user.username}`, client.user.avatarURL)
      .setDescription(` ${emojiler} Yanlış Kullanım! kullanım! örnek: \` ${prefix}ever-engel [aç/kapat] \` `)
      .setFooter(`Yetkili: ${message.author.username}`, `${message.author.displayAvatarURL}`) 

    message.channel.send(embed);
    return;
  }
  let kufur = await db.fetch(`ever_${message.guild.id}`);
  if (args[0] == "aç") {
    if (kufur) {
      const embed = new Discord.RichEmbed()
        .setColor("BLUE")
        .setTitle("Ever-Engel sistemi!")
        .setDescription("Görünüşe göre everyone filtresi zaten aktif!")
        .setFooter(client.user.username, client.user.avatarURL);

      message.channel.send(embed);
      return;
    } else {
      db.set(`ever_${message.guild.id}`, "acik");
      const embed = new Discord.RichEmbed()
        .setColor("BLUE")
        .setTitle("Ever-Engel sistemi!")
        .setDescription("Ever filtresi başarıyla açıldı!")
        .setFooter(client.user.username, client.user.avatarURL);

      message.channel.send(embed);
    }
  } else if (args[0] == "kapat") {
    db.delete(`ever_${message.guild.id}`);
    const embed = new Discord.RichEmbed()
      .setColor("BLUE")
      .setTitle("Ever-Engel sistemi!")
      .setDescription("Ever filtresi başarıyla kapandı!")
      .setFooter(client.user.username, client.user.avatarURL);

    message.channel.send(embed);
  }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["ever"],
  permLevel: 2,
  kategori: "sunucu"
};

exports.help = {
  name: "ever-engel",
  description: "ever engeli aktif edersiniz.",
  usage: "ever-engel"
};
