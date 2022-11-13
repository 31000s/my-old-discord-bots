const Discord = require("discord.js");
const { delay, randomRange, verify } = require("../util/Util");
const words = [
"misty",
"savaş",
"muvaffakiyetsizleştiricileştiriveremeyebileceklerimizdenmişsinizcesine",
"Atatürk",
"discord",

"yürek",
"moskova",
"meydan",
"menemen",
"miguel",
"aşure",
"yarışma",
"cüce",
"ragnarok",
"takviye"
];

exports.run = async (client, msg, args) => {
  this.fighting = new Set();

  let üye = msg.mentions.users.first();

   const oymk = new Discord.RichEmbed()
   .setColor(`BLACK`)
   .setDescription(`Oynamak istediğin kişiyi etiketle!`)
   .setFooter(`${client.user.username}`, client.user.avatarURL)
  if (!üye) return msg.channel.send(oymk);


  

   const xqe = new Discord.RichEmbed()
   .setColor(`BLACK`)
   .setDescription(`Kendin ile oyun oynayamazsın!`)
   .setFooter(`${client.user.username}`, client.user.avatarURL)
  if (üye.id === msg.author.id) return msg.channel.send(xqe);

   const wwe = new Discord.RichEmbed()
   .setColor(`BLACK`)
   .setDescription(`Bir kanal da yalnızca bir oyun oynanabilir! Diğer oyunun bitmesini bekle.`)
   .setFooter(`${client.user.username}`, client.user.avatarURL)
  if (this.fighting.has(msg.channel.id)) return msg.channel.send(wwe)
  this.fighting.add(msg.channel.id);
  
const agabey = new Discord.RichEmbed()
   .setColor(`BLACK`)
   .setDescription(`**${üye}, ${msg.author} Sana ilk yazan kazanır turnuvası teklif etti!\nKabul diyor isen \`evet\` Yaz!\n reddediyorsan \`hayır\` Yaz!**`)
   .setFooter(`${client.user.username}`, client.user.avatarURL)

    await msg.channel.send(agabey)
    const durum = await verify(msg.channel, üye);
    if (!durum) {

const ihh = new Discord.RichEmbed()
   .setColor(`BLACK`)
   .setDescription(`Meydan okumadan **rededildi**!`)
   .setFooter(`${client.user.username}`, client.user.avatarURL)

      this.fighting.delete(msg.channel.id);
      return msg.channel.send(ihh);
    }

    const yrs = new Discord.RichEmbed()
   .setColor(`BLACK`)
   .setDescription(`**__Yarışma başlıyor__...** 10 saniyeniz var!`)
   .setFooter(`Lütfen yazınızı, küçük harfler ile yazınız.`, client.user.avatarURL)
   
    await msg.channel.send(yrs).then(m => m.delete(2000))
    
    const word = words[Math.floor(Math.random() * words.length)];
   
   const yazi = new Discord.RichEmbed()
   .setColor(`RANDOM`)
   .setDescription(`İlk **${word.toUpperCase()}** yazan kazanır!`)

    await msg.channel.send(yazi);

      const collector = msg.channel.createMessageCollector(
 m => m.content === word,
{
      time: 10000,
      maxMatches: 1
    }
  );

  collector.on('end', async (collection, reason) => {
    let color, result;
    if (reason === 'time') {
      color = "RED",
      result = '**😞 Süre doldu kimse kazanamadı!**';
    }
    else {
      color = "GREEN",
      result = `**Tebrikler ${collection.map(m => m.author)[0]} Çok hızlı çıktın!** 🎉`;
    }
    
    this.fighting.delete(msg.channel.id);
const embed = new Discord.RichEmbed()
.setColor(color)
.setTitle('KAZANDIN! 🎉')
.setDescription(result)
    await msg.channel.send(embed).catch(e => {
      client.log.error(e);
    });
  this.fighting.delete(msg.channel.id);
  });

  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yazı-yarışması', 'yaya'],
  permLevel: 0
};

exports.help = {
  name: "yazan-kazanır",
  description: "yazı-yarışması ",
  usage: "yazı-yarışması <kişi>"
};