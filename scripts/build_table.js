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

function adjustTableHeader() {
  let booksTable = document.getElementById('books_table');
  
  let titleWidth = booksTable.rows[0].cells[0].offsetWidth;
  let authorWidth = booksTable.rows[0].cells[1].offsetWidth;
  
  document.getElementById('table_title_header').width = titleWidth;
  document.getElementById('table_author_header').width = authorWidth;
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
  
  currentBooks = sort(currentBooks);

  html = buildHtml(currentBooks);
  insertHtml(html);
  adjustTableHeader();
}

// "main" : executed when some file requires build_table.js (not its exported functions)
var currentBooks = [];
initialize();
build(false);

module.exports = {
  initialize : initialize,
  build : build
};
