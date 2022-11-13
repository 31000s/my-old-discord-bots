const Discord = require("discord.js");
const db = require("quick.db");
let a = require("../ayarlar.json");

exports.run = async (client, message, args, params) => {
  if(message.author.id !== message.guild.owner.user.id)
    return message.channel.send(
      new Discord.RichEmbed().setDescription(
        `Bu komut **sunucu sahibine** özeldir!`
      )
    );

 const rol =   db.fetch(`uyariayarla_${message.guild.id}`)
 const sayi = db.fetch(`uyarisayi_${message.guild.id}`)
  
  let cezalirol = rol;
  let maxuyarı = sayi;
  let m31rt = a.prefix;
  if (
    !args[0] ||
    !args[0] === "kanal" ||
    !args[0] === "kanal-sıfırla" ||
    !args[0] === "ver" ||
    !args[0] === "sil"
  )
    return message.channel.send(
      new Discord.RichEmbed()
        .setDescription( `**__YANLIŞ KULLANIM!__**
Bu komutu kullanmak için: ayarlamalar yapman gerek!
Log kanal: \`uyarı kanal\`
Log kanalı Sıfırla: \`uyarı kanal-sıfırla\`
Uyarı siler.: \`uyarı ver\`
Uyarı sıfırlar: \`uyarı sil\`
Uyarı geçmişi: \`uyarı kontrol\` `)
        .setFooter(`${client.user.username}`, client.user.avatarURL)
    );
  if (args[0] === "kanal" || args[0] === "channel") {
    let kk = await db.fetch(`uk_${message.guild.id}`);
    if (kk)
      return message.channel.send(
        new Discord.RichEmbed().setDescription(
          `Zaten uyarı log kanalı ayarlanmış!`
        )
          .setFooter(`${client.user.username}`, client.user.avatarURL)
      );
    let k =
      message.mentions.channels.first() ||
      message.guild.channels.find(channel => channel.name === args[1]) ||
      message.guild.channels.get(args[1]);
    if (!k)
      return message.channel.send(
        new Discord.RichEmbed().setDescription(
          `Bir kanal etiketlemelisin!`
        )
        .setFooter(`${client.user.username}`, client.user.avatarURL)
      );
    await db.set(`uk_${k.guild.id}`, `${k.id}`);
    message.channel.send(
      new Discord.RichEmbed().setDescription(
        `Log kanalı ayarlandı!`
      )
      .setFooter(`${client.user.username}`, client.user.avatarURL)
    );
  }
  if (args[0] === "kanal-sıfırla" || args[0] === "reset-channel") {
    await db.delete(`uk_${message.guild.id}`);
    message.channel.send(
      new Discord.RichEmbed().setDescription(
        `**Hey <@${message.author.id}>! Uyarı log kanalı başarı ile sıfırlandı!**`
      )
      .setFooter(`${client.user.username}`, client.user.avatarURL)
    );
  }
  if (args[0] === "ver" || args[0] === "give") {
    let kkk = await db.fetch(`uk_${message.guild.id}`);
    if (!kkk)
      return message.channel.send(
        new Discord.RichEmbed()
        .setDescription(`Uyarı yapmak için bir **log** kanalı ayarlamalısın! \`uyarı kanal <#kanal>\``)
        .setFooter(`${client.user.username}`, client.user.avatarURL)
      );
    let u =
      message.mentions.members.first() ||
      message.guild.members.get(args[1]) ||
      message.guild.members.find(member => member.user.username === args[1]);
    if (!u)
      return message.channel.send(
        new Discord.RichEmbed().setDescription(
          `Bir kullanıcı etiketlemelisin!`
        )
        .setFooter(`${client.user.username}`, client.user.avatarURL)
      );
    if (u.user.bot || u.id === message.author.id)
      return message.channel.send(
        new Discord.RichEmbed().setDescription(
          `Kendini ve ya botu uyaramazsın!`
        )
        .setFooter(`${client.user.username}`, client.user.avatarURL)
      );
    let s = args.slice(2).join(" ");
    if (!s)
      return message.channel.send(
        new Discord.RichEmbed().setDescription(
          `Sebep yazmalısın!`
        )
        .setFooter(`${client.user.username}`, client.user.avatarURL)
      );
    db.add(`uyarino-${u.id}`, 1);
    let m3rt = await db.fetch(`uyarino-${u.id}`);
    u.send(
      `${message.author.tag} tarafından, ${message.guild.name} adlı sunucu da, **${s}** sebebiyle uyarıldın!` 
      //**${message.guild.name}** adlı sunucudan **${message.author.tag}** tarafından uyarıldın!\nToplam uyarın: \`${m3rt}\`\nUyarılma sebebin: \`${s}\
    );
    message.reply(`**Kullanıcı başarıyla uyarıldı!**`);
    let m3rkt = client.channels.get(kkk);
    if (m3rt < maxuyarı) {
      let m1rt = new Discord.RichEmbed()
        .setTitle("Bir kullanıcı uyarıldı!")
        .setDescription(`__**BİR KULLANICI UYARILDI!__**

Uyarılan kişi: <@${u.id}>
Uyarılan ID: **${u.id}**
Uyarılma Sebebi: **${s}**
Uyarı sayısı: **__${m3rt}__**

Uyaran yetkili: <@${message.author.id}>`)
        .setFooter(message.guild.name, message.guild.iconURL);
      m3rkt.sendEmbed(m1rt);
    } else {
      let editlenir = new Discord.RichEmbed()
    .setDescription(`__**BİR KULLANICI UYARILDI!__**

Uyarılan kişi: <@${u.id}>
Uyarılan ID: **${u.id}**
Uyarılma Sebebi: **${s}**
Uyarı sayısı: **__${m3rt}__**

Uyaran yetkili: <@${message.author.id}>`)
        .setFooter(message.guild.name, message.guild.iconURL);
      m3rkt.send(editlenir);
      let ee = message.guild.roles.get(cezalirol);
      u.addRole(ee);
    }
  }

  if (args[0] === "sil" || args[0] === "delete") {
    let u =
      message.mentions.members.first() ||
      message.guild.members.get(args[1]) ||
      message.guild.members.find(member => member.user.username === args[1]);
    if (!u)
      return message.channel.send(
        new Discord.RichEmbed().setDescription(
          `Senin belirttiğin kullanıcıyı bulamadım!`
        )
      );
    if (u.user.bot || u.id === message.author.id)
      return message.channel.send(
        new Discord.RichEmbed().setDescription(
          `Bir insan kendini ve ya botu niye uyarır ki!`
        )
      );
    let dd = await db.fetch(`uyarino-${u.id}`);
    if (!dd)
      return message.channel.send(
        new Discord.RichEmbed().setDescription(
          `Bu <@${message.author.id}> kişi hiç uyarılmamış!`
        )
      );
    if (!args[2])
      return message.channel.send(
        new Discord.RichEmbed().setDescription(
          `Uyarıları silmen için 10'dan büyük bir sayı girmen gerek!`
        )
      );
    if (isNaN(args[2]) || args[2] >= 10)
      return message.channel.send(
        new Discord.RichEmbed().setDescription(
          `Uyarı silmen için 10'dan küçük bir sayı girmen gerekiyor!`
        )
      );
    if (args[2] > dd)
      return message.channel.send(
        new Discord.RichEmbed().setDescription(
          `Belirttiğin sayı kullanıcının uyarı sayısından büyük!`
        )
      );
    if (dd <= 0)
      return message.channel.send(
        new Discord.RichEmbed().setDescription(
          `**Hey <@${message.author.id}>! Belirttiğin kullanıcının uyarı sayısı zaten 0!**`
        )
      );
    let kkkk = await db.fetch(`uk_${message.guild.id}`);
    message.reply(
      `**Kullanıcının başarıyla \`${args[2]}\` adet uyarısı silindi!**`
    );
    db.subtract(`uyarino-${u.id}`, args[2]);
    
    const xd = new Discord.RichEmbed()
    .setColor('ORANGE')
    .setDescription( `Sunucudan, **${message.author.tag}** tarafından 1 uyarın kaldırıldı!
Toplam kalan uyarın: \`${dd}\``)
    .setFooter(`${client.user.username}`, client.user.avatarURL)
    
    u.send(xd);
    client.channels.get(kkkk).sendEmbed(
      new Discord.RichEmbed()
        .setTitle("Bir kullanıcın uyarısı kaldırıldı!")
        .addField(
          "**Uyarısı Kaldırılan Kullanıcı**",
          `<@${u.id}> - **${u.id}**`
        )
        .addField(
          "**Uyarısını Kaldıran Yetkili**",
          `<@${message.author.id}> - **${message.author.id}**`
        )
        .addField(
          "**Uyarılma Ayrıntıları**",
          `**Toplam Uyarılma Sayısı:** \`${dd ? dd : "Uyarılarının tamamı silinmiş veya bulunmuyor."}\``
        )
        .setFooter(message.guild.name, message.guild.iconURL)
    );
  }
  if (args[0] === "bilgi" || args[0] === "information") {
    let u =
      message.mentions.members.first() ||
      message.guild.members.get(args[1]) ||
      message.guild.members.find(member => member.user.username === args[1]) ||
      message.author;
    if (!u)
      return message.channel.send(
        new Discord.RichEmbed().setDescription(
          `Etiketlediğin kullanıcıyı bulamadım`
        )
      );
    let d = await db.fetch(`uyarino-${u.id}`);
    message.channel.send(
      new Discord.RichEmbed()
        .setTitle("Uyarı Kontrol")
        .addField("**Kullanıcı**", `<@${u.id}> - **${u.id}**`)
        .addField(
          "**Uyarı sayısı**",
          `${d ? d : "Bu kullanıcının uyarısı yok!"}`
        )
    );
  }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['uyarı', 'alert', 'warning'],
  permLevel: 0
};

exports.help = {
  name: "uyarı",
  description: "(Gelişmiş) Kullanıcı uyarma & uyarı silme & kontrol etme komutu.",
  usage: "uyarı <ver/sil/kanal/kanal-sıfırla>"
};
