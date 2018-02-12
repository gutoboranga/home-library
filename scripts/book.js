class Book {
	constructor(title, author, publishingHouse, year) {
		this.title = title;
		this.author = author;
    this.publishingHouse = publishingHouse;
    this.year = year;
	}
  
  stringify() {
    let separator = " | ";
    
    return  title + separator +
            author + separator +
            publishingHouse + separator +
            year + separator;
  }
}