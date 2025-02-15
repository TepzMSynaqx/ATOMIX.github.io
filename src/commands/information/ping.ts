export default {
	name: "ping",
	description: "Get the ping of the bot.",
	category: "information",
	run: async ({ client, interaction }: ICommandOptions) => {
		await interaction.reply({
			embeds: [
				{
					color: 0x0099FFFF,
					description: `ping TEST \`${client.ws.ping}ms\``,
				},
			],
		});
	},
} as ICommand;
