import { Client, Collection } from "discord.js";
import { Manager, Player, type Payload, type WebSocketClosedEvent } from "sakulink";
import { nodes, token } from "../config";
import { join } from "path";
import { readdirSync, Stats, statSync } from "fs";

export class SakulinkClient extends Client {
    public readonly commands = new Collection<string, ICommand>();
    public readonly manager = new Manager({
        nodes: nodes,
        defaultSearchPlatform: "youtube music",
        send: (guild: string, payload: Payload) => this.guilds.cache.get(guild)!.shard.send(payload),
    });

    public constructor() {
        super({
            intents: 129,
        });
    }

    private async loadEvents(): Promise<void> {
        const eventsPath = join(__dirname, "..", "events");
        const eventFiles = readdirSync(eventsPath).filter(file => 
            (file.endsWith('.ts') || file.endsWith('.js')) && 
            !file.includes('.d.ts') && 
            !file.includes('.js.map')
        );

        for (const file of eventFiles) {
            const filePath = join(eventsPath, file);
            const { event } = await import(filePath);

            if (event) {
                console.log(`Event loaded ${event.name}`);
                this.on(event.name, event.run.bind(null, this));
                delete require.cache[require.resolve(filePath)];
            }
        }
    }

    private async loadPlayers(): Promise<void> {
        const playersPath = join(__dirname, "..", "players");
        const playerFiles = readdirSync(playersPath).filter(file => 
            (file.endsWith('.ts') || file.endsWith('.js')) && 
            !file.includes('.d.ts') && 
            !file.includes('.js.map')
        );

        for (const file of playerFiles) {
            const filePath = join(playersPath, file);
            const { event } = await import(filePath);

            if (event) {
                console.log(`Player event loaded ${event.name}`);
                this.manager.on(event.name, (player: Player, payload: WebSocketClosedEvent) => 
                    event.run(player, payload)
                );
                delete require.cache[require.resolve(filePath)];
            }
        }
    }

    private async loadCommands(): Promise<void> {
        const commands: ICommand[] = [];

        const readCommandsRecursive = async (directory: string): Promise<void> => {
            const items = readdirSync(directory);

            for (const item of items) {
                const fullPath = join(directory, item);
                const stats: Stats = statSync(fullPath);

                if (stats.isDirectory()) {
                    // Recursively process subdirectories
                    await readCommandsRecursive(fullPath);
                } else if (
                    (item.endsWith('.ts') || item.endsWith('.js')) && 
                    !item.includes('.d.ts') && 
                    !item.includes('.js.map')
                ) {
                    try {
                        const importedCommand = await import(fullPath);
                        const command = importedCommand?.default as ICommand;

                        if (command?.name) {
                            this.commands.set(command.name, command);
                            commands.push(command);
                            console.log(`Command loaded: ${command.name} from ${fullPath}`);
                        }

                        delete require.cache[require.resolve(fullPath)];
                    } catch (error) {
                        console.error(`Error loading command from ${fullPath}:`, error);
                    }
                }
            }
        };

        // Start the recursive command loading from the base commands directory
        await readCommandsRecursive(join(__dirname, "..", "commands"));

        // Register commands when client is ready
        this.on("ready", async () => {
            if (this.application && commands.length > 0) {
                await this.application.commands.set(commands);
                console.log(`Registered ${commands.length} application commands`);
                this.manager.init(this.user?.id);
            }
        });
    }

    private antiCrash(): void {
        process.on("unhandledRejection", (reason, promise) => {
            console.log("Unhandled Rejection at:", promise, "reason:", reason);
        });

        process.on("uncaughtException", (error) => {
            console.log("Uncaught Exception:", error);
        });
    }

    public async init(t?: string): Promise<void> {
        try {
            await this.login(t ?? token);
            await this.loadEvents();
            await this.loadCommands();
            await this.loadPlayers();
            this.antiCrash();
            console.log('Client initialized successfully');
        } catch (error) {
            console.error('Error initializing client:', error);
            process.exit(1);
        }
    }
}