function byAuthor(books) {
  return books.sort(function(a, b) {
    return a['author'] > b['author'];
  });
}

function byTitle(books) {
  return books.sort(function(a, b) {
    return a['title'] > b['title'];
  });
}

function sortBy(books, key) {
  return books.sort(function(a, b) {
    return a[key] > b[key];
  });
}


module.exports = {
  sortBy: sortBy
}