export default {
	name: "atom",
	description: "message from dev",
	category: "information",
	run: async ({ client, interaction }: ICommandOptions) => {
		await interaction.reply({
			embeds: [
				{
					color: 0x0099FFFF,
					description: `สวัสดีครับทุกคน ผมชื่ออะตอมผู้พัฒนาบอทนี้ อยากบอกทุกคนว่าขอบคุณทุกคนมากครับ ที่ใช้บอทผมยินนดีมากๆครับ และจะมีการเพิ่มฟังค์ชั่นเพิ่มภายในเดือนกุมภาพันธ์นี้`,
				},
			],
		});
	},
} as ICommand;
