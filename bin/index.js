#!/usr/bin/env node
//The above comment is essential to build the app as a cli app

// Requiring packages
const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const getPrompts = require("../utilities/userPrompt");
const cliSpinners = require("cli-spinners");
const ora = require("ora");
let spinner;
const spinnerShape = cliSpinners.material;
const {
  createDirectories,
  removeDirectory,
} = require("../utilities/fileManagement");
const generateImage = require("../utilities/createImage");
const PdfHelper = require("../utilities/pdfHelpers");
const AudiosHelper = require("../utilities/AudioHelpers");
const createImage = require("../utilities/createImage");
const VideosHelper = require("../utilities/VideoHelpers");
////

//Beginning of code
clear();
console.log(
  chalk.red(
    figlet.textSync("PDF--TO--VIDEO", {
      horizontalLayout: "fitted",
      verticalLayout: "fitted",
    })
  )
);
console.log(
  chalk.red(
    figlet.textSync("By-Ali-Hasan", {
      horizontalLayout: "fitted",
      verticalLayout: "fitted",
    })
  )
);
const main = async () => {
  let userInput = await getPrompts();
  let bookPath = userInput.pdfFilePath;
  let speed = userInput.speed;
  let from = userInput.from;
  let currentPage = from;
  let to = userInput.to;
  let total = to - from + 1;
  let lang = userInput.lang;
  let paths;
  try {
    paths = await createDirectories();
  } catch (error) {
    console.log(chalk.bold.red(error));
    process.exit(1);
  }
  try {
    let imagesPaths = [];
    let videosPaths = [];
    spinner = ora({
      spinner: spinnerShape,
      prefixText: "Creating Audios and Images",
    }).start();
    //loop for each page
    for (let i = 0; i < total; i++) {
      let pageWaveAudioPath = `${paths.waves}/audio${i}.wav`;
      let pageImagePath = `${paths.images}/Image${i}.png`;
      let pageVideoPath = `${paths.videos}/Video${i}.mp4`;
      imagesPaths.push(pageImagePath);
      videosPaths.push(pageVideoPath);
      let text = await PdfHelper.convertPageToText(
        bookPath,
        currentPage,
        from + i
      );
      currentPage++;
      await AudiosHelper.createWaveSound(text, lang, speed, pageWaveAudioPath);
      await createImage(pageImagePath, text);
    }
    spinner.stop();
    await AudiosHelper.convertToMp3s(paths.waves, paths.mp3s);
    spinner = ora({
      spinner: spinnerShape,
      prefixText: chalk.bold.green("\nCreating part videos"),
    }).start();
    for (let i = 0; i < total; i++) {
      let tempImageArray = [];
      tempImageArray[0] = imagesPaths[i];
      let tempMp3FilePath = `${paths.mp3s}/audio${i}.mp3`;
      let mp3AudioLength = await AudiosHelper.getMp3Length(tempMp3FilePath);
      await VideosHelper.createVideo(
        tempImageArray,
        tempMp3FilePath,
        mp3AudioLength,
        videosPaths[i]
      );
    }
    spinner.stop();
    console.log(chalk.green("\nParts videos has been created"));
    spinner = ora({
      spinner: spinnerShape,
      prefixText: chalk.bold.green("Creating Final Video"),
    }).start();
    let finalVideoPath = `${paths.result}/VideoBook.mp4`;
    await VideosHelper.createFinalVideo(videosPaths, finalVideoPath);
    spinner.stop();
    console.log(
      chalk.green(
        "\nVideo has been created successfully. \nDeleting temporary created files now..."
      )
    );
    await removeDirectory([
      paths.waves,
      paths.mp3s,
      paths.videos,
      paths.images,
    ]);
    clear();
    console.log(chalk.green("Process Created Successfully"));
  } catch (error) {
    console.log(chalk.bold.red("The following error occured\n"));
    console.log(chalk.bold.red(error) + "\n");
    process.exit(1);
  }
};
main();
