const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (bot, message, args, utils) => {
  if(!message.content.startsWith('s.'))return;  

  let user = message.mentions.members.first() || message.author;
  
  let avatar = user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 });

  let bal = db.fetch(`money_${user.id}`)

  if (bal === null) bal = 0;

  let bank = await db.fetch(`bank_${user.id}`)
  if (bank === null) bank = 0;

  let moneyEmbed = new Discord.RichEmbed()
  .setColor("#2f3136")
  .setAuthor(`${user.tag}`, avatar)
  .setFooter(`Solicitado por ${message.author.tag}`, message.author.displayAvatarURL())
  .setDescription(`**<:s_wallet:835881497185222676> | Carteira:** \n> ${bal}\n**🏦 | Banco:** \n> ${bank}`);
  message.channel.send(moneyEmbed)
};

module.exports.help = {
  name:"saldo",
  aliases: ["balance", "bal"]
}
