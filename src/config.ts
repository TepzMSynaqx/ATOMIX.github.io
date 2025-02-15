import type { NodeOptions } from "sakulink";

export const token: string = "MTMzOTk2NTQ0ODc3MDU1NTk0NQ.G4V7dr.xoqG4FrhA2yLYaSdMIxHI016AprhvBKFOLn8G0";
export const nodes: NodeOptions[] = [
	{
		identifier: "OTARI TH",
		host: "lavalink.jirayu.net",
		password: "youshallnotpass",
		port: 13592,
		secure: false,
	},
	{
		identifier: "OTARI EN",
		host: "lavalink.jirayu.net",
		password: "youshallnotpass",
		port: 2334,
		secure: false,
		version: "v3",
		search: true,
		playback: true,
	  }
];
