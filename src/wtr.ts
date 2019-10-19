import emoji from "node-emoji";

export enum Status {
    Sunny,
    Cloudy,
    Rainy,
}

export class Weather {
    private status: Status;

    constructor(status: Status) {
        this.status = status;
    }

    public toString() {
        switch (this.status) {
            case Status.Sunny:
                return emoji.get("sunny");
            case Status.Cloudy:
                return emoji.get("cloud");
            case Status.Rainy:
                return emoji.get("umbrella_with_rain_drops");
        }
    }
}

export const wtr = (status: Status) => {
    const weather = new Weather(status);
    console.log(weather.toString());
};

wtr(Status.Sunny);
wtr(Status.Cloudy);
wtr(Status.Rainy);
