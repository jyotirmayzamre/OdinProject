const myLibrary = [];
const addBook = document.getElementById('new-book');
const dialog = document.querySelector("dialog");
const bookForm = document.querySelector('form');
const submitButton = document.getElementById('submit');
const cardContainer = document.getElementById('card-container');

//Book constructor
function Book(title, author, pages, isRead){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

//function for creating + adding books
function addBookToLibrary(title, author, pages, read){
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
}


addBook.addEventListener('click', function(){
    dialog.showModal();
});

//function to create a card in the dom
function createCard(formData){
    const bookCard = document.createElement('div');
    bookCard.classList.add('card');
    const title = document.createElement('p');
    const author = document.createElement('p');
    const pages = document.createElement('p');
    const read = document.createElement('button');
    const remove = document.createElement('button');
    remove.textContent = 'Remove';
    remove.classList.add('btn');
    read.classList.add('btn');

    title.textContent = formData.get('title');
    author.textContent = formData.get('author');
    pages.textContent = formData.get('pages') + ' pages';
    
    const status = formData.get('read');
    if(status === 'on'){
        read.classList.add('read');
        read.textContent = 'Read';
    } else{
        read.classList.add('nread');
        read.textContent = 'Not Read';
    }

    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    bookCard.appendChild(read);
    bookCard.appendChild(remove);

    cardContainer.appendChild(bookCard);

}

//event listener for submitting the form
submitButton.addEventListener('click', function(e){
    e.preventDefault();
    const formData = new FormData(bookForm);
    dialog.close();
    createCard(formData); 
});


