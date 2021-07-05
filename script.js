let collection = JSON.parse(localStorage.getItem('collection')) || [];

const add = (title, author_name) => {
    const book = { title, author_name };
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
    const author_name = document.createElement('p');
    author_name.textContent = book.author_name;
    const delBtn = document.createElement('button');
    delBtn.setAttribute('id', book.title);
    delBtn.textContent = 'Remove';
    delBtn.setAttribute('class', 'delete');
    const hr = document.createElement('hr');
    bookDiv.append(title, author_name, delBtn, hr);
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
    document.querySelector('#author_name').value = '';
};

document.querySelector('#book-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.querySelector('#title').value;
    const author_name = document.querySelector('#author_name').value;
    add(title, author_name);
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