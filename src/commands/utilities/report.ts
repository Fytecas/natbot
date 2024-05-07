import { AuditLogEvent, EmbedBuilder, SlashCommandBuilder, User } from "discord.js"
import { client } from "../.."

module.exports = {
    data: new SlashCommandBuilder()
        .setName("report")
        .addUserOption(option =>
			option
				.setName('pseudo')
                .setRequired(true)
				.setDescription('La personne concernée')
                )
        .setDescription("Reporter une personne ( comportement sanctionnable en cas d'abus )"),
    async execute(interaction) {
        const target: User = interaction.options.getUser('pseudo');
        const fetchedLogs = await interaction.guild.fetchAuditLogs({
            type: AuditLogEvent.InviteCreate,
            user: target, 
            limit: 100,
        });

        console.log(fetchedLogs);
        
        const embed = new EmbedBuilder()
            .setTitle(`à été signalé sur le canal ${interaction.channel}`)
            .setColor("Red")
            .setAuthor({name: target.globalName, iconURL: target.avatarURL()})
        
        await interaction.guild.channels.cache.get('1210659094621585448').send({content: `Nouveau signalement par ${interaction.user}`, embeds: [embed]})

        await interaction.reply({content: `L'utilisateur ${target} à bien été reporté.`, ephemeral:true})
    },
}