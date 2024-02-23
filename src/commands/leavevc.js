import * as action from "../lib/discord_action.js"
import * as voice from "../lib/voice.js"

export default {
    data: {
        name: "leavevc",
        description: "leave a vc"
    },
    execute: async function (message, args) {
        if (voice.getVoiceConnection(message.guild.id)) {
            const connection = await voice.getVoiceConnection(message.guild.id);
            voice.destroyVoiceConnection(connection)
            action.reply(
                message,
                `left voice channel <#${connection.joinConfig.channelId}>`
            );
        } else {
            action.reply(message, "im not connected to a voice channel here mf");
        }
    }
}