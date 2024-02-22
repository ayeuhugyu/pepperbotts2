import discord from "discord.js"
import { client } from "../index.js"
import * as log from "../lib/log"

export async function sendMessage(channel: discord.TextChannel | number | string, content) {
    if (typeof channel === "string") {
        channel = channel.toString()
    }
    if (!(channel instanceof discord.TextChannel)) {
        channel = await (client.channels.fetch(channel.toString()) as Promise<discord.TextChannel>)
    }
    try {
        channel.sendTyping()
        const sent = await channel.send(content)
        return sent
    } catch (err) {
        log.error(err)
    }
}

export async function reply(message: discord.Message | discord.CommandInteraction, content) {
    try {
        if (message.channel == null) {
            return
        }
        message.channel.sendTyping()
        const sent = await message.reply(content)
        return sent
    } catch (err) {
        log.error(err)
    }
}

export async function deleteMessage(message: discord.Message) {
    try {
        message.delete()
    } catch (err) {
        log.error(err)
    }
}

export async function editMessage(message: discord.Message, content) {
    try {
        message.channel.sendTyping()
        const sent = message.edit(content)
        return sent
    } catch (err) {
        log.error(err)
    }
}