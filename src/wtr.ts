import emoji from "node-emoji";
import request from "request";
import { Config } from "./confing";

export class Weather {
    private status: string;
    private config: Config;

    constructor(config: Config) {
        this.status = emoji.get("warning");
        this.config = config;
    }

    public get() {
        const url = "https://api.openweathermap.org/data/2.5/forecast";
        const qs = this.config.getQsObject();
        request.get(url, {qs}, (err: any, res: any, body: any) => {
            if (err) {
                console.error(err);
                return;
            }

            const result = JSON.parse(body);
            const jsnStr = JSON.stringify(result, null, 2);
            if (res.statusCode !== 200) {
                console.error(jsnStr);
                return;
            }
            if (this.config.verbose) {
                console.log(jsnStr);
            }
            const main = result.list[0].weather[0].main;
            switch (main) {
                case "Clear":
                    this.status = emoji.get("sunny");
                    break;
                case "Clouds":
                    this.status = emoji.get("cloud");
                    break;
                case "Rain":
                    this.status = emoji.get("umbrella");
                    break;
                case "Snow":
                    this.status = emoji.get("snowflake");
                    break;
                default:
                    this.status = emoji.get("warning");
            }
            console.log(this.status);
        });
    }
}
