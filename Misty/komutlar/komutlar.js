const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    try {
      
      const dx = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setDescription(`Toplam komut sayısı: **__${client.commands.size}__**

**|** ${client.commands.map(props => `\`${props.help.name}\``).join("\n **|** ")}`)
      
        await message.channel.send(dx);
    } catch (e) {
        throw e;
    }
}

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["commands"],
  permLevel: 0
};

module.exports.help = {
  name: 'komutlar',
  description: 'Botta bulunan tüm komutları gösterir',
  usage: 'komutlar'
};
