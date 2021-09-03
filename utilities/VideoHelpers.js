const videoshow = require("videoshow");
const ffmpeg = require("fluent-ffmpeg");
const chalk = require("chalk");
let videoOptions = {
  fps: 1,
  transition: false,
  videoBitrate: 1024,
  videoCodec: "libx264",
  size: "640x480",
  audioBitrate: "128k",
  audioChannels: 2,
  format: "mp4",
  pixelFormat: "yuv420p",
};
module.exports = class VideosHelper {
  /**
   * Creates a video (.mp4) from an image and an mp3 audio file
   * @param {*} arrayOfOneImagePath a one image path that should be passed as an array (i.e ['pathOfImage])
   * @param {*} mp3Path an mp3 file path that is the sound of the video
   * @param {*} mp3AudioLength represents the length of the video
   * @param {*} outputVideoPath the path where to output the video(.mp4)
   * @returns Nothing!! because of how I built this app, you cam modify it though
   */
  static createVideo = async (
    arrayOfOneImagePath,
    mp3Path,
    mp3AudioLength,
    outputVideoPath
  ) => {
    videoOptions.loop = mp3AudioLength;
    return new Promise((resolve, reject) => {
      try {
        videoshow(arrayOfOneImagePath, videoOptions)
          .audio(mp3Path)
          .save(outputVideoPath)
          .on("error", function (err, stdout, stderr) {
            console.error("Error:", err);
            console.error("ffmpeg stderr:", stderr);
            reject({ err, stderr });
          })
          .on("end", function (output) {
            resolve();
          });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  };

  /**
   *  Merge multiple videos into one video (you can add transitions effect between each video, read documentation for fluent-ffmpeg)
   * @param {*} videosArray an array of videos paths (.mp4)
   * @param {*} outputPath the path where to output the video
   * @returns
   */
  static createFinalVideo = async (videosArray, outputPath) => {
    return new Promise((resolve, reject) => {
      let mergedVideo = ffmpeg();
      for (let i = 0, total = videosArray.length; i < total; i++) {
        mergedVideo.addInput(videosArray[i]);
      }
      mergedVideo
        .on("error", function (err) {
          console.log("An error occurred: " + err.message);
          reject(err);
        })
        .on("start", () => {
          console.log("\nMerging all videos...");
        })
        .on("end", function () {
          resolve();
        })
        .mergeToFile(outputPath);
    });
  };
};
