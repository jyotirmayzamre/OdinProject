const myLibrary = [];
const addBook = document.getElementById('new-book');
const dialog = document.querySelector("dialog");

//Book constructor
function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

//Book information method
Book.prototype.info = function(){
    let phrase = this.read ? 'read' : 'not read yet'
    return `${this.title} by ${this.author}, ${this.pages} pages, ${phrase}`
}

//function for creating + adding books
function addBookToLibrary(title, author, pages, read){
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
}


addBook.addEventListener('click', function(){
    dialog.showModal();
    console.log('hello');
});