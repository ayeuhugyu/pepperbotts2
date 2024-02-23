import * as action from "../lib/discord_action.js"
import { Collection } from "discord.js"
import fs from "fs"
import toml from "toml"

const config = toml.parse(fs.readFileSync("config.toml", "utf-8"))

function getArguments(message) {
    const args = new Collection()
    args.set("message", message.content.slice(config.prefix.length + 3))

    return args
}

export default {
    data: {
        name: "say",
        description: "make the bot say something",
        arguments: [
            {
                name: "message",
                description: "what to say",
                required: true,
                type: "string"
            }
        ]
    },
    execute: async function (message, args) {
        if (!args) {
            args = getArguments(message)
        }
        if (args.get("message")) {
            action.sendMessage(message.channelId, args.get("message"))
            action.deleteMessage(message)
        } else {
            action.reply(message, "provide a message to say you baffoon!")
        }
    }
}
