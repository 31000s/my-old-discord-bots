const Discord = require("discord.js");
const db = require("quick.db")
exports.run = async (client, message, args) => {
  
let bakiye = await db.fetch(`Bakiye_${message.author.id}`) || 0
  

let ürün = args[0]

 const tav = new Discord.RichEmbed()
.setColor('RED')
     .setAuthor(`Misty - Market`, message.author.avatarURL)
   .setDescription(`
\` 1 \` 🔫  \` Silah-----------------1K\` 💷
\` 2 \` 💍 \` Tektaş--------------10K \` 💷
\` 3 \` <a:owner:737459285772075068>  \` Taç----------------100K \` 💷`)
 .setFooter(`Bakiyen: ${bakiye}`)

if(!ürün) return message.channel.send(tav)

//SİLAH  
if(ürün === "Silah" || ürün === "silah") { 
let kaçtanevar = 3
let fiyat = 1000
let kullanım = 2
let ürünadı = 'Silah' 

let kaç_tane_var = await db.fetch(`SilahStokFC_`)

if(bakiye < fiyat) {
  const pad = new Discord.RichEmbed()
.setColor('RED')
   .setDescription(`Almak istediğiniz ürün __**${fiyat}**__ TL'ye satılıyor. Senin de paran yetmiyor.`)
  
message.channel.send(pad)
return }
  
if(kaç_tane_var <= 0) {  
   const miow = new Discord.RichEmbed()
.setColor('RED')
   .setDescription(`Bu **ürün** hiç kalmamış!`)
  
message.channel.send(miow)
return }
  
db.add(`Bakiye_${message.author.id}`,-fiyat)

if(!kaç_tane_var) db.add(`SilahStokFC_`,3-1)
else db.add(`SilahStokFC_`,-1)
  
  const urun = new Discord.RichEmbed()
  .setColor('RED')
  .setDescription(`Merhaba ${ürünadı} ürününü aldın. __${fiyat}__ para ödedin!`)
message.channel.send(urun)}
//---SİLAH-// 
  
  //TEKTAŞ
if(ürün === "Tektaş" || ürün === 'tektaş') { 
let kaçtanevar = 5
let fiyat = 10000
let kullanım = 5
let ürünadı = 'Tektaş' 

let kaç_tane_var = await db.fetch(`tektas_`)

if(bakiye < fiyat) {
  const pad = new Discord.RichEmbed()
.setColor('RED')
   .setDescription(`Almak istediğiniz ürün __**${fiyat}**__ TL'ye satılıyor. Senin de paran yetmiyor.`)
  
message.channel.send(pad)
return }
  
if(kaç_tane_var <= 0) {  
   const miow = new Discord.RichEmbed()
.setColor('RED')
   .setDescription(`Bu **ürün** hiç kalmamış!`)
  
message.channel.send(miow)
return }
  
db.add(`Bakiye_${message.author.id}`,-fiyat)

if(!kaç_tane_var) db.add(`SilahStokFC_`,3-1)
else db.add(`tektas_`,-1)
  
  const urun = new Discord.RichEmbed()
  .setColor('RED')
  .setDescription(`Merhaba ${ürünadı} ürününü aldın. __${fiyat}__ para ödedin!`)
message.channel.send(urun)}
//---TEKTAŞ--// 
  
  
  //TAÇ
if(ürün === "Taç" || ürün === 'taç') { 
let kaçtanevar = 2
let fiyat = 100000
let kullanım = 2
let ürünadı = 'Taç' 

let kaç_tane_var = await db.fetch(`tac_`, 2)

if(bakiye < fiyat) {
  const pad = new Discord.RichEmbed()
.setColor('RED')
   .setDescription(`Almak istediğiniz ürün __**${fiyat}**__ TL'ye satılıyor. Senin de paran yetmiyor.`)
  
message.channel.send(pad)
return }
  

  
db.add(`Bakiye_${message.author.id}`,-fiyat)

if(!kaç_tane_var) db.add(`tac_`, +2)
else 
  
  db.add(`tac_`,-1)
  
  const urun = new Discord.RichEmbed()
  .setColor('RED')
  .setDescription(`Merhaba ${ürünadı} ürününü aldın. __${fiyat}__ para ödedin!`)
message.channel.send(urun)
  db.add(`tac_${message.author.id}`, +1)
}
//---TAÇ
  
  
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['market'],
  permLevel: 0,
}
exports.help = {
    name: 'market',
    description: 'markettt',
    usage: 'markett'
}