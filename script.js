class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }

    static books = JSON.parse(localStorage.getItem('books')) || [];

    static addBook(book) {
        Book.books.push(book);
        localStorage.setItem('books', JSON.stringify(Book.books));
    }

    static removeBook(title) {
        Book.books = Book.books.filter((book) => book.title !== title);
        localStorage.setItem('books', JSON.stringify(Book.books));
    }
}

const createBookDiv = (book) => {
    const bookDiv = document.createElement('div');
    bookDiv.setAttribute('class', 'bookDiv');
    const title = document.createElement('p');
    title.textContent = book.title;
    const author = document.createElement('p');
    author.textContent = book.author;
    const delBtn = document.createElement('button');
    delBtn.setAttribute('id', book.title);
    delBtn.textContent = 'Remove';
    delBtn.setAttribute('class', 'delete');
    const hr = document.createElement('hr');
    bookDiv.append(title, author, delBtn, hr);
    return bookDiv;
};

const showBooks = () => {
    const bookList = document.querySelector('#collection-list');
    const booksDiv = document.createElement('div');
    Book.books.forEach((book) => {
        booksDiv.appendChild(createBookDiv(book));
    });
    bookList.innerHTML = '';
    bookList.appendChild(booksDiv);
};

const clearInputs = () => {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
};

document.querySelector('#book-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const book = new Book(title, author);
    Book.addBook(book);
    showBooks();
    clearInputs();
});

document.querySelector('#collection-list').onclick = (event) => {
    if (event.target.className === 'delete') {
        const bookDiv = event.target.closest('.bookDiv');
        const { id } = bookDiv.querySelector('.delete');
        Book.removeBook(id);
        bookDiv.remove();
    }
};

document.addEventListener('DOMContentLoaded', showBooks);