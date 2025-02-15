export default {
	name: "goobert-website",
	description: "Get the Goobert website link!",
	category: "information",
	run: async ({ interaction }: ICommandOptions) => {
		await interaction.reply({
			embeds: [
				{
					color: 0x0099FF,
					title: "Goobert Website",
					description: "Click the link below to visit the Goobert website!",
					url: "https://ibb.co/KjLgVxqR",
					image: {
						url: "https://ibb.co/KjLgVxqR",
					},
				},
			],
		});
	},
} as ICommand;
