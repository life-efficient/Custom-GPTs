'use strict';
let videoStitch = require('video-stitch');
const relativeToAbsolutePath = require('path').resolve



export const combineVideos = async (filepaths, outputFilepath) => {

    
    let videoConcat = videoStitch.concat;

    await videoConcat({
        silent: true, // optional. if set to false, gives detailed output on console
        overwrite: false // optional. by default, if file already exists, ffmpeg will ask for overwriting in console and that pause the process. if set to true, it will force overwriting. if set to false it will prevent overwriting.
    })
    .clips(filepaths.map(f => {
        console.log(f)
        return {
            "fileName": relativeToAbsolutePath(f)
        }
    }))
    .output(outputFilepath) //optional absolute file name for output file
    .concat()
    .then((outputFileName) => {
        
    });
    // let videoMerge = videoStitch.merge;


    // videoMerge()
    // .original({
    //     "fileName": "FILENAME",
    //     "duration": "hh:mm:ss"
    // })
    // .clips([
    //     {
    //     "startTime": "hh:mm:ss",
    //     "fileName": "FILENAME",
    //     "duration": "hh:mm:ss"
    //     },
    //     {
    //     "startTime": "hh:mm:ss",
    //     "fileName": "FILENAME",
    //     "duration": "hh:mm:ss"
    //     },
    //     {
    //     "startTime": "hh:mm:ss",
    //     "fileName": "FILENAME",
    //     "duration": "hh:mm:ss"
    //     }
    // ])
    // .merge()
    // .then((outputFile) => {
    //     console.log('path to output file', outputFile);
    // });
}