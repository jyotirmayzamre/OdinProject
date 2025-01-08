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


Book.prototype.changeStatus = function(){
    this.isRead = !this.isRead;
}

//function for creating + adding books
function addBookToLibrary(formData){
    const book = new Book(formData.get('title'), formData.get('author'), formData.get('pages'), formData.get('read') === 'on' ? true : false);
    myLibrary.push(book);
    return book;
}


addBook.addEventListener('click', function(){
    dialog.showModal();
});

//function for changing the read status
function changeStatus(e, book){
    const elem = e.target;
    const currStatus = book.isRead;
    book.changeStatus();
    if(currStatus === true){
        elem.classList.remove('read');
        elem.classList.add('nread');
        elem.textContent = 'Not Read';
    } else{
        elem.classList.remove('nread');
        elem.classList.add('read');
        elem.textContent = 'Read';
    }
}


//function to create a card in the dom
function createCard(book){
    const bookCard = document.createElement('div');
    bookCard.classList.add('card');

    //title
    const title = document.createElement('p');
    title.textContent = book.title;
    bookCard.appendChild(title);

    //author
    const author = document.createElement('p');
    author.textContent = book.author;
    bookCard.appendChild(author);

    //pages
    const pages = document.createElement('p');
    pages.textContent = book.pages + ' pages';
    bookCard.appendChild(pages);

    //read status button
    const read = document.createElement('button');
    read.classList.add('btn');

    const status = book.isRead;
    if(status){
        read.classList.add('read');
        read.textContent = 'Read';
    } else{
        read.classList.add('nread');
        read.textContent = 'Not Read';
    }

    read.addEventListener('click', (e) => changeStatus(e, book));


    bookCard.appendChild(read);

    //remove button
    const remove = document.createElement('button');
    remove.textContent = 'Remove';
    remove.classList.add('btn');

    remove.addEventListener('click', function(){
        myLibrary.splice(myLibrary.indexOf(book), 1);
        cardContainer.removeChild(bookCard);
    })

    bookCard.appendChild(remove);
    


    cardContainer.appendChild(bookCard);
}


//event listener for submitting the form
submitButton.addEventListener('click', function(e){
    e.preventDefault();
    const formData = new FormData(bookForm);
    dialog.close();
    bookForm.reset();
    createCard(addBookToLibrary(formData)); 
});


