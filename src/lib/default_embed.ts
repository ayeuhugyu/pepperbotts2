import { EmbedBuilder } from "discord.js"

export default function() {
    const embed = new EmbedBuilder()
    embed.setColor(0xff0000)
    embed.setThumbnail(
        "https://cdn.discordapp.com/attachments/755150633191080073/1149152214850469908/Map_Icon.png"
    )
    embed.setFooter({ text: "Copyright PepperBot Inc. 2024", iconURL: "https://cdn.discordapp.com/attachments/755150633191080073/1149152214850469908/Map_Icon.png"})
    embed.setAuthor({ name: "PepperBot", iconURL: "https://cdn.discordapp.com/attachments/755150633191080073/1149152214850469908/Map_Icon.png"})
    return embed
}
