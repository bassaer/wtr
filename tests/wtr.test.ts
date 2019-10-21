import { Weather } from "../src/wtr";
import { Command } from "commander";
import { Config } from "../src/confing";
import axiosMock from "axios";
import emoji from "node-emoji";

jest.mock("axios")

describe("wtr", (): void => {
    test(`Clear should return ${emoji.get("sunny")}`, async () => {
        const config = new Config(new Command())
        const weather = new Weather(config);
        const res = {
            list: [
                {
                    weather: [
                        {
                            main: "Clear"
                        }
                    ]
                }
            ]
        };
        (axiosMock.get as any).mockResolvedValueOnce({data: res})
        await expect(weather.get()).resolves.toBe(emoji.get("sunny"));
    });

    test(`Clouds should return ${emoji.get("cloud")}`, async () => {
        const config = new Config(new Command())
        const weather = new Weather(config);
        const res = {
            list: [
                {
                    weather: [
                        {
                            main: "Clouds"
                        }
                    ]
                }
            ]
        };
        (axiosMock.get as any).mockResolvedValueOnce({data: res})
        await expect(weather.get()).resolves.toBe(emoji.get("cloud"));
    });

    test(`Rain should return ${emoji.get("umbrella")}`, async () => {
        const config = new Config(new Command())
        const weather = new Weather(config);
        const res = {
            list: [
                {
                    weather: [
                        {
                            main: "Rain"
                        }
                    ]
                }
            ]
        };
        (axiosMock.get as any).mockResolvedValueOnce({data: res})
        await expect(weather.get()).resolves.toBe(emoji.get("umbrella"));
    });

    test(`Snow should return ${emoji.get("snowflake")}`, async () => {
        const config = new Config(new Command())
        const weather = new Weather(config);
        const res = {
            list: [
                {
                    weather: [
                        {
                            main: "Snow"
                        }
                    ]
                }
            ]
        };
        (axiosMock.get as any).mockResolvedValueOnce({data: res})
        await expect(weather.get()).resolves.toBe(emoji.get("snowflake"));
    });

    test(`the other response should return ${emoji.get("warning")}`, async () => {
        const config = new Config(new Command())
        const weather = new Weather(config);
        const res = {
            list: [
                {
                    weather: [
                        {
                            main: "???"
                        }
                    ]
                }
            ]
        };
        (axiosMock.get as any).mockResolvedValueOnce({data: res})
        await expect(weather.get()).resolves.toBe(emoji.get("warning"));
    });

    test('should return weather', async () => {
        const config = new Config(new Command())
        config.city = "invalid_city";
        config.path = undefined;
        config.verbose = true
        const weather = new Weather(config);
        const err = {
            response: {
                data: {
                    cod: '404',
                    message: 'city no found'
                }
            }
        };
        (axiosMock.get as any).mockRejectedValueOnce(err)
        await expect(weather.get()).rejects.toMatchObject({"cod": "404", "message": "city no found"});
    });
});