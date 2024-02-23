import * as action from "../lib/discord_action.js"
import { Collection } from "discord.js"
import * as voice from "../lib/voice.js"

function getArguments(message) {
    const args = new Collection()
    if (message.mentions.channels.first()) {
        args.set("channel", message.mentions.users.first())
    } else {
        if (message.member.voice.channel) {
            args.set("channel", message.member.voice.channel)
        }
    }
    return args
}

export default {
    data: {
        name: "joinvc",
        description: "join a vc",
        arguments: [
            {
                name: "channel",
                description: "channel to join",
                required: false,
                type: "channel"
            }
        ]
    },
    execute: async function (message, args) {
        if (!args) {
            args = getArguments(message)
        }
        if (args.get("channel")) {
            voice.joinVoiceChannel(args.get("channel"))
            action.reply(message, `joined <#${args.get("channel").id}>`)
        } else {
            action.reply(message, "specify or join a channel, you baffoon!")
        }
    }
}
