const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json")
const filter = m => m.content.includes('discord');

let emoji = '✅'

module.exports.run = async (client, message, args) => {
const msg = message;
const reactionFilter = (reaction, user) => {
    return [emoji].includes(reaction.emoji.name) && user.id === msg.mentions.users.first().id;
}


if (!msg.mentions.users.first()) return;

msg.mentions.users.first().send(`Merhaba ${msg.mentions.users.first().username}, ${msg.author} bulunduğun sesli kanala gelmek istiyor, kabul ediyor musun?\n*Unutma, 10 saniye içerisinde onaylamazsan istek iptal edilecek.*`).then(async (asd) => {
    await asd.react(emoji);
    asd.awaitReactions(reactionFilter, {
        max: 1,
        time: 10000,
        errors: ['time']
    }).then(async(c) => {
        if (!msg.guild.member(msg.mentions.users.first()).voiceChannel){

            const istek = new Discord.RichEmbed()
            .setColor('RANDOM')
             .setAuthor(`${client.user.username}`, client.user.avatarURL)
            .setDescription(`Kişi isteğini onayladı fakat herhangi bir odada yok, bir odaya girip tekrar istek gönder.`) 
            .setTimestamp()

            msg.author.send(istek);
            msg.mentions.users.first().send(`Herhangi bir odada olmadığın için onay başarısız.`);
            return;
        }
 await msg.member.setVoiceChannel(msg.guild.member(msg.mentions.users.first()).voiceChannelID);
        asd.delete();
    }).catch(async(e) =>{
    })
})
  
  //House
   const juke = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setAuthor(`${client.user.username}`, client.user.avatarURL)
    .setDescription(` <@${msg.mentions.users.first().id}> Merhaba! ${msg.author} adlı kişi odana gelmek istiyor.`)
    .setFooter("Onaylıyorsan Emojiye Bas 10 Saniye içinde iptal edilecek.") 
    .setTimestamp()
  
msg.channel.send(juke).then(async (asd) => {
    await asd.react(emoji);
    asd.awaitReactions(reactionFilter, {
        max: 1,
        time: 10000,
        errors: ['time']
    }).then(async(c) => {
        if (!msg.guild.member(msg.mentions.users.first()).voiceChannel){

            const odadayok = new Discord.RichEmbed()
            .setColor('RANDOM')
             .setAuthor(`${client.user.username}`, client.user.avatarURL)
            .setDescription(`Kişi isteğini onayladı fakat herhangi bir odada yok, bir odaya girip tekrar istek gönder.`) 
            .setTimestamp()

            msg.channel.send(odadayok);
           msg.mentions.users.first().send(`Herhangi bir odada olmadığın için onay başarısız.`);
            return;
        }
        await msg.member.setVoiceChannel(msg.guild.member(msg.mentions.users.first()).voiceChannelID);
        asd.delete();
    }).catch(async(e) =>{
    })
})

}
 module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["git", "go"],
  category: "kullanıcı komutu",
  permLevel: 0
};

module.exports.help = {
  name: 'git',
  description: 'git',
  usage: 'prefix+git @kullanıcı '
}