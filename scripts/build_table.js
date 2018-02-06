var sort = require('./sort.js').sort;

function initialize() {
  currentBooks = require('./database.js').getBooks();
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
  
  if (typeof currentBooks === 'undefined') {
    insertHtml('<h2>Nenhum livro cadastrado.</h2>');
    return;
  }
  
  process.stdout.write("BOOKS OK\n");
  currentBooks = sort(currentBooks);

  html = buildHtml(currentBooks);
  insertHtml(html);
}

// "main" : executed when some file requires build_table.js (not its exported functions)
var currentBooks = [];
initialize();
build(false);

module.exports = {
  initialize : initialize,
  build : build
};
