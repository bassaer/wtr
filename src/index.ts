import program from "commander";
import { version } from "../package.json";
import { Config } from "./confing";
import { Weather } from "./wtr";

program
    .version(version, "-V, --version")
    .option("-v, --verbose", "verbose", false)
    .option("-p, --path </path/to/conf>", "config path")
    .parse(process.argv);

const conf = new Config(program);
const weather = new Weather(conf);
console.log(weather.toString());
