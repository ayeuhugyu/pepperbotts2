import fs from "fs"
import * as log from "../lib/log.js"
import toml from "toml"

const config = toml.parse(fs.readFileSync("config.toml", "utf-8"))

export default {
    name: "messageDelete",
    async execute(message) {
        if (config.log_deleted_messages) {
            const author = message.author
            const authorUsername = author.username
            const content = message.content

            if (!author || !content || !authorUsername || !message) {
                log.error(
                    "required parameter for messageDelete event is null or undefined"
                )
                return
            }

            log.info(`FROM: ${authorUsername} (${author}) CONTENT: ${content}`)
        }
    }
}
