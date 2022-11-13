const Discord = require('discord.js');
const db = require('quick.db')
const { stripIndents } = require('common-tags');
  
const slots = ['🐢', '🦂', '🐛', '🐓 ', '🦄', '🐉', '🐪', '🦒', '💷', '🦇', '🐙','🦀','🐖','🐞','🐌','🐿️','🐘','🐬'];
  
let beklemeSuresi = new Set();


exports.run = async function(client, message,args)  {
 if (beklemeSuresi.has(message.author.id)) return message.reply('Bu komutu kullanabilmek için **10 saniye** beklemelisin!');
    beklemeSuresi.add(message.author.id);
    setTimeout(() => { beklemeSuresi.delete(message.author.id); }, 10000); // 10000 10 sniye bekler.
const miktar = args[0]
let para = await db.fetch(`Bakiye_${message.author.id}`)

const xd = new Discord.RichEmbed()
.setColor('PURPLE')
.setDescription(`Oynamak için paran yok`)
if(!para) return message.channel.send(xd)
  
  const migo = new Discord.RichEmbed()
.setColor('PURPLE')
.setDescription(`Oynacak kadar paran yok`)
if(miktar > para) return message.channel.send(migo)
  
  const mace = new Discord.RichEmbed()
.setColor('PURPLE')
.setDescription(`Oynamak için para girmen gerekli`)
if(!miktar) return message.channel.send(mace)
  
	var slot1 = slots[Math.floor(Math.random() * slots.length)];
	var slot2 = slots[Math.floor(Math.random() * slots.length)];
	var slot3 = slots[Math.floor(Math.random() * slots.length)];

//  let sonuc = [slot1, slot2, slot3];
  //if (sonuc.some(s => sonuc.filter(x => x === s && x === "ğŸŒ").length >= 2)) return message.reply('Kaybettin!');




	if (slot1 === slot2 && slot1 === slot3 ||(slot1 === slot2 ||slot2===slot1||slot2===slot3||slot3===slot2||slot3===slot1||slot1===slot3) ) {

		message.channel.send(
stripIndents`
      🎰 __**SLOTS**__

      ${slot3} : ${slot2} : ${slot3}

      \`|                 |\`

	
		`).then((msg)=> {
  setTimeout( function(){ msg.edit(stripIndents`
      🎰 __**SLOTS**__

      ${slot1} : ${slot2} : ${slot3}`);
  }, 420)})

let sonuccc = [];
sonuccc.push(slot1)
sonuccc.push(slot2)
sonuccc.push(slot3)
if(sonuccc[0] == "🐉" && sonuccc[1] == "🐉" ||(sonuccc[2] == "🐉" && sonuccc[1] == "🐉" )||(sonuccc[0] == "🐉" && sonuccc[2] == "🐉" )){
db.add(`Bakiye_${message.author.id}`,`${miktar}`*100)
message.channel.send(`💷 \` ${miktar} oynadın ve ${miktar*100} kazandın! \` ${message.author}`)
} 

let sonucc = [];
sonucc.push(slot1)
sonucc.push(slot2)
sonucc.push(slot3)
if(sonucc[0] == "💷" && sonucc[1] == "💷" ||(sonucc[2] == "💷" && sonuc[1] == "💷")||(sonucc[0] == "💷" && sonuc[2] == "💷")){
db.add(`Bakiye_${message.author.id}`,`${miktar}`*40)
message.channel.send(`💷 \` ${miktar} oynadın ve ${miktar*40} kazandın! \` ${message.author}`)

} 

let sonuc = [];
sonuc.push(slot1)
sonuc.push(slot2)
sonuc.push(slot3)
if(sonuc[0] == "🐌" && sonuc[1] == "🐌"||(sonuc[1] == "🐌" && sonuc[2] == "🐌")||(sonuc[0] == "🐌"&& sonuc[2] == "🐌") ){
db.add(`Bakiye_${message.author.id}`,`${miktar}`*50)
message.channel.send(`💷 \` ${miktar} oynadın ve ${miktar*50} kazandın! \` ${message.author}`)

} 


let sonucCC = [];
sonucCC.push(slot1)
sonucCC.push(slot2)
sonucCC.push(slot3)
    
if(sonucCC[0] == "🐪" && sonucCC[1] == "🐪"||(sonucCC[1] == "🐪"&&sonucCC[2] == "🐪")||(sonucCC[2] == "🐪"&&sonucCC[0] == "🐪")||(sonucCC[0] == "🐞" && sonucCC[1] == "🐞")||(sonucCC[1] == "🐞"&&sonucCC[2] == "🐞")||(sonucCC[2] == "🐞"&&sonucCC[0] == "🐞")||(sonucCC[0] == "🦇" && sonucCC[1] == "🦇")||(sonucCC[1] == "🦇"&&sonucCC[2] == "🦇")||(sonucCC[2] == "🦇"&&sonucCC[0] == "🦇")||(sonucCC[0] == "🐘" && sonucCC[1] == "🐘")||(sonucCC[1] == "🐘"&&sonucCC[2] == "🐘")||(sonucCC[2] == "🐘"&&sonucCC[0] == "🦂")||(sonucCC[0] == "🦂" && sonucCC[1] == "🦂")||(sonucCC[1] == "🦂"&&sonucCC[2] == "🦂")||(sonucCC[2] == "🦂"&&sonucCC[0] == "🦂")||(sonucCC[0] == "🦂" && sonucCC[1] == "🐉")||(sonucCC[1] == ""&&sonucCC[2] == "🐉")||(sonucCC[2] == "🐉"&&sonucCC[0] == "🐉")){
  
db.add(`Bakiye_${message.author.id}`,`${miktar}`*3)
message.channel.send(`💷 \` ${miktar} oynadın ve ${miktar*3} kazandın! \` ${message.author}`)

} 
    
let sonucCeC = [];
sonucCeC.push(slot1)
sonucCeC.push(slot2)
sonucCeC.push(slot3)
if(sonucCeC[0] == "🐛" && sonucCeC[1] == "🐛"||(sonucCeC[1] == "🐛" && sonucCeC[2] == "🐛")||(sonucCeC[0] == "🐛" && sonucCeC[2] == "🐛") ||(sonucCeC[0] == "🐉" && sonucCeC[1] == "🐉")||(sonucCeC[2] == "🐉"&& sonucCeC[1] == "🐉")||(sonucCeC[0] == "🐉"&& sonucCeC[1] == "🐉")){
db.add(`kredi.${message.author.id}`,-`${miktar}`)
message.channel.send(`💷 \` ${miktar} oynadın ve ${miktar} para kaybettin ettin! \` ${message.author} `)

} 
    
let sonucC = [];
sonucC.push(slot1)
sonucC.push(slot2)
sonucC.push(slot3)
if(sonucC[0] == "🐛" && sonucC[1] == "🐛"&& sonucC[2] == "🐛"||(sonucC[0] == "🐬" && sonucC[1] == "🐬"&& sonucC[2] == "🐬")||(sonucC[0] == "🐿️" && sonucC[1] == "🐿️"&& sonucC[2] == "🐿️")||(sonucC[0] == "🐘" && sonucC[1] == "🐘"&& sonucC[2] == "🐘")||(sonucC[0] == "🦇" && sonucC[1] == "🦇"&& sonucC[2] == "🦇")||(sonucC[0] == "🐉" && sonucC[1] == "🐉ˆ"&& sonucC[2] == "🐉")||(sonucC[0] == "💷 " && sonucC[1] == "💷 "&& sonucC[2] == "💷")||(sonucC[0] == "🦒" && sonucC[1] == "🦒"&& sonucC[2] == "🦒")){
db.add(`Bakiye_${message.author.id}`,`${miktar}`*4)

message.channel.send(`
             **KAZANDIN**
${message.author} 💷 ${miktar} oynadın ve ${miktar*4} kazandın!`)

} 


} else{

		message.channel.send(stripIndents`
      🎰 __**SLOTS**__
 
      ${slot1} : ${slot1} : ${slot3}

		`).then((msg)=> {
  setTimeout( function(){ msg.edit(stripIndents`
      🎰 __**SLOTS**__

      ${slot1} : ${slot2} : ${slot3}

💷 \` ${miktar} oynadın ve ${miktar} para kaybettin ettin! \` ${message.author} 
		`);
  }, 420)})



db.add(`Bakiye_${message.author.id}`,-`${miktar}`)



}

}

exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: ['slots', 'slot'],
  permLevel: 0
};

exports.help = {
  name: 'slots', 
  description: 'Slots oyunu oynatÄ±r',
  usage: 'slots'
};