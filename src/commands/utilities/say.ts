import { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, PermissionFlagsBits } from "discord.js"

module.exports = {
    data: new SlashCommandBuilder()
        .setName("say")
        .setDescription("Faire Dire quelque chose au bot")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(option =>
			option
				.setName('message')
                .setRequired(true)
				.setDescription('Le message')),

    async execute(interaction) {
        const message = interaction.options.getString('message');

        await interaction.channel.send({
			content: message,
		});

        await interaction.reply({
            content: "C'est fait !",
            ephemeral: true
        })
    },
}