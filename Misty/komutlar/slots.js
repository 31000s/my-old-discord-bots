const Discord = require('discord.js');
const db = require('quick.db')
const { stripIndents } = require('common-tags');
  
const slots = ['π’', 'π¦', 'π', 'π ', 'π¦', 'π', 'πͺ', 'π¦', 'π·', 'π¦', 'π','π¦','π','π','π','πΏοΈ','π','π¬'];
  
let beklemeSuresi = new Set();


exports.run = async function(client, message,args)  {
 if (beklemeSuresi.has(message.author.id)) return message.reply('Bu komutu kullanabilmek iΓ§in **10 saniye** beklemelisin!');
    beklemeSuresi.add(message.author.id);
    setTimeout(() => { beklemeSuresi.delete(message.author.id); }, 10000); // 10000 10 sniye bekler.
const miktar = args[0]
let para = await db.fetch(`Bakiye_${message.author.id}`)

const xd = new Discord.RichEmbed()
.setColor('PURPLE')
.setDescription(`Oynamak iΓ§in paran yok`)
if(!para) return message.channel.send(xd)
  
  const migo = new Discord.RichEmbed()
.setColor('PURPLE')
.setDescription(`Oynacak kadar paran yok`)
if(miktar > para) return message.channel.send(migo)
  
  const mace = new Discord.RichEmbed()
.setColor('PURPLE')
.setDescription(`Oynamak iΓ§in para girmen gerekli`)
if(!miktar) return message.channel.send(mace)
  
	var slot1 = slots[Math.floor(Math.random() * slots.length)];
	var slot2 = slots[Math.floor(Math.random() * slots.length)];
	var slot3 = slots[Math.floor(Math.random() * slots.length)];

//  let sonuc = [slot1, slot2, slot3];
  //if (sonuc.some(s => sonuc.filter(x => x === s && x === "ΔΕΈΒΕ").length >= 2)) return message.reply('Kaybettin!');




	if (slot1 === slot2 && slot1 === slot3 ||(slot1 === slot2 ||slot2===slot1||slot2===slot3||slot3===slot2||slot3===slot1||slot1===slot3) ) {

		message.channel.send(
stripIndents`
      π° __**SLOTS**__

      ${slot3} : ${slot2} : ${slot3}

      \`|                 |\`

	
		`).then((msg)=> {
  setTimeout( function(){ msg.edit(stripIndents`
      π° __**SLOTS**__

      ${slot1} : ${slot2} : ${slot3}`);
  }, 420)})

let sonuccc = [];
sonuccc.push(slot1)
sonuccc.push(slot2)
sonuccc.push(slot3)
if(sonuccc[0] == "π" && sonuccc[1] == "π" ||(sonuccc[2] == "π" && sonuccc[1] == "π" )||(sonuccc[0] == "π" && sonuccc[2] == "π" )){
db.add(`Bakiye_${message.author.id}`,`${miktar}`*100)
message.channel.send(`π· \` ${miktar} oynadΔ±n ve ${miktar*100} kazandΔ±n! \` ${message.author}`)
} 

let sonucc = [];
sonucc.push(slot1)
sonucc.push(slot2)
sonucc.push(slot3)
if(sonucc[0] == "π·" && sonucc[1] == "π·" ||(sonucc[2] == "π·" && sonuc[1] == "π·")||(sonucc[0] == "π·" && sonuc[2] == "π·")){
db.add(`Bakiye_${message.author.id}`,`${miktar}`*40)
message.channel.send(`π· \` ${miktar} oynadΔ±n ve ${miktar*40} kazandΔ±n! \` ${message.author}`)

} 

let sonuc = [];
sonuc.push(slot1)
sonuc.push(slot2)
sonuc.push(slot3)
if(sonuc[0] == "π" && sonuc[1] == "π"||(sonuc[1] == "π" && sonuc[2] == "π")||(sonuc[0] == "π"&& sonuc[2] == "π") ){
db.add(`Bakiye_${message.author.id}`,`${miktar}`*50)
message.channel.send(`π· \` ${miktar} oynadΔ±n ve ${miktar*50} kazandΔ±n! \` ${message.author}`)

} 


let sonucCC = [];
sonucCC.push(slot1)
sonucCC.push(slot2)
sonucCC.push(slot3)
    
if(sonucCC[0] == "πͺ" && sonucCC[1] == "πͺ"||(sonucCC[1] == "πͺ"&&sonucCC[2] == "πͺ")||(sonucCC[2] == "πͺ"&&sonucCC[0] == "πͺ")||(sonucCC[0] == "π" && sonucCC[1] == "π")||(sonucCC[1] == "π"&&sonucCC[2] == "π")||(sonucCC[2] == "π"&&sonucCC[0] == "π")||(sonucCC[0] == "π¦" && sonucCC[1] == "π¦")||(sonucCC[1] == "π¦"&&sonucCC[2] == "π¦")||(sonucCC[2] == "π¦"&&sonucCC[0] == "π¦")||(sonucCC[0] == "π" && sonucCC[1] == "π")||(sonucCC[1] == "π"&&sonucCC[2] == "π")||(sonucCC[2] == "π"&&sonucCC[0] == "π¦")||(sonucCC[0] == "π¦" && sonucCC[1] == "π¦")||(sonucCC[1] == "π¦"&&sonucCC[2] == "π¦")||(sonucCC[2] == "π¦"&&sonucCC[0] == "π¦")||(sonucCC[0] == "π¦" && sonucCC[1] == "π")||(sonucCC[1] == ""&&sonucCC[2] == "π")||(sonucCC[2] == "π"&&sonucCC[0] == "π")){
  
db.add(`Bakiye_${message.author.id}`,`${miktar}`*3)
message.channel.send(`π· \` ${miktar} oynadΔ±n ve ${miktar*3} kazandΔ±n! \` ${message.author}`)

} 
    
let sonucCeC = [];
sonucCeC.push(slot1)
sonucCeC.push(slot2)
sonucCeC.push(slot3)
if(sonucCeC[0] == "π" && sonucCeC[1] == "π"||(sonucCeC[1] == "π" && sonucCeC[2] == "π")||(sonucCeC[0] == "π" && sonucCeC[2] == "π") ||(sonucCeC[0] == "π" && sonucCeC[1] == "π")||(sonucCeC[2] == "π"&& sonucCeC[1] == "π")||(sonucCeC[0] == "π"&& sonucCeC[1] == "π")){
db.add(`kredi.${message.author.id}`,-`${miktar}`)
message.channel.send(`π· \` ${miktar} oynadΔ±n ve ${miktar} para kaybettin ettin! \` ${message.author} `)

} 
    
let sonucC = [];
sonucC.push(slot1)
sonucC.push(slot2)
sonucC.push(slot3)
if(sonucC[0] == "π" && sonucC[1] == "π"&& sonucC[2] == "π"||(sonucC[0] == "π¬" && sonucC[1] == "π¬"&& sonucC[2] == "π¬")||(sonucC[0] == "πΏοΈ" && sonucC[1] == "πΏοΈ"&& sonucC[2] == "πΏοΈ")||(sonucC[0] == "π" && sonucC[1] == "π"&& sonucC[2] == "π")||(sonucC[0] == "π¦" && sonucC[1] == "π¦"&& sonucC[2] == "π¦")||(sonucC[0] == "π" && sonucC[1] == "πΛ"&& sonucC[2] == "π")||(sonucC[0] == "π· " && sonucC[1] == "π· "&& sonucC[2] == "π·")||(sonucC[0] == "π¦" && sonucC[1] == "π¦"&& sonucC[2] == "π¦")){
db.add(`Bakiye_${message.author.id}`,`${miktar}`*4)

message.channel.send(`
             **KAZANDIN**
${message.author} π· ${miktar} oynadΔ±n ve ${miktar*4} kazandΔ±n!`)

} 


} else{

		message.channel.send(stripIndents`
      π° __**SLOTS**__
 
      ${slot1} : ${slot1} : ${slot3}

		`).then((msg)=> {
  setTimeout( function(){ msg.edit(stripIndents`
      π° __**SLOTS**__

      ${slot1} : ${slot2} : ${slot3}

π· \` ${miktar} oynadΔ±n ve ${miktar} para kaybettin ettin! \` ${message.author} 
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
  description: 'Slots oyunu oynatΓΒ±r',
  usage: 'slots'
};