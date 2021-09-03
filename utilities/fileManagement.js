const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
let paths = {};
//TODO: fs.mkdirSync has no call back at all, correct the code
const createDirectories = async () => {
  return new Promise((resolve, reject) => {
    if (fs.existsSync("./PDF_TO_VIDEO")) {
      console.log(
        chalk.bold.red("\na folder named PDF_TO_VIDEO already exist\n")
      );
      reject("DELETE  'PDF_TO_VIDEO' and try again\n");
    }
    fs.mkdirSync("./PDF_TO_VIDEO", (err) => {
      reject(err);
    });
    paths.main = "./PDF_TO_VIDEO";
    fs.mkdirSync("./PDF_TO_VIDEO/Images", (err) => {
      if (err) {
        console.log(err);
        reject(err);
      }
    });
    paths.images = "./PDF_TO_VIDEO/Images";
    fs.mkdirSync("./PDF_TO_VIDEO/AudioWaves", (err) => {
      if (err) {
        console.log(err);
        reject(err);
      }
    });
    paths.waves = "./PDF_TO_VIDEO/AudioWaves";
    fs.mkdirSync("./PDF_TO_VIDEO/AudioMp3s", (err) => {
      if (err) {
        console.log(err);
        reject(err);
      }
    });
    paths.mp3s = "./PDF_TO_VIDEO/AudioMp3s";
    fs.mkdirSync("./PDF_TO_VIDEO/Videos", (err) => {
      if (err) {
        console.log(err);
        reject(err);
      }
    });
    paths.videos = "./PDF_TO_VIDEO/Videos";
    fs.mkdirSync("./PDF_TO_VIDEO/FinalVideo", (err) => {
      if (err) {
        console.log(err);
        reject(err);
      }
    });
    paths.result = "./PDF_TO_VIDEO/FinalVideo";
    resolve(paths);
  });
};
const initialDirectories = async () => {
  paths = await createDirectories();
  return paths;
};
const removeDirectory = async (paths) => {
  return new Promise((resolve, reject) => {
    try {
      for (let i = 0, length = paths.length; i < length; i++) {
        fs.rmSync(paths[i], { recursive: true });
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
module.exports.initialDirectories = initialDirectories;
module.exports.removeDirectory = removeDirectory;
