const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const ayar = require('./ayar.json');
const config = require('./config.json')
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const weather = require('weather-js')
const fs = require('fs');
const db = require('quick.db');
const http = require('http');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const request = require('request');
const snekfetch = require('snekfetch');
const queue = new Map();
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');


var önEk = ayarlar.prefix;
var prefix = ayarlar.prefix;
const { TOKEN, PREFIX, GOOGLE_API_KEY } = require('./ayarlar.json');
const youtube = new YouTube(GOOGLE_API_KEY);

const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + "AKTİF TUTMA İŞLEMİ BAŞARILI");
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
fs.readdir('./komutlar/', (err, files) => {
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
    };
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

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(config.token);

//---------------------------------KOMUTLAR---------------------------------\\

//HG MESAJI
client.on("guildMemberAdd", async message => {
  let kanalmesaj = await db.fetch(`kayitmesaj_${message.guild.id}`);
  let kullanıcı = client.users.get(message.id);
   let teyitci = await db.fetch(`teyitci_${message.guild.id}`);
  
  let logChannel = client.channels.get(kanalmesaj);
  if (!logChannel) return;
  const kurulus = new Date().getTime() - kullanıcı.createdAt.getTime();
     let xd;
  if (kurulus < 1296000000) xd = "Güvenilir Değil!";
  if (kurulus > 1296000000) xd = "Güvenilir!";
  
 let hgmesaj = await db.fetch(`hgmesaj_${message.guild.id}`).replace("${kullanıcı}", `${message}`).replace("${güvenlimi}", `${xd}`).replace("${tarih}", "xd").replace("${kuruluş}", `${moment(client.users.get(message.id).createdAt).format('DD/MM/YYYY | HH:mm:ss')}`).replace("${teyitçi}", `<@&${teyitci}>`).replace("${kaçkişiolduk}", `${message.guild.members.size}`);
  
  const hgs = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(hgmesaj);
  
  logChannel.send(hgs);
});

//sa - as 
client.on('message', async (msg, member, guild) => {
  let i = await  db.fetch(`saas_${msg.guild.id}`)
      if(i === 'açık') {
        if (msg.content.toLowerCase() === 'sa') {
        msg.reply('Aleyküm Selam Hoşgeldin');      
      } 
      }
    });

//otorol
client.on("guildMemberAdd", async(member) => {
  let otorol = await db.fetch(`otorol_${member.guild.id}`)
  let otorolkanal = await db.fetch(`otorolkanal_${member.guild.id}`)
  let rolzz = member.guild.roles.get(otorol)
  if(!otorol) return
  await(member.addRole(member.guild.roles.get(otorol).id))
  if(otorolkanal && client.channels.has(otorolkanal)) {

  const otomss = new Discord.RichEmbed()
    .setColor('RANDOM')
     .setThumbnail(client.user.avatarURL)
  
  .setDescription(`\` ${member.user.tag} \` Sunucuya katıldı! __** ${member.guild.members.size} **__ kişi olduk!

\` ${rolzz} \` rolü verildi!
Hesabın kurulma tarihi: \` ${moment(client.users.get(member.id).createdAt).format('DD/MM/YYYY | HH:mm:ss')} \` `)

   await client.channels.get(otorolkanal).send(otomss)
  }
})
client.on('guildMemberAdd', member => {
})


client.on("guildMemberRemove", async member => {
  let rol = await db.fetch(`otorol_${member.guild.id}`)
  let kanal = await db.fetch(`kayitmesaj_${member.guild.id}`)
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

//ever engel
client.on("message", async message => {
  let ever = await db.fetch(`ever_${message.guild.id}`);
  let sayı = await db.fetch(`sayi_${message.author.id}`);
  if (ever === "acik") {
    const a = message.content;
    if (a === "@everyone" || a === "@here") {
      if (message.member.hasPermission("BAN_MEMBERS")) return;
      db.add(`sayi_${message.author.id}`, 1);
      if (sayı == null) {
        const embed = new Discord.RichEmbed()
          .setColor("BLUE")
          .setDescription(
            "Bu 1. uyarın! Lütfen tekrarlama! Aksi taktirde atılacaksın!\n(1/3)"
          )
          .setFooter(client.user.username, client.user.avatarURL);
        message.channel.send(embed);
        message.delete();
        return;
      }
      if (sayı === 1) {
        const embed = new Discord.RichEmbed()
          .setColor("BLUE")
          .setDescription(
            "Bu 2. uyarın! Lütfen tekrarlama! Aksi taktirde atılacaksın!\n(2/3)"
          )
          .setFooter(client.user.username, client.user.avatarURL);
        message.channel.send(embed);
        message.delete();
        return;
      }
      if (sayı > 2) {
        message.delete();
        const embed = new Discord.RichEmbed()
          .setColor("BLUE")
          .setDescription("Sunucudan atılıyorsun!")
          .setFooter(client.user.username, client.user.avatarURL);
        message.channel.send(embed);
        db.delete(`sayi_${message.author.id}`);
        message.member.kick();
        return;
      }
    }
  } else {
    return;
  }
});

//ANTİ RAİD SİSTEMİ
client.on("guildMemberAdd", async member => {
let kanal = await db.fetch(`antiraidK_${member.guild.id}`)== "anti-raid-aç"
  if (!kanal) return;  
  var cod = member.guild.owner
  if (member.user.bot === true) {
     if (db.fetch(`botizin_${member.guild.id}.${member.id}`) == "aktif") {
    let are = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setThumbnail(member.user.avatarURL)
      .setDescription(`**${member.user.tag}** (${member.id}) adlı bota bir yetkili izin verdi eğer kaldırmak istiyorsanız **${prefix}bot-izni kaldır [bot id]**.`);
    cod.send(are);//CodAre✨
     } else {
       let izinverilmemişbot = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setThumbnail(member.user.avatarURL)
      .setDescription("**" + member.user.tag +"**" + " (" + member.id+ ") " + "adlı bot **Sunucuya eklendi** ve banladım eğer izin vermek istiyorsanız **" + prefix + "bot-izni ver [bot id]**")
       member.ban();// Eğer sunucudan atmak istiyorsanız ban kısmını kick yapın
       cod.send(izinverilmemişbot)
}
  }
});

//ANTİ RAİD SİSTEMİ SON

//SAĞTIK BAN

client.on("guildBanAdd", async function(client, guild, user) {
  
    let koruma = await db.fetch(`koruma_${client.guild.id}`)
    if (koruma == 'kapali') return;
    if (koruma == 'acik') {
      
      let korumalogk = await db.fetch(`korumalogk_${client.guild.id}`);
  
  const entry = await guild
    .fetchAuditLogs({ type: "MEMBER_BAN_ADD" })
    .then(audit => audit.entries.first());
  const yetkili = await guild.members.get(entry.executor.id);
setTimeout(async () =>{
    let logs = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'});
    if(logs.entries.first().executor.bot) return;
    
      let kisi = guild.guild.member(entry.executor);
kisi.roles.filter(a => a.hasPermission('ADMINISTRATOR')).forEach(x => kisi.removeRole(x.id))
kisi.roles.filter(a => a.hasPermission('MANAGE_CHANNELS')).forEach(x => kisi.removeRole(x.id))
kisi.roles.filter(a => a.hasPermission('MANAGE_ROLES')).forEach(x => kisi.removeRole(x.id))
kisi.kick()
  
    const banlog = new Discord.RichEmbed()        
  .setColor('RANDOM')
 .setAuthor('Ban Log')
  .setDescription(`${kisi} adlı kullanıcı tarafından **Sağ-Tık Ban** atıldı!`)
   .setTimestamp()
  
  client.channels.get(korumalogk).send(banlog) //log kanalına atar
     })      
  } 
});   
//SAĞTIK BAN SON

client.on("message", async message => {
  let uyarisayisi = await db.fetch(`reklamuyari_${message.author.id}`);
  let reklamkick = await db.fetch(`kufur_${message.guild.id}`);
  let kullanici = message.member;
  if (!reklamkick) return;
  if (reklamkick == "Açık") {
    const reklam = [
      "discord.app",
      "discord.gg",
      ".com",
      ".net",
      ".xyz",
      ".tk",
      ".pw",
      ".io",
      ".me",
      ".gg",
      "www.",
      "https",
      "http",
      ".gl",
      ".org",
      ".com.tr",
      ".biz",
      ".party",
      ".rf.gd",
      ".az"
    ];
    if (reklam.some(word => message.content.toLowerCase().includes(word))) {
      if (!message.member.hasPermission("BAN_MEMBERS")) {
        message.delete();
        db.add(`reklamuyari_${message.author.id}`, 1); //uyarı puanı ekleme
        if (uyarisayisi === null) {
          let uyari = new Discord.RichEmbed()
             .setColor("BLUE")
             .setAuthor(`${client.user.username}`, client.user.avatarURL)
            .setDescription(
              `<@${message.author.id}> reklam yapmayı kes! bu ilk uyarın! (1/3)`
            )
            .setFooter(`Misty Reklam Engel Sistemi`)
            .setTimestamp();
          message.channel.send(uyari).then(m => m.delete(5000));
        }
        if (uyarisayisi === 1) {
          let uyari = new Discord.RichEmbed()
            .setColor("BLUE")
             .setAuthor(`${client.user.username}`, client.user.avatarURL)
            .setDescription(
              `<@${message.author.id}> reklam yapmayı kes! bu ikinci uyarın! (2/3)`
            )
            .setFooter(`Misty Reklam Engel Sistemi`)
            .setTimestamp();
          message.channel.send(uyari).then(m => m.delete(5000));
        }
        if (uyarisayisi === 2) {
          message.delete();
          await kullanici.kick({
            reason: `Reklam-Engel sistemi!`
          });
          let uyari = new Discord.RichEmbed()
            .setColor("BLUE")
             .setAuthor(`${client.user.username}`, client.user.avatarURL)
            .setDescription(
              `<@${message.author.id}> üç kere reklam yaptığı için sunucudan atıldı!`
            )
            .setFooter(`Misty Reklam Engel Sistemi`)
            .setTimestamp();
          message.channel.send(uyari).then(m => m.delete(5000));
        }
        if (uyarisayisi === 3) {
          message.delete();
          await kullanici.ban({
            reason: `Reklam! - Misty Reklam-Engel Sistemi`
          });
          db.delete(`reklamuyari_${message.author.id}`);
          let uyari = new Discord.RichEmbed()
            .setColor("BLUE")
             .setAuthor(`${client.user.username}`, client.user.avatarURL)
            .setDescription(
              `<@${message.author.id}> atıldıktan sonra tekrar reklam yaptığı için sunucudan yasaklandı!`
            )
            .setFooter(`Misty Reklam Engel Sistemi`)
            .setTimestamp();
          message.channel.send(uyari).then(m => m.delete(5000));
        }
      }
    }
  }
});

client.on("message", async message => {
  var id = message.author.id;
  var gid = message.guild.id;

  let noxprol = await db.fetch(`noxprol_${gid}`);
  let noxpkanal = await db.fetch(`noxpkanal_${gid}`);
  let levelkanal = await db.fetch(`levelkanal_${gid}`);

 

  let hm = await db.fetch(`seviyeacik_${gid}`);
  let kanal = await db.fetch(`levelkanal_${gid}`); //KANAL
  let xps = "2";

  if (!hm) return;
  if (message.content.startsWith(prefix)) return;
  if (message.author.bot) return;

  var xp = await db.fetch(`xp_${id}_${gid}`);
  var lvl = await db.fetch(`lvl_${id}_${gid}`);
  var xpToLvl = await db.fetch(`xpToLvl_${id}_${gid}`);

  if (!lvl) {
    if (xps) {

      if (!message.member.roles.has(noxprol)) //ROL (NO XP)
      if (message.channel.id != noxpkanal) //KANAL (NO XP)
      
      db.set(`xp_${id}_${gid}`, xps);
    }
    
      if (!message.member.roles.has(noxprol)) //ROL (NO XP)
      if (message.channel.id != noxpkanal) //KANAL (NO XP)
    
    db.set(`xp_${id}_${gid}`, 4);
    db.set(`lvl_${id}_${gid}`, 1);
    db.set(`xpToLvl_${id}_${gid}`, 100);
  } else {
    if (xps) {
      
        if (!message.member.roles.has(noxprol)) //ROL (NO XP)
      if (message.channel.id != noxpkanal) //KANAL (NO XP)
      
      db.add(`xp_${id}_${gid}`, xps);
    }
     if (!message.member.roles.has(noxprol)) //ROL (NO XP)
      if (message.channel.id != noxpkanal) //KANAL (NO XP)
    db.add(`xp_${id}_${gid}`, 4);
    

    if (xp > xpToLvl) {
      db.add(`lvl_${id}_${gid}`, 1);
      db.add(
        `xpToLvl_${id}_${gid}`,
        (await db.fetch(`lvl_${id}_${gid}`)) * 100
      );
      if (kanal) {
                
      
 let meso;
let veri = await db.fetch(`levelmesaj_${message.guild.id}`)
if(veri) meso = veri.replace("${user}", `<@${message.member.user.id}>`).replace("${level}", lvl);
if(!veri) meso =  `<@${message.member.user.id}> Yeni seviye atladı! Seviye: **__${lvl}__**`;

    const tem = new Discord.RichEmbed()
   .setColor("RANDOM")
   .setDescription(meso)  
  client.channels.get(kanal).send(tem) 
        
    
      }
      
    }
  }
});


//EKONOMİ
client.on("message", async message => {
  
let gönderilece = 2
db.add(`Bakiye_${message.author.id}`,gönderilece)  
})
//--- EKONOMİ -- //


//KÜFÜR
client.on("message", msg => {
  let küfürEngel = db.fetch(`kufurac_${msg.guild.id}`)
  if (!msg.guild) return
  if (küfürEngel === 'kapali') return
    if (küfürEngel === 'acik') {
      const küfür = ["mk", "amk", "aq", "orospu", "oruspu", "oç", "sikerim", "yarrak", "piç", "amq", "sik", "amcık", "çocu", "sex", "seks", "amına", "orospu çocuğu", "sg", "siktir git", 'amın', 'göt', 'delik', 'ananı'];
  if (küfür.some(word => msg.content.toLowerCase().includes(word)) ) {
    if (!msg.member.hasPermission("ADMINISTRATOR")) {
      msg.delete()
       msg.channel.send(new Discord.RichEmbed()
         .setAuthor(`${client.user.username}`, client.user.avatarURL)
        .setColor('RED')
        .setFooter(`Misty Küfür Sistemi!`)
       
        .setDescription(`**Küfür etmek yasak!**`)).then(message => message.delete(3000));
    }
}
    }
})





client.on('guildDelete', guild => {
  
  let kanl = '747494784066650302'

let rrrsembed = new Discord.RichEmbed()

.setColor("RED")
.setTitle("Bot Kicklendi")
.addField("Sunucu Adı:", guild.name)
.addField("Sunucu sahibi", guild.owner)
.addField("Sunucu Sahibi'nin İd'si", guild.ownerID)
.addField("Sunucunun Kurulu Olduğu Bölge:", guild.region)
.addField("Sunucudaki Kişi Sayısı:", guild.memberCount)

   client.channels.get(kanl).send(rrrsembed);
  
});

client.on('guildCreate', guild => {

    let kanl = '747494784066650302'
  
let rrrsembed = new Discord.RichEmbed()

.setColor("PURPLE")
.setTitle("Bot Eklendi")
.addField("Sunucu Adı:", guild.name)
.addField("Sunucu sahibi", guild.owner)
.addField("Sunucu Sahibi'nin İd'si", guild.ownerID)
.addField("Sunucunun Kurulu Olduğu Bölge:", guild.region)
.addField("Sunucudaki Kişi Sayısı:", guild.memberCount)

   client.channels.get(kanl).send(rrrsembed);
  
});

client.on("roleUpdate", async(oldRole, newRole) => {

  let yetkivermekorumasi = await db.fetch(`yvkak_${oldRole.guild.id}`)
  
  if(!yetkivermekorumasi) return
  if (oldRole.hasPermission("ADMINISTRATOR")) return
   if (!oldRole.hasPermission("ADMINISTRATOR")) 

    if (newRole.hasPermission("ADMINISTRATOR")) {
  
   newRole.setPermissions(oldRole.permissions)   
      
    } else {
      return
    }  

});



//MİSTY-MANAGER/////// DAVET SİSTEMİ

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
  let kanal = await db.fetch(`davetkanal_${member.guild.id}`)
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
   
   let clark;
let kent = await db.fetch(`leavemesajd_${member.guild.id}`)
if(kent) clark = kent.replace("{davetli}", `${member.user.id}`).replace("{davetçi}", `${sa.id}`)
if(!kent) clark =  `${member.user} sunucuyu terketti! Davet eden: ${sa.id}`

    client.channels.get(kanal).send(clark);
    return;
  } else {
   
    let clark;
let kent = await db.fetch(`leavemesajd_${member.guild.id}`)
if(kent) clark = kent.replace("{davetli}", `<@${member.user.id}>`).replace("{davetçi}", `${sa.id}`)
if(!kent) clark =  `${member.user} sunucuyu terketti! Davet eden: ${sa.id}`

    client.channels.get(kanal).send(clark);

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
    let kanal = await db.fetch(`davetkanal_${member.guild.id}`)
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
    } // <@${member.user.id}> adlı kişi aramıza katıldı!  **Davet eden:**  **__Toplam daveti:__** ${sayı2}

 let karlos;
let leo = await db.fetch(`davetmesaj_${member.guild.id}`)
if(leo) karlos = leo.replace("{davetli}", `${member.user.id}`).replace("{davetçi}", `${davetçi.id}`).replace("{toplamdavet}", `${sayı2}`)
if(!leo) karlos =  `**${member.user.username}** adlı şahıs aramıza katıldı! Davet eden: **${davetçi.username}** Kalan davet sayısı: **${sayı2}**`;

    client.channels.get(kanal).send(karlos);
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
//MİSTY-MANAGER/////// DAVET SİSTEMİ


   client.on("message", async msg => {
  if (msg.channel.type === "dm") return;
  if (msg.author.bot) return;
  if (msg.content.length > 4) {
    if (db.fetch(`capslock_${msg.guild.id}`)) {
      let caps = msg.content.toUpperCase();
      if (msg.content == caps) {
        if (!msg.member.hasPermission("ADMINISTRATOR")) {
          if (!msg.mentions.users.first()) {
            msg.delete();
            return msg.channel
              .send(`**Capslock engelleme sistemi** açıkken, capslock açamazsın!`)
              .then(m => m.delete(5000));
          }
        }
      }
    }
  }
});

//-----------------------Modlog-----------------------\\
client.on('channelCreate', async channel => {

  const c = channel.guild.channels.get(db.fetch(`modlogderler_${channel.guild.id}`));
  if (!c) return;
    var embed = new Discord.RichEmbed()
                    .setAuthor(`${channel.user.username}`, channel.user.avatarURL)
                    .addField(`Kanal oluşturuldu`, ` İsmi: \`${channel.name}\`\n Türü: **${channel.type}**\n ID: ${channel.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${channel.client.user.username}#${channel.client.user.discriminator}`, channel.client.user.avatarURL)
    c.send(embed)
});

client.on('channelDelete', async channel => {
  const c = channel.guild.channels.get(db.fetch(`modlogderler_${channel.guild.id}`));
  if (!c) return;
    let embed = new Discord.RichEmbed()
                    .setAuthor(`${channel.user.username}`, channel.user.avatarURL)
                    .addField(`Kanal silindi`, ` İsmi: \`${channel.name}\`\n Türü: **${channel.type}**\n ID: ${channel.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${channel.client.user.username}#${channel.client.user.discriminator}`,                  channel.client.user.avatarURL)

    c.send(embed)
});

   client.on('channelNameUpdate', async channel => {
  const c = channel.guild.channels.get(db.fetch(`modlogderler_${channel.guild.id}`));
  if (!c) return;
    var embed = new Discord.RichEmbed()
                    .setAuthor(`${channel.user.username}`, channel.user.avatarURL)
                    .addField(`Kanal İsmi değiştirildi`, ` Yeni İsmi: \`${channel.name}\`\n ID: ${channel.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${channel.client.user.username}#${channel.client.user.discriminator}`, channel.client.user.avatarURL)
    c.send(embed)
});




client.on('emojiCreate', emoji => {
  const c = emoji.guild.channels.get(db.fetch(`modlogderler_${emoji.guild.id}`));
  if (!c) return;

    let embed = new Discord.RichEmbed()
                    .addField(`Emoji oluşturuldu`, ` İsmi: \`${emoji.name}\`\n GIF?: **${emoji.animated}**\n ID: ${emoji.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${emoji.client.user.username}#${emoji.client.user.discriminator}`, emoji.client.user.avatarURL)

    c.send(embed)
    });
client.on('emojiDelete', emoji => {
  const c = emoji.guild.channels.get(db.fetch(`modlogderler_${emoji.guild.id}`));
  if (!c) return;

    let embed = new Discord.RichEmbed()
                    .addField(`Emoji silindi`, ` İsmi: \`${emoji.name}\`\n GIF? : **${emoji.animated}**\n ID: ${emoji.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${emoji.client.user.username}#${emoji.client.user.discriminator}`, emoji.client.user.avatarURL)

    c.send(embed)
    });
client.on('emojiUpdate', (oldEmoji, newEmoji) => {
  const c = newEmoji.guild.channels.get(db.fetch(`modlogderler_${newEmoji.guild.id}`));
  if (!c) return;

    let embed = new Discord.RichEmbed()
                    .addField(`Emoji güncellendi`, ` Eski ismi: \`${oldEmoji.name}\`\n Yeni ismi: \`${newEmoji.name}\`\n ID: ${oldEmoji.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${newEmoji.client.user.username}#${newEmoji.client.user.discriminator}`, newEmoji.client.user.avatarURL)

    c.send(embed)
    });

client.on('guildBanAdd', async (guild, user) => {    
    const channel = guild.channels.get(db.fetch(`modlogderler_${guild.id}`));
  if (!channel) return;
  
  const entry = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first())

    let embed = new Discord.RichEmbed()
                    .setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL)
                    .addField(`Kullanıcı banlandı`, ` İsmi: \`${user.username}\`\n ID: **${user.id}**\n Sebep: **${entry.reason || 'Belirtmedi'}**\n Banlayan: **${entry.executor.username}#${entry.executor.discriminator}**`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${entry.executor.username}#${entry.executor.discriminator} tarafından`, entry.executor.avatarURL)

    channel.send(embed)
});


client.on('guildBanRemove', async (guild, user) => {    
    const channel = guild.channels.get(db.fetch(`modlogderler_${guild.id}`));
  if (!channel) return;
  
  const entry = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first())

    let embed = new Discord.RichEmbed()
                    .setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL)
                    .addField(`Kullanıcının banı açıldı`, ` İsmi: \`${user.username}\`\n ID: **${user.id}**\n Banı Kaldıran: **${entry.executor.username}#${entry.executor.discriminator}**`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${entry.executor.username}#${entry.executor.discriminator} tarafından`, entry.executor.avatarURL)

    channel.send(embed)
});
client.on('messageDelete', async message => {    
  if(message.author.bot) return

    const channel = message.guild.channels.get(db.fetch(`modlogderler_${message.guild.id}`));
  if (!channel) return;
  
    let embed = new Discord.RichEmbed()
                    .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL)
                    .setTitle("Mesaj silindi")                
                    .addField(`Silinen mesaj : ${message.content}`,`Kanal: ${message.channel.name}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${message.client.user.username}#${message.client.user.discriminator}`, message.client.user.avatarURL)

    channel.send(embed)
});

