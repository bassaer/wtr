import { Command } from "commander";

export class Config {
    private path: string | undefined;
    private verbose: boolean;
    private city: string | undefined;
    private time: Date | undefined;
    constructor(program: Command) {
        this.path = program.path;
        this.verbose = program.verbose;
        this.city = program.city;
        this.time = program.time;
    }
}
