const Discord = require('discord.js');
const request = require('node-superfetch');
const db = require('quick.db');

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

exports.run = async (client, msg, args) => {
  
  const yasak = client.emojis.get('744501616698327061');
  if (msg.channel.id !== '744532687250915389') return msg.channel.send(`${yasak} **Bu komutun kullanımı yasaktır, sadece <#744532687250915389> kanalında kullanabilirsin.**`).then(m => m.delete(5000));
  
      let u = msg.mentions.users.first() || msg.author;

        if(u.bot === true) {
                const embed = new Discord.RichEmbed()
                        .setDescription("Botların seviyesi bulunmamaktadır!")
                        .setColor("RANDOM")
                msg.channel.send(embed)
                return
        }
        var str = '' //davet_${u.id}_${member.guild.id}
        const sorted = msg.guild.members.filter(u => !u.user.bot).array().sort((a, b) => { return db.fetch(`davet_${b.user.id}_${msg.guild.id}`) - db.fetch(`davet_${a.user.id}_${msg.guild.id}`) });
        const top10 = sorted.splice(0, msg.guild.members.size)
        const mappedName = top10.filter(o => !o.bot).map(s => s.user.id);
        const mappedLevel = top10.filter(o => !o.bot).map(s => db.fetch(`davet_${s.user.id}_${msg.guild.id}`) || 0)
        const emoji = client.emojis.get('745327148423839754');

        const mappedID = top10.map(s => s.user.id);
        for(var i = 0; i < 5; i++) {
            var lvl = mappedLevel[i]
      
            if(msg.author.id === mappedID[i]) {
                str += `**__${i + 1}.__** <@${mappedName[i]}> - **Level:** ${space(lvl)} \n\n`
            }

            if(msg.author.id !== mappedID[i]) {
                str += `**__${i + 1}.__** <@${mappedName[i]}> - **Level:** ${space(lvl)} \n\n`
            }
        }

        if(u.bot === true) {
                const embed = new Discord.RichEmbed()
                        .setDescription("Botların seviyesi bulunmamaktadır!")
                        .setColor("RANDOM")
                msg.channel.send(embed)
                return
        }
  
        let wEmbed = new Discord.RichEmbed()
        .setAuthor(`Davet Top`, client.user.avatarURL)
        .setColor('BLUE')
        .setDescription(`${str}`)
        .setFooter(`Gif Town`, client.user.avatarURL)
        msg.channel.send(wEmbed)
  
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["davettop", "davet-top", "davet-sıralaması", "invite-top"],
  permLevel: 0,
    kategori: "daet"
};

exports.help = {
  name: 'davets',
  description: 'Seviye sisteminin sunucudaki liderlik tablosunu öösserir.',
  usage: 'davets'
};