client.on('messageUpdate', async(oldMessage, newMessage) => {
    if(oldMessage.author.bot) return;
    if(oldMessage.content == newMessage.content) return;

    const channel = oldMessage.guild.channels.get(db.fetch(`modlogderler_${oldMessage.guild.id}`));
    if(!channel) return;

    let embed = new Discord.RichEmbed()
    .setTitle("Mesaj güncellendi!")
    .addField("Eski mesaj : ",`${oldMessage.content}`)
    .addField("Yeni mesaj : ",`${newMessage.content}`)
    .addField("Kanal : ",`${oldMessage.channel.name}`)
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(`${oldMessage.client.user.username}#${oldMessage.client.user.discriminator}`,`${oldMessage.client.user.avatarURL}`)

    channel.send(embed)
});

client.on('roleCreate', async (role) => {    

    const channel = role.guild.channels.get(db.fetch(`modlogderler_${role.guild.id}`));
  if (!channel) return;
  
    let embed = new Discord.RichEmbed()
.addField(`Rol oluşturuldu`, ` ismi: \`${role.name}\`\n ID: ${role.id}`)                    
.setTimestamp()
.setColor("RANDOM")
.addField("Rol renk kodu : ",`${role.hexColor}`)
.setFooter(`${role.client.user.username}#${role.client.user.discriminator}`, role.client.user.avatarURL)

    channel.send(embed)
});

