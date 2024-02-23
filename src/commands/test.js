import * as action from "../lib/discord_action.js"
import default_embed from "../lib/default_embed.js"

export default {
    data: {
        name: "test",
        description: "test command"
    },
    execute: async function (message) {
        action.sendMessage(message.channelId, "channel send test")
        const msg = await action.sendMessage(message.channelId, "delete message test")
        action.deleteMessage(msg)
        const embed = default_embed()
        embed.setTitle("EMBED TITLE")
        embed.setDescription("EMBED DESCRIPTION")
        action.reply(message, { embeds: [embed] })
        action.reply(
            message,
            "discord action script test completed without errors"
        )
    }
}
