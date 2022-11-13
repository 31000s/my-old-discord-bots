const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const config = require("./config.json");
const ayar = require("./ayar.json");
const prettyMilliseconds = require('pretty-ms');
const chalk = require("chalk");
const moment = require("moment");
var Jimp = require("jimp");
const { Client, Util } = require("discord.js");
const weather = require("weather-js");
const fs = require("fs");
const db = require("quick.db");
const http = require("http");
const express = require("express");
require("./util/eventLoader.js")(client);
const path = require("path");
const request = require("request");
const snekfetch = require("snekfetch");
const queue = new Map();
const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");

function space(number) {
  let mylifeisadamngame = "";
  String(number)
    .split("")
    .forEach(ahuh => {
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
];

const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + "Başarılı!");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(config.token);

//---------------------------------KOMUTLAR---------------------------------\\

//invitemanager
const invites = {};

const wait = require("util").promisify(setTimeout);

client.on("ready", () => {
  wait(1000);

  client.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});

client.on("guildMemberRemove", async member => {
  let kanal = "744623970250391632";
  if (!kanal) return;
  let veri = await db.fetch(`rol1_${member.guild.id}`);
  let veri12 = await db.fetch(`roldavet1_${member.guild.id}`);
  let veri21 = await db.fetch(`roldavet2_${member.guild.id}`);
  let veri2 = await db.fetch(`rol2_${member.guild.id}`);
  let d = await db.fetch(`bunudavet_${member.id}`);
  const sa = client.users.get(d);
  const sasad = member.guild.members.get(d);
  let sayı2 = await db.fetch(`davet_${d}_${member.guild.id}`);
  db.add(`davet_${d}_${member.guild.id}`, -1);

  if (!d) {
    const xdd = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setDescription(
        `
      <@${member.user.id}> adlı kişi aramızdan ayrıldı.
      Davat Eden: <@${sa.id}>`
      )
      .setTimestamp()
      .setFooter(`Gif Town`, client.user.avatarURL);

    client.channels.get(kanal).send(xdd);
    return;
  } else {
    const aas = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setDescription(
        `
      <@${member.user.id}> adlı kişi aramızdan ayrıldı.
      Davat Eden: <@${sa.id}>`
      )
      .setTimestamp()
      .setFooter(`Gif Town`, client.user.avatarURL);

    client.channels.get(kanal).send(aas);

    if (!veri) return;

    if (sasad.roles.has(veri)) {
      if (sayı2 <= veri12) {
        sasad.removeRole(veri);
        return;
      }
    }
    if (sasad.roles.has(veri2)) {
      if (!veri2) return;
      if (sayı2 <= veri21) {
        sasad.removeRole(veri2);
        return;
      }
    }
  }
});

client.on("guildMemberAdd", async member => {
  member.guild.fetchInvites().then(async guildInvites => {
    let veri = await db.fetch(`rol1_${member.guild.id}`);
    let veri12 = await db.fetch(`roldavet1_${member.guild.id}`);
    let veri21 = await db.fetch(`roldavet2_${member.guild.id}`);
    let veri2 = await db.fetch(`rol2_${member.guild.id}`);
    let kanal = "744623970250391632";
    if (!kanal) return;
    const ei = invites[member.guild.id];

    invites[member.guild.id] = guildInvites;

    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    const sasad = member.guild.members.get(invite.inviter.id);
    const davetçi = client.users.get(invite.inviter.id);

    db.add(`davet_${invite.inviter.id}_${member.guild.id}`, +1);
    db.set(`bunudavet_${member.id}`, invite.inviter.id);
    let sayı = await db.fetch(`davet_${invite.inviter.id}_${member.guild.id}`);

    let sayı2;
    if (!sayı) {
      sayı2 = 0;
    } else {
      sayı2 = await db.fetch(`davet_${invite.inviter.id}_${member.guild.id}`);
    }

    const aa = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setDescription(
        `<@${member.user.id}> adlı kişi aramıza katıldı!
       **Davet eden:** <@${davetçi.id}>
       **__Toplam daveti:__** ${space(sayı2)}`
      )
      .setTimestamp()
      .setFooter(`Gif Town`, client.user.avatarURL);

    client.channels.get(kanal).send(aa);
    if (!veri) return;

    if (!sasad.roles.has(veri)) {
      if (sayı2 => veri12) {
        sasad.addRole(veri);
        return;
      }
    } else {
      if (!veri2) return;
      if (sayı2 => veri21) {
        sasad.addRole(veri2);
        return;
      }
    }
  });
});
//İNVİTE MANGER BİTTİ
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//---------------------------------GUARD BAŞLANGIÇ---------------------------------\\
client.on("roleDelete", async role => {
  const entry = await role.guild
    .fetchAuditLogs({ type: "ROLE_DELETE" })
    .then(audit => audit.entries.first());

  let yetkili = entry.executor;
  let mal = entry.executor.id;
  if (mal === ayar.aydim) return;
  let cezaliRolu = ayar.cezali;
  let logKanali = ayar.korumalog;
  await role.guild.member(yetkili).setRoles([cezaliRolu]);
  let yeniRol = await role.guild.createRole({
    name: role.name,
    color: role.color,
    hoist: role.hoist,
    position: role.position,
    permissions: role.permissions,
    mentionable: role.mentionable
  });
  role.guild.channels
    .get(logKanali)
    .send(
      new Discord.RichEmbed()
        .setTimestamp()
        .setDescription(
          `${yetkili} kişisi bir rol sildi ve cezalıya atıldı!\nRolü tekrar açtım ve üyelerine vermeye başladım!`
        )
    );
  let mesaj = await role.guild.channels
    .get(logKanali)
    .send(
      new Discord.RichEmbed().setDescription(
        `${role.name} adlı rol verilmeye başlanıyor!`
      )
    );
  setTimeout(() => {
    let veri = roleDefender[role.id];
    let index = 0;
    setInterval(() => {
      veri = roleDefender[role.id];
      if (index >= veri.Üyeler.length) {
        delete roleDefender[role.id];
        clearInterval(this);
      }
      let kisi = role.guild.members.get(veri.Üyeler[index]);
      try {
        kisi.addRole(yeniRol, "Koruma meydana geldi");
      } catch (err) {}
      mesaj.edit(
        new Discord.RichEmbed().setDescription(
          `${kisi} adlı üyeye ${yeniRol} rolü verildi!`
        )
      );
      index++;
    }, 2000);
  }, 5000);
});

const roleDefender = {};
client.on("guildMemberUpdate", async (oldMember, newMember) => {
  oldMember.roles.forEach(async role => {
    if (newMember.roles.some(r => r.id == role.id)) return;
    if (!roleDefender[role.id]) {
      roleDefender[role.id] = {
        Rol: role,
        Üyeler: [newMember.id],
        Silindi: false
      };
    } else {
      roleDefender[role.id].Üyeler.push(newMember.id);
    }
  });
});

//ANTİ RAİD SİSTEMİ

//BOT ENGEL,anti-baskın yada anti-raid
client.on("guildMemberAdd", async member => {
  // Yapımı Tamamen CodAre'den '~'Resađ Seferov✨#0809 a aitdir
  let kanal =
    (await db.fetch(`antiraidK_${member.guild.id}`)) == "anti-raid-aç";
  if (!kanal) return;
  var cod = member.guild.owner;
  if (member.user.bot === true) {
    if (db.fetch(`botizin_${member.guild.id}.${member.id}`) == "aktif") {
      let are = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setThumbnail(member.user.avatarURL)
        .setDescription(
          `**${member.user.tag}** (${member.id}) adlı bota bir yetkili izin verdi eğer kaldırmak istiyorsanız **${prefix}bot-izni kaldır [bot id]**.`
        );
      cod.send(are); //CodAre✨
    } else {
      let izinverilmemişbot = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setThumbnail(member.user.avatarURL)
        .setDescription(
          "**" +
            member.user.tag +
            "**" +
            " (" +
            member.id +
            ") " +
            "adlı bot **Sunucuya eklendi** ve banladım eğer izin vermek istiyorsanız **" +
            prefix +
            "bot-izni ver [bot id]**"
        );
      member.ban(); // Eğer sunucudan atmak istiyorsanız ban kısmını kick yapın
      cod.send(izinverilmemişbot);
    }
  }
});

//ANTİ RAİD SİSTEMİ SON



//---GİF PP---\\

client.on(`userUpdate`, (oldUser, newUser) => {
  let kişi = client.users.get(oldUser.id);
  let avatar = kişi.avatarURL.split("?")[0];
  let kanal = client.channels.find(ch => ch.id === "742491005877747906"); /// Gifsiz Avatar Kanal İd
  let kanal1 = client.channels.find(ch => ch.id === "742490938869547165"); /// Gifli Avatar Kanal İd
  if (avatar.endsWith(".png")) {
    const emb = new Discord.RichEmbed()
      .setImage(avatar)
      .setFooter(`${kişi.tag}`)
      .setTimestamp();
    kanal.send(emb);
  }
  if (avatar.endsWith(".gif")) {
    const emb = new Discord.RichEmbed()
      .setImage(avatar)
      .setFooter(`${kişi.tag}`)
      .setTimestamp();
    kanal1.send(emb);
  }
});
//---/////GİF PP---\\

//otorol
client.on("guildMemberAdd", async member => {
  let otorol = await db.fetch(`otorol_${member.guild.id}`);
  let otorolkanal = await db.fetch(`otorolkanal_${member.guild.id}`);
  let rolzz = member.guild.roles.get(otorol).name;
  if (!otorol) return;
  await member.addRole(member.guild.roles.get(otorol).id);
  if (otorolkanal && client.channels.has(otorolkanal)) {
    const otomss = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setThumbnail(client.user.avatarURL)
    .setDescription(`\` ${
      member.user.tag
    } \` Sunucuya katıldı! __** ${member.guild.members.size} **__ kişi olduk!

\` ${rolzz} \` rolü verildi!
Hesabın kurulma tarihi: \` ${moment(
      client.users.get(member.id).createdAt
    ).format("DD/MM/YYYY | HH:mm:ss")} \` `);

    await client.channels.get(otorolkanal).send(otomss);
  }
});
client.on("guildMemberAdd", member => {});
///


client.on("guildMemberRemove", async member => {
  let rol = await db.fetch(`otorol_${member.guild.id}`);
  let kanal = await db.fetch(`otorolkanal_${member.guild.id}`);
  let msj = await db.fetch(`sayaçmsjbb_${member.guild.id}`);
  
  if (!rol) return;
  if (!kanal) return;

  if (!msj) {
    const embed = new Discord.RichEmbed()
      .setColor("BLUE")
      .setThumbnail(client.user.avatarURL)
      .setDescription(`**@${member.user.tag }** adlı şahsa aramızdan ayrıldı! ${rol} kişi olmamıza ${rol - member.guild.memberCount} kişi kaldı!`)
    client.channels.get(kanal).send(embed);
    return;
  } else {
    var msj2 = msj
      .replace(`{sunucu}`, `${member.guild.name}`)
      .replace(`{üye}`, `${member.user.tag}`)
      .replace(`{üyetag}`, `<@${member.user.id}>`)
      .replace(`{hedef}`, `${rol}`)
      .replace(`{hedefkalan}`, `${rol - member.guild.memberCount}`);
    const embed = new Discord.RichEmbed()
      .setColor("BLUE")
      .setThumbnail(client.user.avatarURL)
      .setDescription(msj2)
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.get(kanal).send(embed);
    return;
  }
});



client.on("message", async message => {
  var id = message.author.id;
  var gid = message.guild.id;

  let hm = "açık";
  let kanal = "742430654746329108";
  let xps = "2";

  if (!hm) return;
  if (message.content.startsWith(prefix)) return;
  if (message.author.bot) return;

  var xp = await db.fetch(`xp_${id}_${gid}`);
  var lvl = await db.fetch(`lvl_${id}_${gid}`);
  var xpToLvl = await db.fetch(`xpToLvl_${id}_${gid}`);

  if (!lvl) {
    if (xps) {
      db.set(`xp_${id}_${gid}`, xps);
    }
    db.set(`xp_${id}_${gid}`, 4);
    db.set(`lvl_${id}_${gid}`, 1);
    db.set(`xpToLvl_${id}_${gid}`, 100);
  } else {
    if (xps) {
      db.add(`xp_${id}_${gid}`, xps);
    }
    db.add(`xp_${id}_${gid}`, 4);

    if (xp > xpToLvl) {
      db.add(`lvl_${id}_${gid}`, 1);
      db.add(
        `xpToLvl_${id}_${gid}`,
        (await db.fetch(`lvl_${id}_${gid}`)) * 100
      );
      if (kanal) {
        client.channels
          .get(kanal)
          .send(
            `<@${message.member.user.id}> Yeni seviye atladı! Seviye: **__${lvl}__**`
          );
      }
    }
  }
});

//GİF İLE İLGİLİ OLAN ALT YER >
client.on("message", async message => {
  var level = await db.fetch(`pplevel_${message.author.id}`);
  let kanal = "742430654746329108";

  if (message.attachments.first()) {
    if (!message.member.roles.has("745255250352406568"))
      if (message.channel.id != "742482253363413073")
        if (message.channel.id != "742489715118440599")


          db.add(`pplevel_${message.author.id}`, +1);
  }

  if (level == 5) {
    message.guild.member(message.author.id).addRole("742475406854324285");
    client.channels
      .get(kanal)
      .send(
        `<@${message.author.id}>, **__5__** tane fotoğraf/gif attığı için __**Beginner**__ rolü verildi!`
      );
    db.add(`pplevel_${message.author.id}`, +1);
  }

  if (level == 10) {
    message.guild.member(message.author.id).addRole("742475301837340682");
    client.channels
      .get(kanal)
      .send(
        `<@${message.author.id}>, **__10__** tane fotoğraf/gif attığı için __**Aqua**__ rolü verildi!`
      );
    db.add(`pplevel_${message.author.id}`, +1);
  }

  if (level == 15) {
    message.guild.member(message.author.id).addRole("742475299265970197");
    client.channels
      .get(kanal)
      .send(
        `<@${message.author.id}>, **__15__** tane fotoğraf/gif attığı için __**Shady**__ rolü verildi!`
      );
    db.add(`pplevel_${message.author.id}`, +1);
  }

  if (level == 20) {
    message.guild.member(message.author.id).addRole("742475297156497599");
    client.channels
      .get(kanal)
      .send(
        `<@${message.author.id}>, **__20__** tane fotoğraf/gif attığı için __**Legend**__ rolü verildi!`
      );
    db.add(`pplevel_${message.author.id}`, +1);
  }

  if (level == 25) {
    message.guild.member(message.author.id).addRole("742475295113871370");
    client.channels.get(kanal).send(
      `<@${message.author.id}>, **__25__** fotoğraf/gif attığı için __**Supreme**__
rolü verildi!`
    );
  }

  if (level == 50) {
    message.guild.member(message.author.id).addRole("742475271529037896");
    client.channels
      .get(kanal)
      .send(
        `<@${message.author.id}>, **__50__** fotoğraf/gif attığı için __**Sirius**__ rolü verildi!`
      );
    db.add(`pplevel_${message.author.id}`, +1);
  }

  if (level == 100) {
    message.guild.member(message.author.id).addRole("746427924751843419");
    client.channels
      .get(kanal)
      .send(
        `<@${message.author.id}> **__100__** fotoğraf/gif attığı için __**Guide**__ rolü verildi!`
      );
    db.add(`pplevel_${message.author.id}`, +1);
  }

  if (level == 250) {
    message.guild.member(message.author.id).addRole("746028653258735637");
    client.channels
      .get(kanal)
      .send(
        `<@${message.author.id}> **__250__** fotoğraf/gif attığı için __**Lord of Gifs**__ rolü verildi!`
      );
    db.add(`pplevel_${message.author.id}`, +1);
  }

  if (level == 500) {
    message.guild.member(message.author.id).addRole("746427853523910737");
    client.channels
      .get(kanal)
      .send(
        `<@${message.author.id}> **__500__** fotoğraf/gif attığı için __**King of Gifs**__ rolü verildi!`
      );
    db.add(`pplevel_${message.author.id}`, +1);
  }

  if (level == 1000) {
    message.guild.member(message.author.id).addRole("742509749748236288");
    client.channels
      .get(kanal)
      .send(
        `<@${message.author.id}> **__1000__** fotoğraf/gif attığı için __**God of Gif**__ rolü verildi!`
      );
    db.add(`pplevel_${message.author.id}`, +1);
  }
});


client.on("message", async (msj) => {
      let resim = msj.attachments.first()
      resim = resim.url.split("?")[0]; 
 var kanallar = [
     "742482253363413073",
     "742482445122666546",
     "742482466870395011",
     "742489715118440599",
     "744532687250915389",
     "744254067894780024",
     "744254409860579419",
     "745249572783390762"];
  if (msj.author.bot || kanallar.includes(msj.channel.id)) return;
  if (resim) {
    if (resim.endsWith(".gif")){
   db.add(`gifrank_${msj.author.id}`, +1);
    } else { 
     db.add(`photorank_${msj.author.id}`, +1);
    };
  };
});

client.on("message", async (msj) => {
  
      var tayyip = await db.fetch(`pplevel_${msj.author.id}`);
  let becer = "";
  if (tayyip === null || tayyip === undefined){
    becer = "0";
  }else {
    becer = tayyip
  };
  
    var maow = await db.fetch(`gifrank_${msj.author.id}`);
  let miyav = "";
  if (maow === null || maow === undefined){
    miyav = "0";
  }else {
    miyav = maow
  };
  
    var song = await db.fetch(`photorank_${msj.author.id}`);
  let voc = "";
  if (song === null || song === undefined){
    voc = "0";
  }else {
    voc = song
  };
  
  const xd = new Discord.RichEmbed()
      .setAuthor(`Gif Town - Log`, client.user.avatarURL)
      .setDescription(`${msj.author} adlı üye tarafından ${msj.channel} kanalına **${space(msj.attachments.size)}** **gif** gönderdi.

**Detaylı Bilgi**:
Şimdiye kadar ${space(miyav)} tane gif, ${space(voc)} tane fotoğraf gönderdi! Toplam da ${space(becer)} oldu!`)
      .setTimestamp()
      .setFooter(`Log Sistemi`);
  
  const xds = new Discord.RichEmbed()
      .setAuthor(`Gif Town - Log`, client.user.avatarURL)
      .setDescription(`${msj.author} adlı üye tarafından ${msj.channel} kanalına **${space(msj.attachments.size)}** **fotoğraf** gönderdi.

**Detaylı Bilgi**:
Şimdiye kadar ${space(miyav)} tane gif, ${space(voc)} tane fotoğraf gönderdi! Toplam da ${space(becer)} oldu!`)
      .setTimestamp()
      .setFooter(`Log Sistemi`);

  let resim = msj.attachments.first()
      resim = resim.url.split("?")[0]; //hata olan yer

  let kanal = '742490770837340310'
  
 var kanallar = [
"742482253363413073",
     "742482445122666546",
     "742482466870395011",
     "742489715118440599",
     "744532687250915389",
   
   "744254067894780024",
   "744254409860579419",
   "745249572783390762"
  ];
  if (msj.author.bot || kanallar.includes(msj.channel.id)) return;
  if (resim) {
   

    if (resim.endsWith(".gif"))
      
    msj.guild.channels.get(kanal).send(xd) //gif
      
    else 
    msj.guild.channels.get(kanal).send(xds);
       
  };
});


client.on("message", async message => {
  if(message.author.id === client.user.id) return;
  if(message.guild) return;
 //DCS 
client.channels.get('749314770162941952').send(
  new Discord.RichEmbed()
  .setAuthor('Yeni DM!')
  .setFooter('DM-LOG SİSTEMİ!')
  .setDescription(`Gönderen kişi: ${message.author.tag}`)
  .setTimestamp()
  .setThumbnail(message.author.avatarURL)
  .addField("Mesajı;",
message.content).setColor("BLACK"))//DCS!
})


const events = {
    MESSAGE_REACTION_ADD: 'messageReactionAdd',
    MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
};//
    
client.on('raw', async event => {
    if (!events.hasOwnProperty(event.t)) return;
    const { d: data } = event;
    const anto = client.users.get(data.user_id);
    const channel = client.channels.get(data.channel_id) || await anto.createDM();
    if (channel.messages.has(data.message_id)) return;
    const message = await channel.fetchMessage(data.message_id);
    const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
    const reaction = message.reactions.get(emojiKey);
    client.emit(events[event.t], reaction, anto);
});

client.on('messageReactionAdd', (reaction, user) => {
 if (reaction.message.id == "749970412024102933") {
    if (reaction.emoji.name == "🔞") {
      reaction.message.guild.members.get(user.id).addRole(reaction.message.guild.roles.find('name', 'Nsfw 🔞'))
      }
  }
});

client.on('messageReactionRemove', (reaction, user) => {
    if (reaction.message.id == "749970412024102933") {
      if (reaction.emoji.name == "🔞") {
        reaction.message.guild.members.get(user.id).removeRole(reaction.message.guild.roles.find('name', 'Nsfw 🔞'))
        }
  }
});


