const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const moment = require("moment");
const db = require('quick.db');

var prefix = ayarlar.prefix;

exports.run = async (client, message, args) => {
  
  let kontrol = await db.fetch(`dil_${message.guild.id}`);
  
  if(!kontrol) {
    
     const embed = new Discord.RichEmbed()
      .setColor("RED")
      .setAuthor(`Misty`, client.user.avatarURL)
      .setDescription(`**__Merhabalar Önce Bir Dil Seçmelisin!__** 

**Diller**: \`TR\`, \`EN\`
**Örnek**: \`\` ${prefix}dil tr \`\`

**__Hello, You Must Choose A Language First!__** 

**Languages**: \`EN\`, \`TR\`
**Example**: \`\` ${prefix}lang en \`\``)
     .setFooter(`mistyoffical.glitch.me`, client.user.avatarURL)
    message.channel.send(embed);
    return;
  }
  
  if (kontrol == "TR") {
   
   const embed = new Discord.RichEmbed()
    .setColor("PURPLE")
    .setDescription(
      `**__Misty Yardım Menüsü__** \n \n **Altta ki emojilere tıklayarak istediğin kategori de yardım menüsüne ulaşabilirsin!** \n \n <a:owner:737459285772075068> = Ana Menü \n \n <a:edt:743100890382336060> = Moderasyon \n \n <a:rdt:751408392668708936> = Moderasyon 2 \n \n <a:redpar:743102530568847490> = Kayıt Sistemi \n \n <a:guard:743102530049015809> = Koruma sistemi \n \n  💰 = Ekonomi Sistemi \n \n <a:lvl:747257739524309055> = Level Sistemi \n \n <a:partner:737459283490242570> = Davet Sistemi \n \n <a:head2:749695061456846978> = Hazır Sunucular \n \n <a:party:743100921197888174> = Eğlence \n \n <a:rules:735478030117503046> = Bot bilgi \n \n <a:delete:744501792905101363> = Menüyü kapatır.`
    )
  .setFooter(`60 saniye içinde iptal edilecektir.`)
  
  message.channel.send(embed).then(async (msg) => {
    
    await msg.react('737459285772075068'); //ana menü
    await msg.react('743100890382336060'); //moderasyon
    await msg.react('751408392668708936'); //moderasyon 2
    await msg.react('743102530568847490'); //kyıt sistemi
    await msg.react('743102530049015809'); //koruma
    await msg.react(`💰`); //ekonomi
    await msg.react('747257739524309055'); //level
    await msg.react('737459283490242570'); //davet-sistemi
    await msg.react('749695061456846978'); // hazır şablonlar
    await msg.react('743100921197888174'); //eğlence
    await msg.react('735478030117503046'); //bot bilgi
    await msg.react('744501792905101363'); //sil
   
    const anan = (reaction, user) =>
      reaction.emoji.name === "owner" && user.id === message.author.id;
    const xddd = msg.createReactionCollector(anan, { time: 100000 }); //ANA MENÜ

    const modis = (reaction, user) =>
      reaction.emoji.name === "edt" && user.id === message.author.id;
    const mod = msg.createReactionCollector(modis, { time: 100000 }); //MOERASYON
    
     const gluk = (reaction, user) =>
      reaction.emoji.name === "rdt" && user.id === message.author.id;
    const two = msg.createReactionCollector(gluk, { time: 100000 }); //MOERASYON

    const tata = (reaction, user) =>
      reaction.emoji.name === "redpar" && user.id === message.author.id;
    const ta = msg.createReactionCollector(tata, { time: 100000 }); //KAYIT - SİSTEMİ

    const gu = (reaction, user) =>
      reaction.emoji.name === "guard" && user.id === message.author.id;
    const guar = msg.createReactionCollector(gu, { time: 100000 }); //GYARD

    const egd = (reaction, user) =>
      reaction.emoji.name === "party" && user.id === message.author.id;
    const eglen = msg.createReactionCollector(egd, { time: 100000 }); //EĞLECNE

    const rua = (reaction, user) =>
      reaction.emoji.name === "rules" && user.id === message.author.id;
    const atila = msg.createReactionCollector(rua, { time: 100000 }); //bot bilgi
    
     const eko = (reaction, user) =>
      reaction.emoji.name === "💰" && user.id === message.author.id;
    const berat = msg.createReactionCollector(eko, { time: 100000 }); //ekonomi
    
     const par = (reaction, user) =>
      reaction.emoji.name === "partner" && user.id === message.author.id;
    const invite = msg.createReactionCollector(par, { time: 100000 }); //ekonomi
    
    const botlist = (reaction, user) =>
      reaction.emoji.name === "head2" && user.id === message.author.id;
    const list = msg.createReactionCollector(botlist, { time: 100000 }); //şablon
    
      const buvak = (reaction, user) =>
      reaction.emoji.name === "lvl" && user.id === message.author.id;
    const evel = msg.createReactionCollector(buvak, { time: 100000 }); //level
    
    const del = (reaction, user) =>
    reaction.emoji.name === "delete" && user.id === message.author.id;
     const cay = msg.createReactionCollector(del, { time: 100000 }); //sil
    
    message.delete()
    msg.delete(60000)

    //moderasyon
    mod.on("collect", r => {
      embed.setColor("BLUE");
      embed.setDescription(` **__Misty Moderasyon Menüsü__**

<a:elmas:737345045086208010>  = **${prefix}taç**: Sunucuyu gösterir.

<a:elmas:737345045086208010>  = **${prefix}ototag-ayarla**: Kullanıcının başına otomatik tag ekler.

<a:elmas:737345045086208010>  = **${prefix}reklam-tara**: Kullanıcıların oynuyor mesajlarındaki ve kullanıcı adlarındaki reklamları tarar.

<a:elmas:737345045086208010>  = **${prefix}çek**: Etiketlediğiniz kullanıcıyı yanınıza çeker.
<a:elmas:737345045086208010>  = **${prefix}git**: Dolu kanaldaki üyenin yanına gitmenizi sağlar.
<a:elmas:737345045086208010>  = **${prefix}avatar** | **${prefix}avatarım**: Kendinin ya da etiketlediğin kişinin avatarını atar.

<a:elmas:737345045086208010>  = **${prefix}ban**: Üyeyi yasaklama komutu.
<a:elmas:737345045086208010>  = **${prefix}ban-rolü-ayarla** | **${prefix}ban-rol-sıfırla** | **${prefix}ban-log** | **${prefix}ban-log-sıfırla**: Ban rolünü ve log kanalını ayarlar ve ya sıfırlar.
<a:elmas:737345045086208010>  = **${prefix}unban**: Kullanıcının banını kaldırır.
<a:elmas:737345045086208010>  = **${prefix}force-ban**: Kullanıcı sunucu da değilken id ban atarsınız.

<a:elmas:737345045086208010>  = **${prefix}vmute** | **${prefix}mute** | **${prefix}mute-yetkisi-ayarla** | **${prefix}mute-yetkisi-sıfırla** | **${prefix}mute-log-kanal** | **${prefix}mute-log-sıfırla**: Üyeyi susturma komutu, ayarlama ve sıfırlama.

<a:elmas:737345045086208010>  = **${prefix}hgbb yardım**: Hoşgeldin, kanal ve mesaj ayarlamalı.

<a:elmas:737345045086208010>  = **${prefix}tag** | **${prefix}tag-ayarla** | **${prefix}tag-sıfırla**: Tag sistemi.

<a:elmas:737345045086208010>  = **${prefix}sa-as [aç/kapat]**: Selam sistemi.
<a:elmas:737345045086208010>  = **${prefix}temizle**: Mesajları siler, sohbeti temizler.
<a:elmas:737345045086208010>  = **${prefix}rol-üyeleri**: Role sahip üyeleri sıralar.
<a:elmas:737345045086208010>  = **${prefix}kullanıcı-bilgi**: Kullanıcının bilgilerini gösterir.

<a:elmas:737345045086208010>  = **${prefix}mod-log #kanal** | **mod-log-sıfırla**: Mod-log kanalı, kullanıcı dökümanıdır.`
                          );

      msg.edit(embed);  
    });
    
    
    //moderasyon 2
    two.on("collect", r => {
      embed.setColor("BLUE");
      embed.setDescription(` **__Misty Moderasyon 2 Menüsü__**

<a:elmas:737345045086208010>  = **${prefix}uyarı-ayarla**: Uyarı sayısını ve cezalı rolünü ayarlar..
<a:elmas:737345045086208010>  = **${prefix}uyarı kanal**: Uyarı log kanalını ayarlar.
<a:elmas:737345045086208010>  = **${prefix}uyarı kanal-sıfırla**: Uyarı log kanalını sıfırlar.
<a:elmas:737345045086208010>  = **${prefix}uyarı ver**: Kullancıya 1 uyarı ekler.
<a:elmas:737345045086208010>  = **${prefix}uyarı sil**: Kullanıcının uyarısını siler.
<a:elmas:737345045086208010>  = **${prefix}uyarı bilgi**: Kullanıcının uyarı bilgilerini gösterir.

<a:elmas:737345045086208010>  = **${prefix}küfür [aç/kapat]**: Küfür filtresini açar.
<a:elmas:737345045086208010>  = **${prefix}capslock-engel [aç/kapat]**: Capslock kullanımını engeller.`
                          );

      msg.edit(embed);  
    });

    //anamenü
    xddd.on("collect", r => {
      embed.setColor("PURPLE");
      embed.setDescription(
        `**__Misty Yardım Menüsü__** \n \n **Altta ki emojilere tıklayarak istediğin kategori de yardım menüsüne ulaşabilirsin!** \n \n <a:owner:737459285772075068> = Ana Menü \n \n <a:edt:743100890382336060> = Moderasyon \n \n <a:rdt:751408392668708936> = Moderasyon 2 \n \n <a:redpar:743102530568847490> = Kayıt Sistemi \n \n <a:guard:743102530049015809> = Koruma sistemi \n \n  💰 = Ekonomi Sistemi \n \n <a:lvl:747257739524309055> = Level Sistemi \n \n <a:partner:737459283490242570> = Davet Sistemi \n \n <a:head2:749695061456846978> = Hazır Sunucular \n \n <a:party:743100921197888174> = Eğlence \n \n <a:rules:735478030117503046> = Bot bilgi \n \n <a:delete:744501792905101363> = Menüyü kapatır.`
      );
      msg.edit(embed);
    });

    //kayıt sistemi
    ta.on("collect", r => {
      embed.setColor("RED");
      embed.setDescription(`**__Kayıt Sistemi Menüsü__**

<a:elmas:737345045086208010> = **${prefix}erkek** | **${prefix}erkek-rolü** | **${prefix}erkek-sıfırla**: Erkek kaydetme ve ayarlama, sıfırlama komutları.
<a:elmas:737345045086208010>  = **${prefix}kadın** | **${prefix}kadın-rolü** | **${prefix}kadın-sıfırla**: Kadın kaydetme ve  ayarlama, sıfırlama komutları.
<a:elmas:737345045086208010>  = **${prefix}kayıtsız-rolü** | **${prefix}kayıtsız-sıfırla**: Kayıtsız ayarlama komutu, sunucu da kaydedilmemiş kişi.
<a:elmas:737345045086208010>  = **${prefix}kayıt-yetkilisi** | **${prefix}kayıt-yetkisi-sıfırla**: Teyit rolünü ayarlar ve ya sıfırlar.
<a:elmas:737345045086208010>  = **${prefix}kayıt-bilgi**: Üyenin kayıt bilgilerini gösterir.
<a:elmas:737345045086208010>  = **${prefix}kayıt-ayarları**: Kayıt ayarlarını gösterir. 

<a:elmas:737345045086208010>  = **${prefix}isim**: Kullanıcı adı değiştirme. [isim ve yaş, tag]
<a:elmas:737345045086208010>  = **${prefix}nick**: Kullanıcı adı değiştirme. [normal]

<a:elmas:737345045086208010>  = **${prefix}otorol #kanal @rol**: Sunucuya yeni girenlere belirlediğiniz rolü otomatik olarak verir.
<a:elmas:737345045086208010>  = **${prefix}otorol [mesajkapat]**: Otorol mesajını kapatır.
<a:elmas:737345045086208010>  = **${prefix}otorol [sıfırla]**: Otorol'ü kapatır.`);
      msg.edit(embed);
    });

    //guard botu
    guar.on("collect", r => {
      embed.setDescription(`**__Koruma Sistemi Menüsü__**

<a:elmas:737345045086208010> = **${prefix}role-yetki-verme-koruması [aç/kapat]**: Sunucu kurucusu dışın da kimse, role yönetici veremez.

<a:elmas:737345045086208010> = **${prefix}ever-engel [aç/kapat]**: Kullanıcıların **everyone** ve **here** atmasını engeller.

<a:elmas:737345045086208010> = **${prefix}anti-raid [aç/kapat]**: Sizden izinsiz eklenen botları atar.

<a:elmas:737345045086208010> = **${prefix}bot-izni [bot-id]**: Bu komut ile **id**sini girdiğin bot sunucudan atılmaz.

<a:elmas:737345045086208010> = **${prefix}sağtıkban [aç/kapat]**: Sağ tık ile ban atan kişinin yetkisini alır.

<a:elmas:737345045086208010> = **${prefix}reklam-engel [aç/kapat]**: Tüm reklamları engeller ve 3 kere reklam yaptıktan sonra kick atar.

<a:elmas:737345045086208010> = **${prefix}koruma-log #kanal**: koruma log kanalı.`);
      msg.edit(embed);
    });

    //eğlence
    eglen.on("collect", r => {
      embed.setColor('PURPLE')
      embed.setDescription(`**__Eğlence Menüsü__**

<a:elmas:737345045086208010> = **${prefix}kaç-cm**: Kaç cm olduğunu gösterir :D

<a:elmas:737345045086208010> = **${prefix}vikipedi [isim/vs.]**: Wikipedia'da istediğiniz kelimeyi aratır.

<a:elmas:737345045086208010> = **${prefix}balık-tut**: Balık tutarsın.

<a:elmas:737345045086208010> = **${prefix}aşkölçer @kişi @kişi**: İki kullanıcı arasındaki aşkı ölçer.

<a:elmas:737345045086208010> = **${prefix}sayı-tahmini**: Rastgele rakam belirler ve siz o rakamı bulmaya çalışırsınız.

<a:elmas:737345045086208010> = **${prefix}yazı-yarışması**: İlk yazan kazanır.`);
      msg.edit(embed); //<a:elmas:737345045086208010> = **${prefix}öp**: Etiketlendiğiniz kullanıcıyı öper.
    });
    
    //ekonomi
    berat.on("collect", r => {
      embed.setColor('ORANGE')
      embed.setDescription(`**__Ekonomi Menüsü__**

<a:elmas:737345045086208010> = **${prefix}günlük:** Her gün alacağınız harçlık komutudur.

<a:elmas:737345045086208010> = **${prefix}bakiye**: Senin ve ya etiketlediğin kullanıcının para miktarını gösterir.

<a:elmas:737345045086208010> = **${prefix}market**: Market Menüsü.. Satın almak için __market__ komutunun yanına [ürün] adını yazmanız yeterlidir.

<a:elmas:737345045086208010> = **${prefix}para-gönder:** Etiketlediğiniz kullanıcıya, kendi bâkiyenizden para gönderirsiniz.

<a:elmas:737345045086208010> = **${prefix}slot**: slot oyunu!`);
      msg.edit(embed);
    });

    
     //evel
    evel.on("collect", r => {
      embed.setColor('BLUE')
      embed.setDescription(`**__Level Sistemi Menüsü__**

<a:elmas:737345045086208010> = **${prefix}seviye-aç:** Seviye sistemini aktif eder.

<a:elmas:737345045086208010> = **${prefix}seviye-kapat**: Seviye sistemini kapatır.

<a:elmas:737345045086208010> = **${prefix}seviye-kanal**: Seviye atlayınca, mesaj gidecek kanalı ayarlar.

<a:elmas:737345045086208010> = **${prefix}seviye-mesaj**: Seviye atlayınca, gelecek mesajı ayarlar.

<a:elmas:737345045086208010> = **${prefix}rank**: Seviyenizi ve Xp sayınızı gösterir.

<a:elmas:737345045086208010> = **${prefix}level-top**: Sunucu da level sıralaması yapar.

<a:elmas:737345045086208010> = **${prefix}no-xp-rol**: Ayarlayacağınız bu rol de ki üyeler, xp kasamazlar ve level atlayamazlar.

<a:elmas:737345045086208010> = **${prefix}no-xp-kanal**: Kendiniz ayarlayacağınız, bu kanal da kimse xp kasamaz.`);
      msg.edit(embed);
    });
    
    //bot bilgi
    atila.on("collect", r => {
      embed.setColor('RED')
      embed.setDescription(`<a:kristal1:743100937412804689> **__Bot Bilgi__**

**Yapımcılar:** <@677194506621288448>, <@470548458072440842>

**Ping:** ${client.ping}

**Kullanıcılar:** ${client.users.size} 

**Sunucular:** ${client.guilds.size} 

**Kütüphane:** Discord.js

**Site:** [Tıkla](${ayarlar.site})

[Bot Davet Linki](${ayarlar.botdavet}) | [Destek Sunucusu](${ayarlar.sunucudavet})`);
      msg.edit(embed);
    });
    
    cay.on("collect", r => { //sil
      embed.setColor('RED')
      embed.setDescription(`<a:wrong:744501616698327061> Mesajınız 10 saniye içinde iptal edilecektir.`)
      msg.edit(embed);
      msg.delete(10000);
      
      
    })
    
      //sunucu template
    list.on("collect", r => {
      embed.setColor('BLUE')
      embed.setDescription(`**__Sunucu Template Menüsü__**

<a:elmas:737345045086208010> = **${prefix}template-info [template-adı]:** Template hakkında bilgi verir.

<a:elmas:737345045086208010> = **${prefix}botlist-kur:** Hazır bir botlist sunucusu kurar.

<a:elmas:737345045086208010> = **${prefix}oyun-sunucusu-kur:** Hazır bir oyun sunucusu kurar.`);
      msg.edit(embed);
    });
    
     //invite sistemi
    invite.on("collect", r => {
      embed.setColor('BLUE')
      embed.setDescription(`**__Davet Sistemi Menüsü__**

<a:elmas:737345045086208010> = **${prefix}davet-kanal:** Giriş-çıkış mesajının gönderileceği kanal.

<a:elmas:737345045086208010> = **${prefix}davet-giriş-mesaj:** Giriş mesajını ayarlar.

<a:elmas:737345045086208010> = **${prefix}davet-çıkış-mesaj:** Çıkış mesajını ayarlar.

<a:elmas:737345045086208010> = **${prefix}davet-sistemi-kapat:** Davet sistemini kapatır.`);
      msg.edit(embed);
    });
        
    
  });
    
  } 
  
  else { //EN//////////////////////////---////////////////////////////////
   
     const embed = new Discord.RichEmbed()
    .setColor("PURPLE")
    .setDescription(
       `**__Misty Help Menu__** \n \n **By clicking on the emojis below, you can reach the help menu in the category you want!** \n \n <a:owner:737459285772075068> = Main Menu \n \n <a:edt:743100890382336060> = Moderation \n \n <a:rdt:751408392668708936> = Moderation 2 \n \n <a:redpar:743102530568847490> = Registration System \n \n <a:guard:743102530049015809> = Protection system \n \n  💰 = Economy System \n \n <a:lvl:747257739524309055> = Level System \n \n <a:partner:737459283490242570> = Invitation System \n \n <a:head2:749695061456846978> = Ready Servers \n \n <a:party:743100921197888174> = Entertainment \n \n <a:rules:735478030117503046> = Bot info \n \n <a:delete:744501792905101363> = Closes the menu.`
    )
  .setFooter(`İt cancels the menu in 60 seconds.`)
  
  message.channel.send(embed).then(async (msg) => {
    
    await msg.react('737459285772075068'); //ana menü
    await msg.react('743100890382336060'); //moderasyon
    await msg.react('751408392668708936'); //moderasyon 2
    await msg.react('743102530568847490'); //kyıt sistemi
    await msg.react('743102530049015809'); //koruma
    await msg.react(`💰`); //ekonomi
    await msg.react('747257739524309055'); //level
    await msg.react('737459283490242570'); //davet-sistemi
    await msg.react('749695061456846978'); // hazır şablonlar
    await msg.react('743100921197888174'); //eğlence
    await msg.react('735478030117503046'); //bot bilgi
    await msg.react('744501792905101363'); //sil
   
    const anan = (reaction, user) =>
      reaction.emoji.name === "owner" && user.id === message.author.id;
    const xddd = msg.createReactionCollector(anan, { time: 100000 }); //ANA MENÜ

    const modis = (reaction, user) =>
      reaction.emoji.name === "edt" && user.id === message.author.id;
    const mod = msg.createReactionCollector(modis, { time: 100000 }); //MOERASYON
    
     const gluk = (reaction, user) =>
      reaction.emoji.name === "rdt" && user.id === message.author.id;
    const two = msg.createReactionCollector(gluk, { time: 100000 }); //MOERASYON

    const tata = (reaction, user) =>
      reaction.emoji.name === "redpar" && user.id === message.author.id;
    const ta = msg.createReactionCollector(tata, { time: 100000 }); //KAYIT - SİSTEMİ

    const gu = (reaction, user) =>
      reaction.emoji.name === "guard" && user.id === message.author.id;
    const guar = msg.createReactionCollector(gu, { time: 100000 }); //GYARD

    const egd = (reaction, user) =>
      reaction.emoji.name === "party" && user.id === message.author.id;
    const eglen = msg.createReactionCollector(egd, { time: 100000 }); //EĞLECNE

    const rua = (reaction, user) =>
      reaction.emoji.name === "rules" && user.id === message.author.id;
    const atila = msg.createReactionCollector(rua, { time: 100000 }); //bot bilgi
    
     const eko = (reaction, user) =>
      reaction.emoji.name === "💰" && user.id === message.author.id;
    const berat = msg.createReactionCollector(eko, { time: 100000 }); //ekonomi
    
     const par = (reaction, user) =>
      reaction.emoji.name === "partner" && user.id === message.author.id;
    const invite = msg.createReactionCollector(par, { time: 100000 }); //ekonomi
    
    const botlist = (reaction, user) =>
      reaction.emoji.name === "head2" && user.id === message.author.id;
    const list = msg.createReactionCollector(botlist, { time: 100000 }); //şablon
    
      const buvak = (reaction, user) =>
      reaction.emoji.name === "lvl" && user.id === message.author.id;
    const evel = msg.createReactionCollector(buvak, { time: 100000 }); //level
    
    const del = (reaction, user) =>
    reaction.emoji.name === "delete" && user.id === message.author.id;
     const cay = msg.createReactionCollector(del, { time: 100000 }); //sil
    
    message.delete()
    msg.delete(60000)

    //moderasyon
    mod.on("collect", r => {
      embed.setColor("BLUE");
      embed.setDescription(` **__Misty Moderation Menu__**

<a:elmas:737345045086208010>  = **${prefix}crown**: shows the server

<a:elmas:737345045086208010>  = **${prefix}auto-tag**: İt adds auto tag to the beginning of user

<a:elmas:737345045086208010>  = **${prefix}scan-advertisement**: İt scans the advertisement in user names and ads in users playing messages

<a:elmas:737345045086208010>  = **${prefix}go**: it allows you to go to the member on the filled channel.
<a:elmas:737345045086208010>  = **${prefix}pull**: It takes with you the user you tag
<a:elmas:737345045086208010>  = **${prefix}avatar**:  İt sends the avatar of yourself and the person you tag.

<a:elmas:737345045086208010>  = **${prefix}ban**: command to ban the member.
<a:elmas:737345045086208010>  = **${prefix}set-ban-role | ${prefix}ban-role-reset | ${prefix}ban-log | ${prefix}ban-log-reset**: Sets or resets the ban role and log channel.
<a:elmas:737345045086208010>  = **${prefix}unban**: It removes the ban of the user
<a:elmas:737345045086208010>  = **${prefix}force-ban**: When the user is not on the server, you set an id ban.

<a:elmas:737345045086208010>  = **${prefix}vmute | ${prefix}mute | ${prefix}set mute-authority | ${prefix}mute-authorization-reset | ${prefix}mute-log-channel | ${prefix}mute-log-reset**: Command to silence, set and reset member

<a:elmas:737345045086208010>  = **${prefix}w-by help**: Welcome, Good bye, set channel and message. (adjustable channel and message)

<a:elmas:737345045086208010>  = **${prefix}tag | ${prefix}tag-set | ${prefix}tag-reset**: Tag system.

<a:elmas:737345045086208010>  = **${prefix}greeting [turn on / off]**: greeting system.
<a:elmas:737345045086208010>  = **${prefix}clean:** cleans the messages and the chat.
<a:elmas:737345045086208010>  = **${prefix}role-members**: put in order the members who have roles.
<a:elmas:737345045086208010>  = **${prefix}user-information:** shows the datas of the user.

<a:elmas:737345045086208010>  = **${prefix}mod-log #channel | ${prefix}mod-log-reset**: The mod-log channel, is the user document.`
                          );

      msg.edit(embed);  
    });
    
    
    //moderasyon 2
    two.on("collect", r => {
      embed.setColor("BLUE");
      embed.setDescription(` **__Misty Moderation 2 Menu__**

<a:elmas:737345045086208010>  = **${prefix}alert-set**: Sets the number of alerts and the role of penalized
<a:elmas:737345045086208010>  = **${prefix}alert channel**: Sets the alert log channel.
<a:elmas:737345045086208010>  = **${prefix}alert reset-channel:** resets the warning log channel
<a:elmas:737345045086208010>  = **${prefix}warning give:** adds 1 warning to the user
<a:elmas:737345045086208010>  = **${prefix}warning delete:** deletes the warning of the user
<a:elmas:737345045086208010>  = **${prefix}warning information:** shows the warning datas of the user

<a:elmas:737345045086208010>  = **${prefix}swearing [on/off]:** in the server, prevents users from swearing.
<a:elmas:737345045086208010>  = **${prefix}capslock-barrier [open/close]:** inhibits the use of capslock.`
                          );

      msg.edit(embed);  
    });

    //anamenü
    xddd.on("collect", r => {
      embed.setColor("PURPLE");
      embed.setDescription(
         `**__Misty Help Menu__** \n \n **By clicking on the emojis below, you can reach the help menu in the category you want!** \n \n <a:owner:737459285772075068> = Main Menu \n \n <a:edt:743100890382336060> = Moderation \n \n <a:rdt:751408392668708936> = Moderation 2 \n \n <a:redpar:743102530568847490> = Registration System \n \n <a:guard:743102530049015809> = Protection system \n \n  💰 = Economy System \n \n <a:lvl:747257739524309055> = Level System \n \n <a:partner:737459283490242570> = Invitation System \n \n <a:head2:749695061456846978> = Ready Servers \n \n <a:party:743100921197888174> = Entertainment \n \n <a:rules:735478030117503046> = Bot info \n \n <a:delete:744501792905101363> = Closes the menu.`
      );
      msg.edit(embed);
    });

    //kayıt sistemi
    ta.on("collect", r => {
      embed.setColor("RED");
      embed.setDescription(`**__Protection System Menu__**

<a:elmas:737345045086208010> = **${prefix}male | ${prefix}male-role | ${prefix}male-reset: Save and set male, reset commands.


<a:elmas:737345045086208010>  = **${prefix}woman | ${prefix}woman-role | ${prefix}woman-reset**: Save and set female, reset commands.

<a:elmas:737345045086208010>  = ** ${prefix}indifferent-role | ${prefix}unregistered-reset**: Unregistered setup command, person not registered on server.

<a:elmas:737345045086208010>  = **${prefix}registration-officer | ${prefix}record-authorization-reset:** Sets or resets the confirmation role.

<a:elmas:737345045086208010>  = **${prefix}registration-info**: It shows the registration information of the member.
<a:elmas:737345045086208010>  = **${prefix}recording-settings**: displays recording settings.

<a:elmas:737345045086208010>  = **${prefix}name**: Change username. [name and age, tag]
<a:elmas:737345045086208010>  = **${prefix}nick**: Change username. [normal]

<a:elmas:737345045086208010>  = **${prefix}autorol #channel @role**: Automatically gives the role you set to newcomers to the server.

<a:elmas:737345045086208010>  = **${prefix}Autorol [message closure]**: Closes autoroll message.(It cleans the message you adjust)

<a:elmas:737345045086208010>  = **${prefix}Autorol [reset]**: Closes autoroll.`);
      msg.edit(embed);
    });

    //guard botu
    guar.on("collect", r => {
      embed.setDescription(`**__Protection System Menu__**

<a:elmas:737345045086208010> = **${prefix}role-authorize-grant-protect [on/off]**: Nobody except the server installer can assign a role as an administrator.

<a:elmas:737345045086208010> = **${prefix}ever-block [open/close]**: Prevents users from sending @everyone and @here.

<a:elmas:737345045086208010> = **${prefix}anti-raid [open/close]**: kicks bots that have been added without your permission.

<a:elmas:737345045086208010> = **${prefix}bot-permission [bot-id] bot you write its id with that bot isnt kicked from the server

<a:elmas:737345045086208010> = **${prefix}right-click ban [open/close]:** İt disempowers the person who ban with right click

<a:elmas:737345045086208010> = **${prefix}ad-block [on/off]:** Blocks all ads and kicks the person after 3 ads if she or he shares

<a:elmas:737345045086208010> = **${prefix}guard-log #channel: protection log channel.`);
      msg.edit(embed);
    });

    //eğlence
    eglen.on("collect", r => {
      embed.setColor('PURPLE')
      embed.setDescription(`**__Entertainment Menu__**

<a:elmas:737345045086208010> = **${prefix}kaç-cm**: Kaç cm olduğunu gösterir.

<a:elmas:737345045086208010> = **${prefix}wikipedi [name / etc.]:** Searches for the word you want on Wikipedia.

<a:elmas:737345045086208010> = **${prefix}fish-catch:** You catch fish.

<a:elmas:737345045086208010> = **${prefix}love odometer @person @person:** Measures the love between two users.

<a:elmas:737345045086208010> = **${prefix}number-guessing:** Pick a random number and you try to find that number.

<a:elmas:737345045086208010> = **${prefix}writing-competition:** The first writer wins.`);
      msg.edit(embed); //<a:elmas:737345045086208010> = **${prefix}kiss:** Kisses the user you've been tagged for.
    });
    
    //ekonomi
    berat.on("collect", r => {
      embed.setColor('ORANGE')
      embed.setDescription(`**__Economy Menu__**

<a:elmas:737345045086208010> = **${prefix}daily:** the pocket money command you will receive every day

<a:elmas:737345045086208010> = **${prefix}market:** Market Menu.. To buy, it is sufficient to write the [product] name next to the market command.

<a:elmas:737345045086208010> = **${prefix}balance:** Shows the amount of money you or the user tagged.

<a:elmas:737345045086208010> = **${prefix}send money:** You send money to your tagged user from your own bank.

<a:elmas:737345045086208010> = **${prefix}slot:** slot game!`);
      msg.edit(embed);
    });

    
     //evel
    evel.on("collect", r => {
      embed.setColor('BLUE')
      embed.setDescription(`**__Level System Menu_**

<a:elmas:737345045086208010> = **${prefix}level-open:** activates the level system

<a:elmas:737345045086208010> = **${prefix}level-off:** turns off the level system.

<a:elmas:737345045086208010> = **${prefix}level-channel:** Sets the channel where the message will go when you level up.

<a:elmas:737345045086208010> = **${prefix}level-message: Sets the next message when you level up.

<a:elmas:737345045086208010> = **${prefix}rank: Shows your level and Xp count.

<a:elmas:737345045086208010> = **${prefix}level-top: The server also makes a level ranking.

<a:elmas:737345045086208010> = **${prefix}no-xp-role: The members in this role that you can set, cannot gain xp and level up.

<a:elmas:737345045086208010> = **${prefix}no-xp-channel: You can set this channel yourself, nobody can get xp.`);
      msg.edit(embed);
    });
    
    //bot bilgi
    atila.on("collect", r => {
      embed.setColor('RED')
      embed.setDescription(`<a:kristal1:743100937412804689> **__Bot Information__**

**Producers:** <@677194506621288448>, <@470548458072440842>

**Ping:** ${client.ping}

**Users:** ${client.users.size} 

**Servers:** ${client.guilds.size} 

**Library:** Discord.js

**Website:** [click](${ayarlar.site})

[Bot Invitation Link](${ayarlar.botdavet}) | [Support Server](${ayarlar.sunucudavet})`);
      msg.edit(embed);
    });
    
    cay.on("collect", r => { //sil
      embed.setColor('RED')
      embed.setDescription(`<a:wrong:744501616698327061> Your message will be cancelled in 10 seconds`)
      msg.edit(embed);
      msg.delete(10000);
      
      
    })
    
      //sunucu template
    list.on("collect", r => {
      embed.setColor('BLUE')
      embed.setDescription(`**__Server Template Menu__**

<a:elmas:737345045086208010> = **${prefix}template-info [template-name]:** Gives information about template.

<a:elmas:737345045086208010> = **${prefix}botlist-install:** Sets up a ready botlist server.

<a:elmas:737345045086208010> = **${prefix}game-server-set up:** Set up a ready-made game server.`);
      msg.edit(embed);
    });
    
     //invite sistemi
    invite.on("collect", r => {
      embed.setColor('BLUE')
      embed.setDescription(`**__Invitation System Menu__**

<a:elmas:737345045086208010> = **${prefix}invitation-channel:** The channel to which the entry-exit message will be sent.

<a:elmas:737345045086208010> = **${prefix}invitation-login-message:** Sets the login message.

<a:elmas:737345045086208010> = **${prefix}invitation-exit-message:** Sets the exit message.

<a:elmas:737345045086208010> = **${prefix}invite-system-close:** Closes the invitation system.`);
      msg.edit(embed);
    });
        
    
  });
    
  }
 
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["help", "yardım"],
  permLevel: 0
};

exports.help = {
  name: "yardımhelp",
  description: "Yardım komutları",
  usage: "prefix+yardım"
};
