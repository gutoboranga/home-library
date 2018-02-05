function sortBy(books, key) {
  return books.sort(function(a, b) {
    return a[key] > b[key];
  });
}

function sort(books) {
  let sortType = document.querySelector('input[name="sortType"]:checked').value;
  
  return sortBy(books, sortType);
}

module.exports = {
  sort : sort
}