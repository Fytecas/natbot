import { SlashCommandBuilder } from "discord.js"
import { client } from "../.."

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Renvoie Pong!"),
    async execute(interaction) {
        await interaction.reply(`Pong ! La latence est de ${Math.round(client.ws.ping)}ms`)
    },
}