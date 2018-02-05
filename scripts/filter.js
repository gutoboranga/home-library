function filter(books) {
  let author = getAuthor();
  let title = getTitle();
  
  return books.filter(function(book) {
    let authorOk = (author == '') || book['author'].includes(author);
    let titleOk = (title == '') || book['title'].includes(title);
    
    return authorOk && titleOk;
  });
}

function getAuthor() {
  return document.getElementById('author_filter_field').value;
}

function getTitle() {
  return document.getElementById('title_filter_field').value;
}

module.exports = {
 filter : filter
}
