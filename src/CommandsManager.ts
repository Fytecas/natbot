import { Collection, REST, Routes, SlashCommandBuilder } from "discord.js";
import * as fs from "fs";
import * as path from "path";
import { token } from "../tokens.json";

export type commands_collection = Collection<
  string,
  { data: SlashCommandBuilder; execute: (any) => any }
>;

export async function register_commands(): Promise<commands_collection> {
  // List commands
  let commands: commands_collection = new Collection();

  const foldersPath = path.join(__dirname, "commands");
  const commandFolders = fs.readdirSync(foldersPath);

  for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs
      .readdirSync(commandsPath)
      .filter((file) => file.endsWith(".ts"));
    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const command = require(filePath);
      if ("data" in command && "execute" in command) {
        commands.set(command.data.name, command);
      } else {
        console.log(
          `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
        );
      }
    }
  }

  // Deploy commands
  await deploy_commands(commands)

  return commands;
}

async function deploy_commands(commands: commands_collection) {
  // Construct and prepare an instance of the REST module
  const rest = new REST({ version: "10" }).setToken(token);

  //await rest.put(Routes.applicationCommands(clientId), { body: [] });
  //console.log("Successfully deleted all application commands.");

  let commands_array = [];

  commands.each((v) => {
    commands_array.push(v.data.toJSON());
  });

  // Deploy !

  try {
    console.log(
      `Started refreshing ${commands.size} application (/) commands.`
    );

    // The put method is used to fully refresh all commands in the guild with the current set
    const response: any = await rest.put(`/applications/${clientId}/commands`, {
      body: commands_array,
    });

    console.log(
      `Successfully reloaded ${response.length} application (/) commands.`
    );
  } catch (error) {
    console.error(error);
  }
}
