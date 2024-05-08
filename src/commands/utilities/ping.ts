import { SlashCommandBuilder, EmbedBuilder } from "discord.js"
import { client } from "../.."

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Renvoie Pong!"),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor("#0099ff")
            .setTitle("Pong!")
            .setDescription(`La latence est de ${Math.round(client.ws.ping)}ms`);

        await interaction.reply({ embeds: [embed] });
    },
}