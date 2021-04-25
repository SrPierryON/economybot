const Discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith('s.'))return;  

    let user = message.author;

    let author = db.fetch(`money_${user.id}`)

    let Embed = new Discord.RichEmbed()
    .setColor("#2f3136")
    .setDescription(`<:s_err:835971194887864342> **|** Você precisa de 2.000 moedas para comprar Bronze VIP`);

    if (args[0] == 'bronze') {
        if (author < 3500) return message.channel.send(Embed)
        
        db.fetch(`bronze_${user.id}`);
        db.set(`bronze_${user.id}`, true)

        let Embed2 = new Discord.RichEmbed()
        .setColor("#2f3136")
        .setDescription(`<:s_yes:835971288118853664>・VIP de bronze comprado por 3.500 moedas`);

        db.subtract(`money_${user.id}`, 3500)
        message.channel.send(Embed2)
    } else if(args[0] == 'nikes') {
        let Embed2 = new Discord.RichEmbed()
        .setColor("#2f3136")
        .setDescription(`<:s_err:835971194887864342>・Você precisa de 600 moedas para comprar alguns Nikes`);

        if (author < 600) return message.channel.send(Embed2)
       
        db.fetch(`nikes_${user.id}`)
        db.add(`nikes_${user.id}`, 1)

        let Embed3 = new Discord.RichEmbed()
        .setColor("#2f3136")
        .setDescription(`<:s_err:835971194887864342>・Nikes frescos comprados por 600 moedas`);

        db.subtract(`money_${user.id}`, 600)
        message.channel.send(Embed3)
    } else if(args[0] == 'car') {
        let Embed2 = new Discord.RichEmbed()
        .setColor("#2f3136")
        .setDescription(`<:s_err:835971194887864342>・Você precisa de 800 moedas para comprar um carro novo`);

        if (author < 800) return message.channel.send(Embed2)
       
        db.fetch(`car_${user.id}`)
        db.add(`car_${user.id}`, 1)

        let Embed3 = new Discord.RichEmbed()
        .setColor("#2f3136")
        .setDescription(`<:s_yes:835971288118853664>・Comprou um carro novo por 800 moedas`);

        db.subtract(`money_${user.id}`, 800)
        message.channel.send(Embed3)
    } else if(args[0] == 'mansion') {
        let Embed2 = new Discord.RichEmbed()
        .setColor("#2f3136")
        .setDescription(`<:s_err:835971194887864342>・Você precisa de 1.200 moedas para comprar uma mansão`);

        if (author < 1200) return message.channel.send(Embed2)
       
        db.fetch(`house_${user.id}`)
        db.add(`house_${user.id}`, 1)

        let Embed3 = new Discord.RichEmbed()
        .setColor("#2f3136")
        .setDescription(`<:s_yes:835971288118853664>・Comprou uma mansão por 1.200 moedas`);

        db.subtract(`money_${user.id}`, 1200)
        message.channel.send(Embed3)
    } else {
        let embed3 = new Discord.RichEmbed()
        .setColor("#2f3136")
        .setDescription('<:s_err:835971194887864342>・Insira um item para comprar')
        message.channel.send(embed3)
    }

}
  
  module.exports.help = {
    name:"buy",
    aliases: ["comprar"]
  }
