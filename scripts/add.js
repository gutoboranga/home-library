function add(callback) {
  let author = document.getElementById('author_add_field').value;
  let title = document.getElementById('title_add_field').value;
  let publishingHouse = document.getElementById('publishing_house_add_field').value;
  let year = document.getElementById('year_add_field').value;
  
  if (author == '' || title == '') {
    alert('Valores inválidos para adicionar o livro.');
    return;
  }
  
  let book = {
    'author' : author,
    'title' : title,
    'publishingHouse' : publishingHouse,
    'year' : year
  };
  
  require('./database.js').addBook(book);
  
  cleanFields();
  callback();
}

function cleanFields() {
  document.getElementById('author_add_field').value = '';
  document.getElementById('title_add_field').value = '';
  document.getElementById('publishing_house_add_field').value = '';
  document.getElementById('year_add_field').value = '';
}

function stringify(book) {
  return book['author'] + " | " + book['title'] + " | " + book['publishingHouse'] + " | " + book['year'];
}

module.exports = {
  add : add
}
