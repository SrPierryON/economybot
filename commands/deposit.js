const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith('s.'))return;  

  let user = message.author;

  let member = db.fetch(`money_${user.id}`)
  let member2 = db.fetch(`bank_${user.id}`)

  if (args[0] == 'all') {
    let money = await db.fetch(`money_${user.id}`)
    let bank = await db.fetch(`bank_${user.id}`)

    let embedbank = new Discord.RichEmbed()
    .setColor('#2f3136')
    .setDescription("<:s_err:835971194887864342>・Você não tem dinheiro para depositar")

    if(money === 0) return message.channel.send(embedbank)

    db.add(`bank_${user.id}`, money)
    db.subtract(`money_${user.id}`, money)
    let embed5 = new Discord.RichEmbed()
  .setColor("#2f3136")
  .setDescription(`<:s_yes:835971288118853664>・Você depositou todas as seus coins em seu banco`);
  message.channel.send(embed5)
  
  } else {
  
  let embed2 = new Discord.RichEmbed()
  .setColor("#2f3136")
  .setDescription(`<:s_err:835971194887864342>・Especifique um valor para depositar`);
  
  if (!args[0]) {
      return message.channel.send(embed2)
      .catch(err => console.log(err))
  }
  let embed3 = new Discord.RichEmbed()
  .setColor("#2f3136")
  .setDescription(`<:s_err:835971194887864342>・Você não pode depositar dinheiro negativo`);

  if (message.content.includes('-')) { 
      return message.channel.send(embed3)
  }
  let embed4 = new Discord.RichEmbed()
  .setColor("#2f3136")
  .setDescription(`<:s_err:835971194887864342>・Você não tem muito coins`);

  if (member < args[0]) {
      return message.channel.send(embed4)
  }

  let embed5 = new Discord.RichEmbed()
  .setColor("#2f3136")
  .setDescription(`<:s_yes:835971288118853664>・Você depositou ${args[0]} coins em seu banco`);

  message.channel.send(embed5)
  db.add(`bank_${user.id}`, args[0])
  db.subtract(`money_${user.id}`, args[0])
  }
}
module.exports.help = {
  name:"deposit",
  aliases: ["dep", "depositar"]
}
