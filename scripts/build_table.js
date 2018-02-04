var sortBy = require('./sort.js').sortBy;


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
  process.stdout.write("TO NO BUILD\n");
  
  let raw = readRawData();

  var books = parse(raw);
  
  process.stdout.write("> sera q tem q filtra?\n");
  
  if (shouldFilter) {
    process.stdout.write("-> tem q filtra!\n");
    var filter = require('./filter.js').filter;
    
    books = filter(books);
  }
  
  books = sortBy(books, 'title');

  html = buildHtml(books);
  insertHtml(html);
}

module.exports = {
  build : build
}
