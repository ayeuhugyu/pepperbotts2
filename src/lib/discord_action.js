import discord, { ApplicationCommandOptionWithChoicesAndAutocompleteMixin } from "discord.js"
import { client } from "../index.js"
import * as log from "./log.js"

export async function sendMessage(channel, content) {
    if (typeof channel === "string") {
        channel = channel.toString()
    }
    if (!(channel instanceof discord.TextChannel)) {
        channel = await (client.channels.fetch(channel.toString()))
    }
    try {
        channel.sendTyping()
        const sent = await channel.send(content)
        return sent
    } catch (err) {
        log.error(err)
    }
}

export async function reply(message, content) {
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

export async function sendDM(user, content) {
    try {
        const usersCache = client.users.cache
        if (typeof user === "number") {
            user = user.toString()
        }
        if (typeof user === "string") {
            user = usersCache.get(user)
        }

        const msg = await user.send(content)
        return msg
    } catch (err) {
        log.error(err)
    }
}

export async function deleteMessage(message) {
    try {
        message.delete()
    } catch (err) {
        log.error(err)
    }
}

export async function editMessage(message, content) {
    try {
        message.channel.sendTyping()
        const sent = message.edit(content)
        return sent
    } catch (err) {
        log.error(err)
    }
}