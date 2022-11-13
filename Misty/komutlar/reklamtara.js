const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')

exports.run = (client, message, args) => {
  
  var prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`Bu komutu kullanabilmek için **Mesajları Yönet** iznine sahip olmalısın!`);

	const members = message.guild.members.filter(member => member.user.presence.game && /(https|gg|discord|http|.com|.net|.org|invite|.gg|discord.gg| İnstagram|Facebook|watch|Youtube|youtube|facebook|instagram)/g.test(member.user.presence.game.name));
	const memberss = message.guild.members.filter(member => member.user.username && /(https | http | gg | discord|http|.com|.net|.org|invite|İnstagram|discord.gg|Facebook|watch|Youtube|youtube|facebook|instagram)/g.test(member.user.username));
	
	const embed = new Discord.RichEmbed()
  .setColor("ORANGE")
	     .setAuthor(`${client.user.username}`, client.user.avatarURL)
		.addField("Oynuyor kısmın da mesaj içeren kullanıcılar:", members.map(member => `${member} **|** ${member.user.presence.game.name}`).join("\n") || "Kimsenin Oynuyor Mesajı Reklam İçermiyor")
		.addField("Kullanıcı adın da reklam içeren kullanıcılar:", memberss.map(member => `${member} **|** ${member.user.username}`).join("\n") || "Kimsenin kullanıcı adı reklam içermiyor.")
  .setTimestamp()
   .setFooter(`Yetkili: ${message.author.username}`, `${message.author.displayAvatarURL}`) 
	message.channel.send({embed})

}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['reklam-ara', 'reklamara', 'reklam-taraması', 'reklam-tara', 'scan-advertisement'],
	permLevel: 2,
    kategori: "moderasyon",
}

exports.help = {
	name: 'reklam-taraması',
	description: 'Kullanıcıların oynuyor mesajlarındaki ve kullanıcı adlarındaki reklamları tarar.',
	usage: 'reklam-taraması',
 
}
