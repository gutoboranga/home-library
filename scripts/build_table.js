var sort = require('./sort.js').sort;

function initialize() {
  let raw = readRawData();
  currentBooks = parse(raw);
}

function readRawData() {
  var fs = require('fs');
  var text = fs.readFileSync("database.txt", { encoding: 'utf8' });
  
  return text.toLowerCase();
}

function parse(raw) {
  lines = raw.split('\n');
  
  return lines.map(function(element) {
    fields = element.split(' | ');
    
    return {
      'author' : fields[0],
      'title' : fields[1],
    }
  });
}

function buildHtml(books) {
  var even = true;
  let classes = ["clear", "dark"];
  
  return books.reduce(function(partialHtml, currentBook) {
    var itemClass = even ? "clear" : "dark";
    var html = ""
    
    html += "<tr class=\"" + itemClass + "\">"
    html += "<td>" + currentBook['title'] + "</td>"
    html += "<td>" + currentBook['author'] + "</td>"
    html += "</tr>"
    
    even = !even;
    return partialHtml += html;
  }, "");
}

function insertHtml(html) {
  var table = document.getElementById('books_table');
  table.innerHTML = html;
}

function build(shouldFilter) {
  if (shouldFilter) {
    // read database again, to avoid interference from previous filters
    initialize();
    
    var filter = require('./filter.js').filter;
    currentBooks = filter(currentBooks);
  }
  
  currentBooks = sort(currentBooks);

  html = buildHtml(currentBooks);
  insertHtml(html);
}

// "main" : executed when some file requires build_table.js (not its exported functions)
var currentBooks = [];
initialize();
build(false);

module.exports = {
  build : build
};
