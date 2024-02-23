import { getVoiceConnection } from "@discordjs/voice"
import * as log from "../lib/log.js"

export default {
    name: "voiceStateUpdate",
    async execute(oldState, newState, client) {
        const oldChannel = oldState.channel
        const newChannel = newState.channel
        const guild = oldState.guild

        if (oldChannel == null) {
            log.info("oldChannel is null")
            return
        }
        
        const connection = getVoiceConnection(guild.id)
        if (!connection) {
            log.error("voice connection event fired without guild")
            return
        }
        const joinConfig = connection.joinConfig
        if (!joinConfig) {
            log.error("joinConfig is null")
            return
        }
        if (oldChannel.id == joinConfig.channelId) { // i believe this checks if someone joined a channel?
            if (newChannel !== undefined) { // and then this checks if it was them leaving
                if ( // this checks if there is only one person in the channel (gets the channel from cache, gets the members in the channel, gets the size of it)
                    guild.members.cache.filter( 
                        (member) =>
                        member.voice.channelId === connection.joinConfig.channelId
                    ).size <= 1
                ) {
                    connection.destroy() 
                    const debugchannel = client.channels.cache.get("1148814162273763418") // this will always be a text channel, but i can't figure out how the fuck to make it work
                    if (!debugchannel) {
                        log.error("debugchannel is null")
                        return
                    }
                    debugchannel.send(`left <#${connection.joinConfig.channelId}> due to nobody being in it`)
                }
            }
        }
    }
}