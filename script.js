let collection = JSON.parse(localStorage.getItem('collection')) || [];
const add = (title, author) => {
    const book = { title, author };
    collection.push(book);
    localStorage.setItem('collection', JSON.stringify(collection));
};

const remove = (title) => {
    collection = collection.filter((book) => book.title !== title);
    localStorage.setItem('collection', JSON.stringify(collection));
};

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

const showcollection = () => {
    const bookList = document.querySelector('#collection-list');
    const collectionDiv = document.createElement('div', 'hr');
    collection.forEach((book) => {
        collectionDiv.appendChild(createBookDiv(book));
    });
    bookList.innerHTML = '';
    bookList.appendChild(collectionDiv);
};

const clearInputs = () => {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
};

document.querySelector('#book-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    add(title, author);
    showcollection();
    clearInputs();
});

document.querySelector('#collection-list').onclick = (event) => {
    if (event.target.className === 'delete') {
        const bookDiv = event.target.closest('.bookDiv');
        const { id } = bookDiv.querySelector('.delete');
        remove(id);
        bookDiv.remove();
    }
};
document.addEventListener('DOMContentLoaded', showcollection);