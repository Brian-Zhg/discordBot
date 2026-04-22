const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
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
  .setStyle(ButtonStyle.Primary);
  
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
  if(interaction.customId == 'readyButton'){
    await interaction.reply({
      content: "Word, we'll see you there",
      ephemeral: true
    })
  }
  if(interaction.customId == 'laterButton'){
    await interaction.reply({
      content: "Man Fuck You",
      ephemeral: true
    })
  }
})

client.login(process.env.TOKEN);