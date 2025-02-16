import fetch from 'node-fetch';

export default {
    name: "advice",
    description: "Get a piece of AI-generated advice!",
    category: "Server",
    run: async ({ interaction }: ICommandOptions) => {
        try {
            const response = await fetch("https://api.adviceslip.com/advice");
            const data = await response.json() as { slip: { advice: string } };
            const advice = data.slip.advice;

            const embed = {
                color: 0x00ff99,
                title: "💡 Advice",
                description: `📢 **${advice}**` ,
                footer: {
                    text: "goobert",
                    icon_url: "https://yourboticonurl.com",
                },
            };

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            await interaction.reply({ content: "⚠️ Failed to fetch advice. Please try again later!", ephemeral: true });
        }
    },
} as ICommand;