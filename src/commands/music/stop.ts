export default {
	name: "stop",
	description: "Stop current song.",
	category: "music",
	run: async ({ client, interaction }: ICommandOptions) => {
		const player = client.manager.players.get(interaction.guildId!);
		if (!player || !player?.queue?.current) {
			return await interaction.reply({
				embeds: [
					{
						color: 0x0099FFFF,
						description: "No music playing in this server!",
					},
				],
			});
		}

		player.destroy();
		return await interaction.reply({
			embeds: [
				{
					color: 0x0099FFFF,
					description: "Stopped!",
				},
			],
		});
	},
} as ICommand;
