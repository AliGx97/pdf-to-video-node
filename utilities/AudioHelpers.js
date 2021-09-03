const audioConverter = require("audio-converter");
const say = require("say");
const mp3Duration = require("mp3-duration");
const fs = require("fs");

module.exports = class AudiosHelper {
  /**
   *    Generates a sound file (.wav) from a text
   * @param {*} text Text to speak
   * @param {*} lang Language and sound also (say package documentation)
   * @param {*} speed Speed of reading the text
   * @param {*} outputPath Path to output the sound file (.wav)
   * @returns
   */
  static createWaveSound = (text, lang, speed, outputPath) => {
    return new Promise((resolve, reject) => {
      say.export(text, lang, speed, outputPath, (err) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve();
      });
    });
  };

  /**
   *    Converts all .wav files in a directory to mp3 files (with the same name of original .wav files) in the specified directory
   * @param {*} wavesPath path of .wav files directory
   * @param {*} mp3sPath path to save the mp3 files in
   */
  static convertToMp3s = async (wavesPath, mp3sPath) => {
    await audioConverter(wavesPath, mp3sPath, {
      progressBar: true,
      mp3Only: true,
    });
  };

  /**
   * Returns the length (in seconds) of an mp3 file
   * @param {*} filePath path of the mp3 file to count its length
   * @returns length of mp3 audio file (in seconds)
   */
  static getMp3Length = async (filePath) => {
    try {
      let dur = await mp3Duration(filePath);
      //   return Math.round(dur * 1e1) / 1e1; //to get 1 decimal point (num after e represents decimal points)
      return dur;
    } catch (error) {
      console.log(error);
    }
  };
};
