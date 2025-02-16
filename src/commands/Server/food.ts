import { join } from "path";

export default {
    name: "food-goobert",
    description: "Shows a yummy GIF!",
    category: "Server",
    run: async ({ interaction }: ICommandOptions) => {
        const gifPath = join(__dirname, "../website/image/cat-eat.gif");

        const embed = {
            color: 0xff9900,
            title: "🍔 Yummy!",
            image: {
                url: "attachment://food-goobert.gif"
            }
        };

        await interaction.reply({
            embeds: [embed],
            files: [{ attachment: gifPath, name: "food-goobert.gif" }]
        });
    }
} as ICommand;
