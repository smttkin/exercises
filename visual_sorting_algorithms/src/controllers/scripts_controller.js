const fs = require('fs');
const path = require('path');
let public_script_names =["Helpers.js","ArrayVisualizer.js","SoundPlayer.js"];

function controller(req, res) {
    console.log(__dirname);
    const filePath = "src/"+req.path;
    console.log(filePath);
    const file_name = path.basename(filePath);
    const absPath = path.resolve(process.cwd(), filePath);
    
    fs.readFile( absPath, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
          return;
        }
        if (!public_script_names.includes(file_name)){
            res.status(404).send('File not found!');
            return;
        }
        res.set("Content-Type", "text/javascript");
        // Send the file contents as the response
        res.status(200).send(data);
    });

    
    

}
module.exports = controller;