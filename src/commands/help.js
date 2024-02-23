import * as action from "../lib/discord_action.js";
import { Collection } from "discord.js";
import default_embed from "../lib/default_embed.js";
import fs from "fs";
import toml from "toml";

const config = toml.parse(fs.readFileSync("config.toml", "utf-8"));

function getArguments(message) {
    const args = new Collection();
    args.set("command", message.content.slice(config.prefix.length + 4));

    return args;
}

export default {
    data: {
        name: "help",
        description:
            "lists commands, if given a command name it will return info about that command",
        arguments: [
            {
                name: "command",
                description: "command to get info about",
                required: false,
                type: "string"
            }
        ]
    },
    execute: async function (message, args) {
        const embed = default_embed();
        if (!args) {
            args = getArguments(message);
        }
        if (args.get("command")) {
            // reply with command info
            const commandFiles = fs
                .readdirSync("src/commands/")
                .filter((file) => file.endsWith(".js"));
            let commandString = args.get("command");
            if (commandString.startsWith(config.prefix)) {
                args.set("command", commandString.slice(config.prefix.length));
                commandString = args.get("command");
            }
            args.set("command", commandString.replace(" ", ""));
            embed.setTitle(args.get("command"));
            if (commandFiles.includes(`${args.get("command")}.js`)) {
                const command = await import(`./${args.get("command")}.js`);
                embed.setDescription(command.default.data.description);
                if (command.default.data.arguments) {
                    command.default.data.arguments.forEach((argument) => {
                        const text = `
                        ${argument.description}
                        REQUIRED: ${argument.required}
                        TYPE: ${argument.type}
                        `;
                        embed.addFields({
                            name: argument.name,
                            value: text
                        });
                    });
                }
            }
        } else {
            // reply with command list
            let text = "";
            embed.setTitle("Commands");

            const commandFiles = fs
                .readdirSync("src/commands/")
                .filter((file) => file.endsWith(".js"));
            for (const file of commandFiles) {
                const command = await import(`./${file}`);
                text += `p/${command.default.data.name}\n`;
            }
            embed.setDescription(text);
        }

        action.reply(message, { embeds: [embed] });
    }
};