client.on('roleDelete', async (role) => {    

    const channel = role.guild.channels.get(db.fetch(`modlogderler_${role.guild.id}`));
  if (!channel) return;
  
    let embed = new Discord.RichEmbed()
.addField(`Rol silindi`, ` ismi: \`${role.name}\`\n ID: ${role.id}`)                    
.setTimestamp()
.setColor("RANDOM")
    .addField("Rol renk kodu : ",`${role.hexColor}`)
.setFooter(`${role.client.user.username}#${role.client.user.discriminator}`, role.client.user.avatarURL)

    channel.send(embed)
})
client.on('voiceStateUpdate', (oldMember, newMember) => {
    
  if (db.has(`modlogderler_${oldMember.guild.id}`) === false) return;
  
  var kanal = oldMember.guild.channels.get(db.fetch(`modlogderler_${oldMember.guild.id}`).replace("<#", "").replace(">", ""))
  if (!kanal) return;
  
  let newUserChannel = newMember.voiceChannel
  let oldUserChannel = oldMember.voiceChannel

  if(oldUserChannel === undefined && newUserChannel !== undefined) {

    const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(`${newMember.user.tag} adlı kullanıcı \`${newUserChannel.name}\` isimli sesli kanala giriş yaptı!`)
    kanal.send(embed);
    
  } else if(newUserChannel === undefined){

    const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(`${newMember.user.tag} adlı kullanıcı sesli kanaldan çıkış yaptı!`)
    kanal.send(embed);
    
  }
});

//-----------------------Modlog Son-----------------------\\


//TWİTCH YAYINI
client.on('ready', () => {
    client.user.setPresence({
        game: {
            name: `m!help | ${client.guilds.size} sunucu ${client.users.size} kullanıcı`,
            type: ayar.type,
            url: ayar.url
        },
              status: ayar.status
    })
})
