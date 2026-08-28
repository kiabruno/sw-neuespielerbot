const {
    Client,
    GatewayIntentBits,
    SlashCommandBuilder,
    REST,
    Routes,
    EmbedBuilder
} = require("discord.js");

const fs = require("fs");
const path = require("path");

const TOKEN = process.env.TOKEN;
const CLIENT_ID = "1542988253676699698";

const WEBSITE =
    "https://kiabruno.github.io/sw-NeueSpieler/index.html";

const DATA_FILE = path.join(__dirname, "data.json");

const standardDaten = {
    items: [
        { name: "Diamantschwert", available: true },
        { name: "Diamantspitzhacke", available: true },
        { name: "Diamantaxt", available: true },
        { name: "Diamantschaufel", available: true },
        { name: "Diamanten", available: true },
        { name: "Holz", available: true },
        { name: "Steak", available: true },
        { name: "Erde", available: true },
        { name: "Stein", available: true },
        { name: "Pfeile", available: true }
    ],

    starterkit: [
        "⚔️ 1x Diamantschwert",
        "⛏️ 1x Diamantspitzhacke",
        "🪓 1x Diamantaxt",
        "🧹 1x Diamantschaufel",
        "💎 5x Diamanten",
        "🪵 64x Holz",
        "🥩 64x Steak",
        "🟫 64x Erde",
        "🪨 64x Stein",
        "🏹 64x Pfeile"
    ]
};

function loadData() {
    try {
        if (!fs.existsSync(DATA_FILE)) {
            saveData(standardDaten);
            return standardDaten;
        }

        return JSON.parse(
            fs.readFileSync(DATA_FILE, "utf8")
        );
    } catch {
        return standardDaten;
    }
}

function saveData(data) {
    fs.writeFileSync(
        DATA_FILE,
        JSON.stringify(data, null, 4),
        "utf8"
    );
}

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});

const commands = [
    new SlashCommandBuilder()
        .setName("status")
        .setDescription("Status anzeigen"),

    new SlashCommandBuilder()
        .setName("items")
        .setDescription("Items anzeigen"),

    new SlashCommandBuilder()
        .setName("starterkit")
        .setDescription("Starter-Kit anzeigen"),

    new SlashCommandBuilder()
        .setName("web")
        .setDescription("Webseite anzeigen"),

    new SlashCommandBuilder()
        .setName("info")
        .setDescription("Informationen anzeigen"),

    new SlashCommandBuilder()
        .setName("opcup")
        .setDescription("CP CUP 10 anzeigen")
].map(command => command.toJSON());

async function registerCommands() {

    const rest = new REST({
        version: "10"
    }).setToken(TOKEN);

    await rest.put(
        Routes.applicationCommands(CLIENT_ID),
        {
            body: commands
        }
    );

    console.log("Commands registriert.");
}

client.once("ready", () => {
    console.log(`Online als ${client.user.tag}`);
});

client.on("interactionCreate", async interaction => {

    if (!interaction.isChatInputCommand()) {
        return;
    }

if (interaction.commandName === "status") {

    const embed = new EmbedBuilder()
        .setTitle("📊 SW NeueSpieler – Status")
        .setDescription(
            "Hier findest du den aktuellen status von /sw NeueSpieler. "
        )
        .addFields(
            {
                name: "🟢 CB6",
                value: "🟢 Offen",
                inline: true
            },
            {
                name: "📌 Gesamtstatus",
                value: "🟢 CB6 offen",
                inline: false
            }
        )
        .setFooter({
            text: "/sw NeueSpieler"
        })
        .setTimestamp();

    await interaction.reply({
        embeds: [embed]
    });

    return;
}

    if (interaction.commandName === "items") {

        const data = loadData();

        const available = data.items
            .filter(item => item.available)
            .map(item => `🟢 ${item.name}`)
            .join("\n");

        const unavailable = data.items
            .filter(item => !item.available)
            .map(item => `🔴 ${item.name}`)
            .join("\n");

        const embed = new EmbedBuilder()
            .setTitle("📦 SW NeueSpieler – Items")
            .addFields(
                {
                    name: "🟢 Verfügbar",
                    value: available || "Keine Items"
                },
                {
                    name: "🔴 Nicht verfügbar",
                    value: unavailable || "Keine Items"
                }
            );

        await interaction.reply({
            embeds: [embed]
        });

        return;
    }

    if (interaction.commandName === "starterkit") {

        const data = loadData();

        const embed = new EmbedBuilder()
            .setTitle("🎁 /sw NeueSpieler – Starter-Kit")
            .setDescription(
                data.starterkit.join("\n")
            );

        await interaction.reply({
            embeds: [embed]
        });

        return;
    }

    if (interaction.commandName === "web") {

        await interaction.reply(
            `🌐 ${WEBSITE}`
        );

        return;
    }

    if (interaction.commandName === "info") {

        await interaction.reply(
            "ℹ️ Info\n\n" +
            "Wir sind /sw NeueSpieler ein sw auf einem Minecraft Server (https://opsucht.net). " +
            "Bei uns kannst du dir dein Starter Kit abholen wie z.B. " +
            "1x Diamantschwert, 1x Diamantspitzhacke, 1x Diamantaxt, " +
            "1x Diamantschaufel, 5x Diamanten, 64x Holz, 64x Steak, " +
            "64x Erde, 64x Stein und 64x Pfeile."
        );

        return;
    }

if (interaction.commandName === "opcup") {

    const cooldown = (1 * 24 * 60 * 60 * 1000) + (16 * 60 * 60 * 1000) + (2 * 60 * 1000);
    const ende = Date.now() + cooldown;
    const timestamp = Math.floor(ende / 1000);

    await interaction.reply(
        "🏆 **CP CUP 10**\n\n" +
        "🏆 **Der CP CUP 10**\n" +
        "Am Sonntag ab 15 Uhr geht der OP Cup in die ZEHNTE Runde, live auf Twitch mit Phil! Und weil es der zehnte OP Cup ist, wird richtig eskaliert:\n" +
        "\n"+
        "💸 XXL Money Drop\n" +
        "⚡ Creator Wars\n" +
        "🪙 Bares für OP Items\n" +
        "⬆️ Accounts upgraden\n" +
        "🏠 Verlosung von 2 Villen mit Spielständen\n" +
        "💥 Community Grief mit 1.800€ in Shopgutscheinen als Hauptgewinn und vieles mehr!\n" +
        "\n" +
        "Seid pünktlich, um einen Nachmittag voller Überraschungen, Wow-Momenten und mehr zu erleben.\n" +
        "\n" +
        "**Wann:** Sonntag, 16. Juni 2024, ab 15 Uhr(<t:${timestamp}:R>)\n" +
        "**Wo:** Live auf Twitch\n" +
        "📺 Twitch: https://twitch.tv/opphorx\n" +
        "\n" +
        "Unsere Empfehlung: Seit pünktlich da, um euch ein platzt auf dem server zu sichern!\n" +
        "\n" +
        `⏳ Cooldown: <t:1788094833:R>`
    );

    return;
}
});

async function startBot() {

    if (!TOKEN) {
        console.log("TOKEN fehlt.");
        return;
    }

    try {
        await registerCommands();
        await client.login(TOKEN);
    } catch (error) {
        console.error(error);
    }
}

startBot();     
