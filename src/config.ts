import type { NodeOptions } from "sakulink";

export const token: string = "MTMzOTk2NTQ0ODc3MDU1NTk0NQ.GwB0dS.IgLTp1wh-Oj_Ax9Vsg48thRGWTjB4sfroUBpKc";
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
