import * as action from "../lib/discord_action.js"
import { Collection } from "discord.js"
import default_embed from "../lib/default_embed.js";
import * as textfiles from  "../lib/files.js"
import fs from "fs"
import toml from "toml"

const config = toml.parse(fs.readFileSync("config.toml", "utf-8"))

function getArguments(message) {
    const args = new Collection()
    args.set("image", message.content.slice(config.prefix.length + 3))

    return args
}

export default {
    data: {
        name: "vileimagery",
        description: "return some fucked up shit",
        arguments: [
            {
                name: "image",
                description: "image to return",
                required: true,
                type: "string"
            }
        ]
    },
    execute: async function (message, args) {
        if (!args) {
            args = getArguments(message)
        }
        const files = fs.readdirSync(config.commands.vile_imagery_path).filter((file) => file.endsWith(".png"));
        let file

        if (args.get("image")) { // if they specify an image

            const proposedfilename = args.get("image")
            if (proposedfilename.replaceAll(" ", "") == "ls") {
                const lsText = await textfiles.generateLSText(`${config.commands.vile_imagery_path}`)
                const lsFile = textfiles.textToFile(lsText, "vileimageryls")
                action.reply(message, {files: [
                    {
                        attachment: lsFile,
                        name: "vileimageryls.txt",
                    },
                ]})
                return
            }
            let possibleFilenames = {
                regular: proposedfilename,
                spaced: proposedfilename.replaceAll(" ", "_"),
                spacedPng: proposedfilename.replaceAll(" ", "_") + ".png",
                png: proposedfilename + ".png",
            };
            for (const value of Object.values(possibleFilenames)) {
                if (files.includes(value)) {
                    file = value;
                }
            } // basically just autocorrect
        }
        const embed = default_embed()
        if (file) { // if the file they wanted exists
            embed.setTitle(file.replaceAll("_", " ").replaceAll(".png", ""));
            embed.setImage(`attachment://${file}`)
            action.reply(message, { embeds: [embed], files: [`${config.commands.vile_imagery_path}/${file}`] })
        } else {
            const maxRan = files.length;
            const randomnum = Math.floor(Math.random() * maxRan);
            file = files[randomnum];
            if (args.get("image").replaceAll(" ", "") == "") { // if they didn't specify an image (i don't trust previous thing)
                embed.setTitle(file.replaceAll("_", " ").replaceAll(".png", ""));
                embed.setImage(`attachment://${file}`)
                action.reply(message, { embeds: [embed], files: [`${config.commands.vile_imagery_path}/${file}`] })
            } else {
                embed.setTitle(file.replaceAll("_", " ").replaceAll(".png", ""));
                embed.setDescription("There's no such thing!")
                embed.setImage(`attachment://${file}`)
                action.reply(message, { embeds: [embed], files: [`${config.commands.vile_imagery_path}/${file}`] })
            }
        }
    }
}
