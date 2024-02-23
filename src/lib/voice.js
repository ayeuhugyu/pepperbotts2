import * as voice from "@discordjs/voice";


export async function joinVoiceChannel(channel) {
    let connection = await voice.joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
    });
    return connection
}

export async function leaveVoiceChannel(connection) {
    connection.destroy();
}

export async function createAudioResource(path) {
    const resource = voice.createAudioResource(path, {
        inlineVolume: true,
    });
    return resource
}

export async function createAudioPlayer() {
    const player = voice.createAudioPlayer();
    return player
}

export async function getVoiceConnection(guildId) {
    const player = voice.getVoiceConnection(guildId)
    return player
}

export async function playResource(resource, player) {
    player.play(resource)
}

export async function pauseAudioPlayer(player) {
    player.pause()
}

export async function resumeAudioPlayer(player) {
    player.unpause()
}

export async function stopAudioPlayer(player) {
    player.stop()
}

export async function setVolume(player, volume) {
    player.setVolume(volume)
}

export async function destroyVoiceConnection(connection) {
    connection.destroy()
}

