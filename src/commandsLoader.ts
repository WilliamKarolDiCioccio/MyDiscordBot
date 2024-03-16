const fs = require('node:fs');
const path = require('node:path');

const commands: any = [];

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);
console.log(commandFolders);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter((file: any) => file.endsWith('.ts'));
  
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
    console.log(filePath);
		const command = require(filePath);
		if ('name' in command && 'description' in command && 'execute' in command) {
			commands.push(command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

export default commands;
