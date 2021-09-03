const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
let paths = {};
//TODO: fs.mkdirSync has no call back at all, correct the code
const createDirectories = async () => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync("./PDF_TO_VIDEO")) {
      fs.mkdirSync("./PDF_TO_VIDEO");
    }
    paths.main = "./PDF_TO_VIDEO";
    fs.mkdirSync(`${paths.main}/Images`);
    paths.images = `${paths.main}/Images`;
    fs.mkdirSync(`./PDF_TO_VIDEO/AudioWaves`);
    paths.waves = `${paths.main}/AudioWaves`;
    fs.mkdirSync(`${paths.main}/AudioMp3s`);
    paths.mp3s = `${paths.main}/AudioMp3s`;
    fs.mkdirSync(`${paths.main}/Videos`);
    paths.videos = `${paths.main}/Videos`;
    fs.mkdirSync(`${paths.main}/FinalVideo`);
    paths.result = `${paths.main}/FinalVideo`;
    resolve(paths);
  });
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
module.exports.createDirectories = createDirectories;
module.exports.removeDirectory = removeDirectory;
