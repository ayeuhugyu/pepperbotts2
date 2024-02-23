import dotenv from "dotenv"
dotenv.config()

import { Client, GatewayIntentBits, Events, Partials, TextChannel } from "discord.js"
import * as log from "./lib/log.js"
import prettyBytes from "pretty-bytes"
import fs from "fs"
import toml from "toml"

const config = toml.parse(fs.readFileSync("config.toml", "utf-8"))

export const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildVoiceStates
    ],
    partials: [Partials.Message, Partials.Channel]
})

async function init() {
    log.debug("initializing bot...")
    log.debug("logging into discord...")

    try {
        
        await client.login(process.env["DISCORD_TOKEN"])
        
    } catch (err) {
        log.error("failed to login into discord. wifi down? token invalid?")
        log.error(err)
        process.exit(1)
    }
}

// wtf is this
const eventFiles = fs.readdirSync(config.events.events_path).filter((file) => file.endsWith(".js"))
for (const file of eventFiles) {
    (async () => {
        const event = await import(`./events/${file}`)
        client.on(event.default.name, event.default.execute)
    })()
}

client.on(Events.ClientReady, async () => {
    log.info("bot online")

    const channel = await client.channels.cache.get("1148814162273763418")
    if (channel) {
        channel.send("its pepper time 🌶 <@&1210034891018993755>")
    } else {
        log.error("no channel")
    }

    log.debug("loading commands...")

    log.info("bot ready to serve")
    log.debug(`running on ${process.platform} ${process.arch}`)
    const memory = process.memoryUsage()
    log.debug(`${prettyBytes(memory.rss)} memory usage, ${prettyBytes(memory.heapUsed)} / ${prettyBytes(memory.heapTotal)} heap usage`)
})

/*process.on("uncaughtException", (err) => {
    log.error("uncaught exception")
    log.error(err)
})*/

process.on("exit", () => {
    log.info("exiting pepperbot")
})

init()