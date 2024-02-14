import { Client, Collection, Events, GatewayIntentBits, SlashCommandBuilder } from "discord.js";
import tokens from "../tokens.json"
import { commands_collection, register_commands } from "./CommandsManager";

export const client = new Client({ intents: [GatewayIntentBits.Guilds] })

let commands: commands_collection

client.once(Events.ClientReady, async readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`)
})

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return
    const command = commands.get(interaction.commandName)

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`)
        return
    }

    try {
        await command.execute(interaction)
    } catch (error) {
        console.error(error)
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: "There was an error while executing this command!", ephemeral: true })
        } else {
            await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true })
        }
    }
})

register_commands().then((c) =>{
    commands = c
    client.login(tokens.token)
})

