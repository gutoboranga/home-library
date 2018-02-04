var fs = require('fs');
var text = fs.readFileSync("database.txt", { encoding: 'utf8' });

var capi = document.getElementById('capivara');
capi.innerHTML = text;
