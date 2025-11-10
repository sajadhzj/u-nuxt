#!/usr/bin/env node
import { Command } from "commander";
import makeModule from "./commands/makeModule";

const program = new Command();

program
  .name("u-nuxt")
  .description("🧩 U Nuxt — enjoy of coding")
  .version("1.0.0");

program
  .command("make-module <name>")
  .description("Initialize a new u nuxt module")
  .action(async (name: string) => {
    await makeModule(name);
  });

program.parse(process.argv);
