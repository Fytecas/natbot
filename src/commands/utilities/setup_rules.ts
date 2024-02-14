import { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, PermissionFlagsBits, ComponentType } from "discord.js"

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setuprules")
        .setDescription("Met en place les règles")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        
        const confirm = new ButtonBuilder()
            .setCustomId('confirm')
            .setLabel("Continuer")
            .setStyle(ButtonStyle.Success)

        const row = new ActionRowBuilder()
            .addComponents(confirm)

        const response = await interaction.channel.send({
			content: `En continuant, vous vous engagez à respecter le règlement ci-dessus. `,
			components: [row],
		});

        await interaction.reply({
            content: "Les règles ont été mises en place",
            ephemeral: true
        })

        const collector = response.createMessageComponentCollector({ componentType: ComponentType.Button})


        collector.on("collect", async i => {
            if (!i.member.roles.cache.has('1184801643838058556')) {
                    i.member.roles.add('1184801643838058556');
                    await i.reply({ content: `Bienvenue sur le serveur ! :smiley: `, components: [], ephemeral: true });
                } else {
                    await i.reply({ content: `Tu as déjà accepté le règlement non ? `, components: [], ephemeral: true });
            }
        })
    },
}