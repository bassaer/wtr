import { rejects } from "assert";
import axos from "axios";
import emoji from "node-emoji";
import { Config } from "./confing";

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
                const body = JSON.stringify(res.data, null, 2);
                if (this.config.verbose) {
                    console.log(body);
                }
                const main = res.data.list[0].weather[0].main;
                switch (main) {
                    case "Clear":
                        resolve(emoji.get("sunny"));
                        break;
                    case "Clouds":
                        resolve(emoji.get("cloud"));
                        break;
                    case "Rain":
                        resolve(emoji.get("umbrella"));
                        break;
                    case "Snow":
                        resolve(emoji.get("snowflake"));
                        break;
                    default:
                        resolve(emoji.get("warning"));
                }
            })
            .catch((err: any) => {
                reject(err.response.data);
            });
        });
    }
}
