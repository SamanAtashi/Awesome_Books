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
  bookDiv.setAttribute('class', 'bookDiv display');
  const bookInfo = document.createElement('p');
  bookInfo.innerHTML = `"${book.title}" by <span class="author">${book.author}</span>`;
  const delBtn = document.createElement('button');
  delBtn.setAttribute('id', book.title);
  delBtn.textContent = 'Remove';
  delBtn.setAttribute('class', 'delete');
  bookDiv.append(bookInfo, delBtn);
  return bookDiv;
};

const showBooks = () => {
  const bookList = document.querySelector('#collection-list');
  const booksDiv = document.createElement('div');
  booksDiv.setAttribute('class', 'display');
  booksDiv.setAttribute('id', 'books-div');
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

const inList = () => {
  document.getElementsByTagName('h3')[0].setAttribute('class', 'inList');
  document.getElementsByTagName('form')[0].setAttribute('class', 'inList');
  document.getElementsByTagName('section')[0].setAttribute('class', 'inAddBookDel');
  document.getElementsByTagName('main')[0].setAttribute('class', 'inContactRev');
  document.querySelector('.inContactDel').setAttribute('class', 'contact');
};

document.querySelector('.List').addEventListener('click', () => {
  inList();
});

const inAddBook = () => {
  document.getElementsByTagName('form')[0].setAttribute('class', 'inListDel');
  document.getElementsByTagName('section')[0].setAttribute('class', 'inAddBook');
  document.getElementsByTagName('main')[0].setAttribute('class', 'inContactRev');
  document.querySelector('.inContactDel').setAttribute('class', 'contact');
};

document.querySelector('.Add').addEventListener('click', () => {
  inAddBook();
});

const inContact = () => {
  document.getElementsByTagName('main')[0].setAttribute('class', 'inContact');
  document.querySelector('.contact').setAttribute('class', 'inContactDel');
};

document.querySelector('.contactBtn').addEventListener('click', () => {
  inContact();
});
