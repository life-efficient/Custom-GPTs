import https from 'https';
import fs from 'fs';


const download = (url, path) => {
    console.log(`Downloading ${url} to ${path}`)

    const file = fs.createWriteStream(path);

    return new Promise((resolve, reject) => {
        https.get(url, function(response) {
            response.pipe(file);
            file.on('finish', function() {
                file.close(() => {
                    console.log("Download Completed");
                    resolve(path);
                });  // close() is async, call cb after close completes.
            });
        }).on('error', function(err) { // Handle errors
            console.log(err)
            console.log("Download Failed");
            console.error(err.message)
            try {
                fs.unlink(path); // Delete the file async. (But we don't check the result)
            } catch (e) {
                console.error("unlink (deleting downloaded file) failed")
                console.error(e.message)
            }
            // if (callback) callback(err.message);
            reject(err.message)
        });
    });
}

export default download