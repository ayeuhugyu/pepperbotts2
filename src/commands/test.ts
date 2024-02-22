import * as action from "../lib/discord_action"
import { Message, EmbedBuilder } from "discord.js"
import default_embed from "../lib/default_embed"

export default {
    data: {
        name: "test",
        description: "test command"
    },
    execute: async function (message: Message) {
        action.sendMessage(message.channelId, "channel send test")
        const msg = await action.sendMessage(message.channelId, "delete message test") as Message
        action.deleteMessage(msg)
        const embed: EmbedBuilder = default_embed()
        embed.setTitle("EMBED TITLE")
        embed.setDescription("EMBED DESCRIPTION")
        action.reply(message, { embeds: [embed] })
        action.reply(
            message,
            "discord action script test completed without errors"
        )
    }
}
