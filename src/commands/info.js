import prettyBytes from "pretty-bytes"
import default_embed from "../lib/default_embed.js"
import * as action from "../lib/discord_action.js"

async function convertMilisecondsToReadable(time) {
    let string = ""
    string = `${time} milliseconds`
    if (time > 1000) {
        time = time/1000
        string = `${time} seconds`
    } 
    if (time > 60) {
        time = time/60
        string = `${time} minutes`
    } 
    if (time > 60) {
        time = time/60
        string = `${time} hours`
    } 
    if (time > 24) {
        time = time/24
        string = `${time} days`
    }
    return string
}

export default {
    data: {
        name: "info",
        description: "returns info about current bot instance"
    },
    execute: async (message) => {
        const memory = process.memoryUsage()

        const embed = default_embed()
            .setTitle("pepperbot info")
            .addFields(
                {
                    name: "servers",
                    value: `${message.client.guilds.cache.size}`
                },
                {
                    name: "system info",
                    value: `${process.platform} ${process.arch}`
                },
                { name: "n*de version (🤢)", value: process.version },
                {
                    name: "memory usage",
                    value: `${prettyBytes(
                        memory.rss
                    )} memory usage, ${prettyBytes(
                        memory.heapUsed
                    )} / ${prettyBytes(memory.heapTotal)} heap usage`
                },
                { name: "uptime", value: `${await convertMilisecondsToReadable(message.client.uptime)}` }
            )

        await action.reply(message, {
            embeds: [embed]
        })
    }
}
