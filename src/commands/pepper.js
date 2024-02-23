import * as action from "../lib/discord_action.js"
import default_embed from "../lib/default_embed.js";
import fs from "fs"
import toml from "toml"

const config = toml.parse(fs.readFileSync("config.toml", "utf-8"))

export default {
    data: {
        name: "pepper",
        description: "return some phenomenons"
    },
    execute: async function (message) {
        const files = fs.readdirSync(config.commands.pepper_path).filter((file) => file.endsWith(".png"));
        const maxRan = files.length;
        const randomnum = Math.floor(Math.random() * maxRan);
        const file = files[randomnum];
        const embed = default_embed()
        embed.setImage(`attachment://${file}`)
        embed.setTitle("🌶🌶🌶 RANDOM PEPPER!!!!!!!! 🌶🌶🌶")
        
        action.reply(message, { embeds: [embed], files: [`${config.commands.pepper_path}/${file}`] })
    }
}
