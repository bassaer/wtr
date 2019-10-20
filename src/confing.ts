import { Command } from "commander";
import fs from "fs";
import os from "os";

export class Config {
    public appId: string | undefined;
    public path: string | undefined;
    public verbose: boolean;
    public city: string | undefined;
    public fileConf: any;

    constructor(program: Command) {
        this.fileConf = this.readFromFile(program.path);
        this.path = this.fileConf.hasOwnProperty("path") ? this.fileConf.path : program.path;
        this.verbose = this.fileConf.hasOwnProperty("verbose") ? this.fileConf.verbose : program.verbose;
        this.appId = this.fileConf.hasOwnProperty("appId") ? this.fileConf.appId : program.apiKey;
        this.city = this.fileConf.hasOwnProperty("city") ? this.fileConf.city : program.city;
    }

    public getQsObject() {
        const obj = {
            ...this.fileConf,
            cnt: 1,
        };
        if (this.appId) {
            obj.APPID = this.appId;
        }
        if (this.city) {
            obj.q = this.city;
        }
        return obj;
    }

    private readFromFile(path: string | undefined): any {
        const home = os.homedir();
        const confPath = path ? path : `${home}/.wtr/config.json`;
        try {
            const file = fs.readFileSync(confPath, "utf8");
            return JSON.parse(file);
        } catch (err) {
            if (err.code !== "ENOENT") {
                console.error(err);
            }
        }
        return {};
    }
}
