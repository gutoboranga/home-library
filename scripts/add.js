function add(callback) {
  let author = document.getElementById('author_add_field').value;
  let title = document.getElementById('title_add_field').value;
  
  if (author == '' || title == '') {
    alert('Valores inválidos para adicionar o livro.');
    return;
  }
  
  let book = {
    'author' : author,
    'title' : title
  };
  
  require('./database.js').addBook(book);
  
  cleanFields();
  callback();
}

function cleanFields() {
  document.getElementById('author_add_field').value = '';
  document.getElementById('title_add_field').value = '';
}

function stringify(book) {
  return book['author'] + " | " + book['title'];
}

module.exports = {
  add : add
}
