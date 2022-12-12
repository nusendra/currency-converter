#! /usr/bin/env node

import figlet from "figlet";
import { Command } from "commander";
import axios from "axios";
import fs from "fs";

const program = new Command();

interface Params {
  from: string;
  to: string;
  amount: number;
}

const apiKeyFileName = "apikey.txt";

const convert = async ({ from = "USD", to = "IDR", amount }: Params) => {
  try {
    const apikey = readApiKey();

    const { data } = await axios.get(
      `https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`,
      {
        headers: {
          "Accept-Encoding": "gzip,deflate,compress",
          apikey,
        },
      }
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

const readApiKey = () => {
  try {
    const apikey = fs.readFileSync(apiKeyFileName, {
      encoding: "utf8",
      flag: "r",
    });
    return apikey;
  } catch (err) {
    console.log(
      "API Key not found. Please input the API key with -api options"
    );
  }
};

program
  .version("1.0.0")
  .description("An example CLI for managing a directory")
  .option("-api, --apikey <value>", "Your API key")
  .parse(process.argv);

const options = program.opts();

if (options.apikey) {
  let writeStream = fs.createWriteStream(`~/.config/${apiKeyFileName}`);
  writeStream.write(process.argv[3]);
  writeStream.end();

  console.log("API successfully saved...");
} else if (!process.argv.slice(2).length) {
  console.log(figlet.textSync("Currency Converter"));
  program.outputHelp();
} else {
  if (readApiKey()) {
    program
      .action(async () => {
        const amount = parseInt(process.argv[2]);
        const from = process.argv[3] || "USD";
        const to = process.argv[4] || "IDR";

        const result = await convert({ from, to, amount });
        console.log(result);
      })
      .parse(process.argv);
  }
}
