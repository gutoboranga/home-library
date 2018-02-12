function getBooks() {
  let raw = readRawData();
  
  if (raw == '') {
    return undefined;
  }
  
  let books = parse(raw);
  return books;
}

function addBook(book) {
  var bookStr = stringify(book);
  
  var fs = require('fs');
  var content = fs.readFileSync("database.txt", { encoding: 'utf8' });
  
  // if base is not empty, put a \n before the data to append
  if (content != '') {
    bookStr = '\n' + bookStr;
  }
  
  fs.appendFileSync('database.txt', bookStr);
}

function stringify(book) {
  return book['author'] + " | " + book['title'] + " | " + book['publishingHouse'] + " | " + book['year'];
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
      'publishingHouse' : fields[2],
      'year' : fields[3],
    }
  });
}

module.exports = {
  getBooks : getBooks,
  addBook : addBook
}
