function filter(books) {
  let author = getAuthor();
  let title = getTitle();
  let publishingHouse = getPublishingHouse();
  let year = getYear();
  
  return books.filter(function(book) {
    let authorOk = (author == '') || book['author'].includes(author);
    let titleOk = (title == '') || book['title'].includes(title);
    let publishingHouseOk = (publishingHouse == '') || book['publishingHouse'].includes(publishingHouse);
    let yearOk = (year == '') || book['year'].includes(year);
    
    return authorOk && titleOk && publishingHouseOk && yearOk;
  });
}

function getAuthor() {
  return document.getElementById('author_filter_field').value;
}

function getTitle() {
  return document.getElementById('title_filter_field').value;
}

function getPublishingHouse() {
  return document.getElementById('publishing_house_filter_field').value;
}

function getYear() {
  return document.getElementById('year_filter_field').value;
}

module.exports = {
 filter : filter
}
