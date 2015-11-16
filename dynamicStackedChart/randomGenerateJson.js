var jsonfile = require('jsonfile')

var file = './data.json'
var output = []
var tsNow = Date.now()

for (var i = 0; i < 20; i++) {
  tsNow = tsNow + Math.floor((Math.random() * 100000) + 1);
  output.push([tsNow, Math.floor((Math.random() * 100) + 1)]);
}



var obj = [{key: "somthing", values : output}]


jsonfile.writeFile(file, obj, function (err) {
  console.error(err)
})
