const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return;
  let rol = message.mentions.roles.first() || message.guild.roles.find(rol => rol.name === args.join(' ')) || message.guild.roles.get(args[0]);
  if (!rol) return message.reply('Böyle bir rol bulunamadı!');
  
  function space(number){
let mylifeisadamngame = "";
String(number).split("").forEach(ahuh => {
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
  ]
  
  const migueLeon = new Discord.RichEmbed()        
  .setColor('RANDOM')
 .setAuthor('Rol Üyeleri')
  .setDescription(`Rol: ${rol} 
Kullanıcı Sayısı: **__${rol.members.size}__**

${rol.members.map(uye =>  `<@${uye.id}> ` ).join('\n')}`)
  
  .setFooter(`Yetkili: ${message.author.username}`, `${message.author.displayAvatarURL}`) 
.setTimestamp()
  message.channel.send(migueLeon);
  
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['rol-üyeleri', 'role-members'],
  permLevel: 0
};
exports.help = { 
  name: 'rol-uyeleri', 
  description: 'rol-uyeleri',
  usage: 'rol-uyeleri',
  kategori: 'yetkili'
};