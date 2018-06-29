var express = require('express');
var fs = require('fs');
var exec = require('child_process').exec;

var app = express();

app.use(express.static(__dirname + "/client/build"));

// Watch the client folder for changes and rebuild React if detected
fs.watch('./client/src', {recursive: true}, function(eventType, fileName) {
  console.log("Received " + eventType + " from file: " + fileName);
  console.log("Rebuilding React client...");
  exec('npm run build', function (error, stdout, stderr) {
    if (error !== null) {
      console.log('exec error: ' + error);
    } else {
      console.log(stdout);
      console.log("React files rebuilt!")
    }
  });
});

app.get('*', function(req, res) {
  res.sendFile(__dirname + "/client/build/index.html");
});

app.listen(3000);
console.log("Server listening on port 3000...");
