# pdf-to-video

## Installation

Install the package globally using -g

```sh
npm i -g pdf-to-video-node
```

### Important Note

for the package to work, you need to install `ffmpeg` CLI tools and `SOX` as well

### Using the package

after installing the package golbally, just run the following command in your terminal `pdfVideo` like:

```sh
~/someDirectory/$ pdfVideo
```

and follow on screen instruction

### Inputs

The app will ask you for following inputs (not in the same order):
1- the pdf file path.
2-the number of page to start video from
3- the number of the last page included in the video (`note`: If you want only one page say page 6 , both inputs should be the number 6)
4- the speed of reading speech
5- the language of file (and voice if possible)

# NOTE

this project was intended just for the purpose of learning and it is slow while generating the video since the process itself takes time (it generates text from pdf file that gets converted to images, then the images to seperate videos (each image becomes a seperate video) then it merges all the part videos together).

### p.s:

Sorry if the documentation is bad, I will explain the package a lot better when I get the time for it.
