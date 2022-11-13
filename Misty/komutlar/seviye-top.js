const Discord = require('discord.js');
const request = require('node-superfetch');
const db = require('quick.db');


exports.run = async (client, msg, args) => {
  
      let u = msg.mentions.users.first() || msg.author;

        if(u.bot === true) {
                const embed = new Discord.RichEmbed()
                        .setDescription("Botların seviyesi bulunmamaktadır!")
                        .setColor("RANDOM")
                msg.channel.send(embed)
                return
        }
        var str = ''
        const sorted = msg.guild.members.filter(u => !u.user.bot).array().sort((a, b) => { return db.fetch(`lvl_${b.user.id}_${msg.guild.id}`) - db.fetch(`lvl_${a.user.id}_${msg.guild.id}`) });
        const top10 = sorted.splice(0, msg.guild.members.size)
        const mappedName = top10.filter(o => !o.bot).map(s => s.user.id);
        const mappedLevel = top10.filter(o => !o.bot).map(s => db.fetch(`lvl_${s.user.id}_${msg.guild.id}`) || 0)
 
        const mappedID = top10.map(s => s.user.id);
        for(var i = 0; i < 5; i++) {
            var lvl = mappedLevel[i]
      
            if(msg.author.id === mappedID[i]) {
                str += `**__${i + 1}.__** <@${mappedName[i]}> - **Level:** __${lvl}__ \n\n`
            }

            if(msg.author.id !== mappedID[i]) {
                str += `**__${i + 1}.__** <@${mappedName[i]}> - **Level:** __${lvl}__ \n\n`
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
        .setAuthor(`Seviye Sıralaması`, msg.guild.avatarURL)
        .setColor('BLUE')
        .setDescription(`${str}`)
        .setFooter(`${client.user.username}`, client.user.avatarURL)
        msg.channel.send(wEmbed)
  
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["level-top", "seviye-sıralama"],
  permLevel: 0,
    kategori: "lvl"
};

exports.help = {
  name: 'sıralama',
  description: 'Seviye sisteminin sunucudaki liderlik tablosunu gĂ¶sterir.',
  usage: 'sıralama'
};