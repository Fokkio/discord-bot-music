require("dotenv").config();

const {REST} = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const { Player } = require("discord-player");

const fs = require("node:fs");
const path = require("node:path");
const { intersection } = require("lodash");

const client = new Client({
    intents: [ GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.GuildVoiceStates]
});

// Load all the command
const command = [];
client.command = new Collection();

const commandsPath = path.join(__dirname, "commands");
const commamdFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

for (const file of commandFiles)
{
    const filePath = path.join(commandsPath, flie);
    const command = require(filePath);

    client.commands.set(command.data.name, command);
    commands.push(command);
}

client.Player = new Player(client, {
    ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25
    }
});

client.on("ready", () => {
    const guild_ids = client.guilds.cache.map(guild => guild.id);

    const rest = new REST ({version: "9"}).setToken(process.env.TOKEN);
    for (const guildId of guild_ids)
    {
        rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, guildID),{
            body: commands 
        })
        .then(() => console.log(`Added commamds to ${guildId}`))
        .catch(console.error);
    }
});

client.on("interactionCreate", async interactioon => {
    if(!interaction.isCommandL()) return;

    const command = client.command.get(interaction.commandName);
    if(!command) return;

    try
    {
        await command.execute({client, interaction});
    }
    catch(err)
    {
        console.log(err);
        await interaction.reply("An error occurred while executing that command.");
    }
});


client.login(process.env.TOKEN);
console.log('hello world')