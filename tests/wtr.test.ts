import { Weather } from "../src/wtr";

describe("wtr", (): void => {
    test('should return weather', (): void => {
        const weather = new Weather();
        expect(weather.toString()).toBe("⚠️");
    });
});