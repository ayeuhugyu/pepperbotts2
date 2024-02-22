import { Events, Message, Collection, Client } from "discord.js"
import * as fs from "fs"
import toml from "toml"
import * as log from "../lib/log"

const config = toml.parse(fs.readFileSync("config.toml", "utf-8"))

async function invalidCommand(command: string, message: Message) {
    message.reply(`invalid command: ${command}, baffoon!`) 
    log.warn(`invalid command: ${command}`)
    return
}

async function commandError(command: string, message: Message, err: Error) {
    message.reply(`command error with command: ${command}`)
    log.error(err)
    return
}

async function getCommands() {
    const commands = new Collection()

    const commandFiles = fs
        .readdirSync(config.events.commands_path)
        .filter((file) => file.endsWith(".ts"))
    for (const file of commandFiles) {
        const command = await import(`../commands/${file}`)
        commands.set(command.default.data.name, command.default.execute) // although yes it would probably be more efficient to not include this inside the function so it only runs once, doing it this way makes it so i don't have to restart the bot every time i add a new command
    }
    if (!commands) {
        log.error("no commands found")
        return
    }

    return commands
}

export default  {
    name: Events.MessageCreate,
    async execute(message: Message, client: Client) {
        const messageContent: string = message.content

        if (!messageContent.startsWith(config.prefix)) return // return if not a command

        const commandcased: string = messageContent // this is just the substring between the prefix and the first space lowercased
            .slice(config.prefix.length)
            .split(/ +/)
            .shift() || ''
        const command = commandcased.toLowerCase()
        
        if (command == '') {
            log.error("no command found in message")
            return
        } // return if command == '' (probably caused by entering just the prefix)

        const commands: Collection<string, Function> = await getCommands() as Collection<string, Function>

        if (!commands.has(command)) {
            invalidCommand(command, message)
            return
        }
        try {
            const commandFn = commands.get(command)
            if (commandFn) {
                commandFn(message, client)
            }
        } catch (err: any) {
            commandError(command, message, err)
            return
        }
        log.debug(`command received: ${command} from: ${message.author.username} (${message.author})`)
    }
}