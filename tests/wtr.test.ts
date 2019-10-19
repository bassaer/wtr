import { wtr, Status, Weather } from "../src/wtr";

describe("wtr", (): void => {
    test('should return weather', (): void => {
        const weather = new Weather(Status.Sunny);
        expect(weather.toString()).toBe("☀️");
    });
});