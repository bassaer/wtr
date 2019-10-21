import { rejects } from "assert";
import axos from "axios";
import emoji from "node-emoji";
import { Config } from "./confing";

function getEmoji(code: string) {
    switch (code) {
        case "Clear":
            return emoji.get("sunny");
        case "Clouds":
            return emoji.get("cloud");
        case "Rain":
            return emoji.get("umbrella");
            break;
        case "Snow":
            return emoji.get("snowflake");
        default:
            return emoji.get("warning");
    }
}

export class Weather {
    private config: Config;

    constructor(config: Config) {
        this.config = config;
    }

    public async get(): Promise<string> {
        const url = "https://api.openweathermap.org/data/2.5/forecast";
        const qs = this.config.getQsObject();
        return new Promise((resolve: (status: string) => void, reject: (err?: any) => void) => {
            axos.get(url, {
                params: qs,
            }).then((res: any) => {
                if (this.config.verbose) {
                    const body = JSON.stringify(res.data, null, 2);
                    console.log(body);
                }
                const main = res.data.list[0].weather[0].main;
                resolve(getEmoji(main));
            })
            .catch((err: any) => {
                reject(err.response.data);
            });
        });
    }
}
