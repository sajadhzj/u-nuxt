#!/usr/bin/env node
import { Command } from "commander";
import makeModule from "./commands/makeModule.js";
const program = new Command();
program.name("u-nuxt").description("\u{1F9E9} U Nuxt \u2014 enjoy of coding").version("1.0.0");
program.command("make-module <name>").description("Initialize a new u nuxt module").action(async (name) => {
  await makeModule(name);
});
program.parse(process.argv);
