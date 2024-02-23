import * as action from "../lib/discord_action.js"
import { Collection } from "discord.js"
import fs from "fs"
import toml from "toml"

const config = toml.parse(fs.readFileSync("config.toml", "utf-8"))

function getArguments(message) {
    const args = new Collection()
    if (message.mentions.users.first()) {
        args.set("user", message.mentions.users.first())
    } else {
        args.set("user", message.content.split(" ")[1])
    }
    args.set("message", message.content.slice(config.prefix.length + 6 + args.get("user").toString().length + 1))
    return args
}

export default {
    data: {
        name: "dmuser",
        description: "make the bot dm someone",
        arguments: [
            {
                name: "user",
                description: "who to dm",
                required: true,
                type: "user | number"
            },
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
        if (args.get("user")) {
            if (args.get("message")) {
                action.sendDM(args.get("user"), args.get("message"))
                action.deleteMessage(message)
            } else {
                action.reply(message, "provide a valid message you baffoon!")
            }
        } else {
            action.reply(message, "provide a valid user to dm you baffoon!")
        }
    }
}
