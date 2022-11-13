const Discord = require("discord.js"),
  db = require("quick.db");

module.exports.run = async (client, message, args) => {
  let kontrol = await db.fetch(`dil_${message.guild.id}`);
  if (kontrol == "TR") {
    let dil = args[0];
    if (!dil) {
      
        const good = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setDescription(`__Lütfen bir dil belirtiniz!__ Diller: \`TR_tr\`, \`EN_us\` `)
      .setAuthor(`${client.user.username}`, client.user.avatarURL)
      
      message.channel.send(good);
      return;
    }
    if (dil === "EN") {
      db.set(`dil_${message.guild.id}`, dil);
      
        const good = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setDescription(`__New language set to__ \`${dil}\`!`)
      .setAuthor(`${client.user.username}`, client.user.avatarURL)
      
      message.channel.send(good);
    } else if (dil === "TR") {
      db.set(`dil_${message.guild.id}`, dil);
      
        const aq = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setDescription(`__Yeni dil__ \`${dil}\` __olarak ayarlandı!__`)
      .setAuthor(`${client.user.username}`, client.user.avatarURL)
      
      message.channel.send(aq);
    } else {
      message.channel.send("__Hatalı dil! Diller: __`TR`, `EN`");
      return;
    }
  } else {
    let dil = args[0];
    if (!dil) {
      
        const us = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setDescription(`__Please specify a language! Languages:__ \`TR\`, \`EN\``)
      .setAuthor(`${client.user.username}`, client.user.avatarURL)
      
      message.channel.send(us);
      return;
    }
    if (dil === "EN") {
      db.set(`dil_${message.guild.id}`, dil);
      
        const tam = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setDescription(`__New language set to__ \`${dil}\`!`)
      .setAuthor(`${client.user.username}`, client.user.avatarURL)
      
      message.channel.send(tam);
    } else if (dil === "TR") {
      db.set(`dil_${message.guild.id}`, dil);
      
       const wq = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setDescription(`__Yeni dil__ \`${dil}\` __olarak ayarlandı!__`)
      .setAuthor(`${client.user.username}`, client.user.avatarURL)
      
      message.channel.send(wq);
    } else {
      
      const xd = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setDescription(`__Incorrect language! Languages:__ \`TR\`, \`EN\``)
      .setAuthor(`${client.user.username}`, client.user.avatarURL)
      
      message.channel.send(xd);
      return;
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["language", "lang", 'dil'],
  permLevel: 3
};

exports.help = {
  name: "dil",
  description: "dil",
  usage: "dil"
};
