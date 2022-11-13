const Discord = require("discord.js");
const moment = require("moment");
const db = require("quick.db");
const humanizeDuration = require("humanize-duration")
const ayarlar = require('../ayarlar.json')

exports.run = function (client, message, args) {
  
  let kullanıcı = message.mentions.users.first() || message.author;

     let boost = ''
  
  message.channel.send(`${boost}`)

};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['boost'],
    permLevel: 0
};

exports.help = {
    name: 'boost',
    description: 'boost',
    usage: 'boost'
};