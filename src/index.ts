#!/usr/bin/env node

import yargs from "yargs";
import path from "path";
import yaml from "js-yaml";
import fs from "fs";
import "./combinators/blocks"

const defaultConfig = yaml.load(fs.readFileSync(path.join(__dirname, "default.yml"), "utf8"))

process.exit(0)


const args = yargs
    .scriptName("gdocs")
    .command(
        "create-config [path]",
        "Creates a default config file.", (yargs) => {
            yargs.positional("path", {
                default: ".",
                type: "string",
                normalize: true,
                description: "The directory to create the config file in."
            })
        },
        ({ path: dir }: { path: string }) => {
            console.log(path.resolve(dir))
        }
    )
    .command(
        "parse <lua dir> <build dir>",
        "Parse a lua directory and build the documentation.",
        (yargs) => {
            yargs
                .positional("lua-dir", {
                    type: "string",
                    normalize: true,
                    description: "The lua directory to parse."
                })
                .positional("build-dir", {
                    type: "string",
                    normalize: true,
                    description: "The lua directory to parse."
                })
        }
    )
    .demandCommand(1, "You must provide a command")
    .help()
    .argv;

console.log(args)
