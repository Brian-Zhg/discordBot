const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent
  ]
});

const timestamp = Date.now();
const date = new Date(timestamp);

const hours = date.getHours();
const minutes = date.getMinutes();

const {
  ButtonBuilder,
  ButtonStyle,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder
} = require('discord.js');

const {
  joinVoiceChannel,
  getVoiceConnection,
} = require('@discordjs/voice');

client.once('clientReady', () => {
  console.log(`Logged in as ${client.user.tag}`);
  if (hours > 12) console.log('Current Time: ' + (hours - 12) + ':' + minutes + ' P.M');
  else console.log('Current Time: ' + hours - 12 + ':' + minutes + ' P.M');
});


//builds buttons
const readyButton = new ButtonBuilder()
  .setCustomId('readyButton')
  .setLabel('Sounds good')
  .setStyle(ButtonStyle.Primary);

const laterButton = new ButtonBuilder()
  .setCustomId('laterButton')
  .setLabel("Can't make it")
  .setStyle(ButtonStyle.Danger);

const row = new ActionRowBuilder().addComponents(
  readyButton,
  laterButton
);

client.on('messageCreate', (message) => {
  if (message.author.bot) return;

  if (message.content === 'test') {
    message.channel.send({
      content: 'Testing my buttons',
      components: [row]
    });
  }
});

client.on('interactionCreate', async interaction => {
  if (interaction.customId == 'readyButton') {
    await interaction.reply({
      content: "Word, we'll see you there",
      ephemeral: true
    })
  }
  if (interaction.customId == 'laterButton') {
    await interaction.reply({
      content: "Man Fuck You",
      ephemeral: true
    })
  }
})

client.on('messageCreate', async (message) => {
  //message needed to join vc
  if (!message.content.startsWith('join you pleco slave') || message.author.bot) return;

  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel) {
    return message.reply('You need to be in a voice channel to use this command!');
  }

  // Join the voice channel using the new voice package
  const connection = joinVoiceChannel({
    channelId: voiceChannel.id,
    guildId: message.guild.id,
    adapterCreator: message.guild.voiceAdapterCreator,
  });

  message.reply('Yes Master right away');
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.content === 'disconnect you pleco slave') {

    const connection = getVoiceConnection(message.guild.id);

    await message.channel.send(
      'https://media1.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3dXJqenNyZWhhY3A5dzV6c2VuZHhmaW02eTF5bHJjaXJ4cWFlNW42dSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/cXCJkf8e9hoXmeyuti/giphy.webp'
    );

    if (connection) {
      connection.destroy();
    }
  }
});

client.login(process.env.TOKEN);