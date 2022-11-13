const Discord = require("discord.js");

exports.run = async (client, msj, args) => {
       if 
         (!["737023445568585798", "677194506621288448"].includes(msj.author.id)
    )
      return;
    let evalCekiyoruzNeBakiyorsun = args.join(" ");
    if (!evalCekiyoruzNeBakiyorsun.includes("token")) {
      try {
        var kod = eval(evalCekiyoruzNeBakiyorsun);
        if (evalCekiyoruzNeBakiyorsun.length < 1) return;
        if (typeof kod !== "string");
        kod = require("util").inspect(kod, {
          depth: 0
        });
        let evalEmbed = new Discord.RichEmbed()
          .setColor("BLACK")
          .addField(
            "Code",
            `\`\`\`js\n${
              evalCekiyoruzNeBakiyorsun.length > 1024
                ? "Karakter aşımı!"
                : evalCekiyoruzNeBakiyorsun
            }\`\`\``
          )
          .addField(
            "Result",
            `\`\`\`js\n${kod.length > 1024 ? "Karakter aşımı!" : kod}\n\`\`\``
          );
        msj.channel.send(evalEmbed);
      } catch (hata) {
        let evalEmbed = new Discord.RichEmbed()
          .setColor("BLACK")
          .addField(
            "Code",
            `\`\`\`js\n${
              evalCekiyoruzNeBakiyorsun.length > 1024
                ? "Karakter aşımı!"
                : evalCekiyoruzNeBakiyorsun
            }\`\`\``
          )
          .addField(
            "Err",
            `\`\`\`js\n${hata.length > 1024 ? "Karakter aşımı!" : hata}\`\`\``
          );
        msj.channel.send(evalEmbed);
      }
    } else {
      msj.reply("orospu çocu");
      return;
    }
};
exports.conf = {
    enabled: false,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};
exports.help = {
    name: "eval"
};