const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith('s.'))return;  

  let user = message.author;

  let timeout = 180000;
  let amount = 5;

  let beg = await db.fetch(`beg_${user.id}`);

  if (beg !== null && timeout - (Date.now() - beg) > 0) {
    let time = ms(timeout - (Date.now() - beg));
  
    let timeEmbed = new Discord.RichEmbed()
    .setColor("#2f3136")
    .setDescription(`**<:s_err:835971194887864342>・Você já implorou recentemente, Implore novamente em ${time.minutes} minutos e ${time.seconds} segundos**`);
    message.channel.send(timeEmbed)
  } else {
    let moneyEmbed = new Discord.RichEmbed()
  .setColor("#FFFFFF")
  .setDescription(`<:s_yes:835971288118853664> **|** Você implorou e recebeu ${amount} coins`);
  message.channel.send(moneyEmbed)
  db.add(`money_${user.id}`, amount)
  db.set(`beg_${user.id}`, Date.now())


  }
};


module.exports.help = {
  name:"beg",
  aliases: ["implorar", "mendigar"]
}
