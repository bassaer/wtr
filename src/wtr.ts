import emoji from "node-emoji";
import { Config } from "./confing";

enum Status {
    Sunny,
    Cloudy,
    Rainy,
    Unknown,
}

export class Weather {
    private status: Status;
    private config: Config | undefined;

    constructor(config?: Config ) {
        this.status = Status.Unknown;
        this.config = config;
    }

    public toString() {
        switch (this.status) {
            case Status.Sunny:
                return emoji.get("sunny");
            case Status.Cloudy:
                return emoji.get("cloud");
            case Status.Rainy:
                return emoji.get("umbrella_with_rain_drops");
            default:
                return emoji.get("warning");
        }
    }
}
