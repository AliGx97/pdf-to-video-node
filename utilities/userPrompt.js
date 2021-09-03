const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const PdfHelper = require("./pdfHelpers");
const prompts = require("prompts");

let pdfLength;
let from;

/**
 * To get the user input from the command line interface
 * @returns
 */
const getPrompts = async () => {
  1;
  //An array of wanted inputs as documented in the prompts npm package
  const questions = [
    {
      name: "pdfFilePath",
      type: "text",
      message: "Pdf File path to convert ?",
      validate: async (input) => {
        if (fs.existsSync(input) && path.extname(input) == ".pdf") {
          pdfLength = await PdfHelper.getLength(input);
          return true;
        }
        return chalk.red(
          "File Was not found at the given path or it's not a .pdf file"
        );
      },
    },
    {
      name: "from",
      type: "number",
      message: "Number of page to create video from ?",
      validate: (input) => {
        if (input <= pdfLength && input >= 1) {
          from = input;
          return true;
        }
        return chalk.red("Out of the pdf pages range");
      },
    },
    {
      name: "to",
      type: "number",
      message: "Number of the last page included in video ?",
      validate: (input) => {
        if (input >= from && input <= pdfLength) {
          return true;
        }
        return chalk.red(
          "to: greater than or equal to the 'from' page number and less than or equal to pdf length"
        );
      },
    },
    {
      type: "select",
      name: "lang",
      message: "Select language of book:",
      choices: [
        { title: "English (Male Voice)", value: "Alex" },
        { title: "English (Female Voice)", value: "Samantha" },
        { title: "Spanish (Male Voice)", value: "Diego" },
        { title: "Spanish (Female Voice)", value: "Monica" },
        { title: "French", value: "Amelie" },
        { title: "Arabic", value: "Maged" },
      ],
      initial: 0,
    },
    {
      type: "select",
      name: "speed",
      message: "Select speed of reading (voice speed):",
      choices: [
        { title: "0.75", value: 0.75 },
        { title: "1", value: 1 },
        { title: "1.25", value: 1.25 },
        { title: "1.5", value: 1.5 },
        { title: "1.75", value: 1.75 },
        { title: "2", value: 2 },
      ],
    },
  ];

  return await prompts(questions);
};

module.exports = getPrompts;
