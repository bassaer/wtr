#!/usr/bin/env node

import program from "commander";
import { version } from "../package.json";
import { Config } from "./confing";
import { Weather } from "./wtr";

program
    .version(version, "-V, --version")
    .option("-a, --api-key <API_KEY>", "API KEY of OpenWeatherMap")
    .option("-v, --verbose", "verbose", false)
    .option("-p, --path </path/to/conf>", "config path")
    .option("-c, --city <city>", "city name")
    .parse(process.argv);

const conf = new Config(program);
const weather = new Weather(conf);
weather.get()
    .then((res: string) => {
        console.log(res);
    })
    .catch((err: any) => {
        console.error(err);
    });
