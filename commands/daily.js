const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith('s.'))return;  

  let user = message.author;

  let timeout = 86400000;
  let amount = Math.floor(Math.random() * 5000 - 1500) + 1500;

  let daily = await db.fetch(`daily_${user.id}`);

  if (daily !== null && timeout - (Date.now() - daily) > 0) {
    let time = ms(timeout - (Date.now() - daily));
  
    let timeEmbed = new Discord.RichEmbed()
    .setColor("#2f3136")
    .setDescription(`<:s_err:835971194887864342>・Você já coletou sua recompensa diária, Recolher novamente em ${time.hours} horas, ${time.minutes} minutos e ${time.seconds} segundos `);
    message.channel.send(timeEmbed)
  } else {
    let moneyEmbed = new Discord.RichEmbed()
  .setColor("#2f3136")
  .setDescription(`<:s_yes:835971288118853664>・Você coletou sua recompensa diária de ${amount} coins`);
  message.channel.send(moneyEmbed)
  db.add(`money_${user.id}`, amount)
  db.set(`daily_${user.id}`, Date.now())


  }
};


module.exports.help = {
  name:"daily",
  aliases: ["diário", "diario"]
}
