const baseUrl = 'http://localhost:3030/jsonstore/collections/books';
const loadBtnElement = document.getElementById('loadBooks');
loadBtnElement.addEventListener('click', onLoad);

const formElement = document.querySelector('form');
formElement.addEventListener('click', onSubmit);

const tBodyElement = document.querySelector('table tbody');
tBodyElement.addEventListener('click', onTableClick);

let editBookId = '';

async function request(url, options){
    try {
        const response = await fetch(url, options);

        if(!response.ok){
            const error = await response.json();
            throw new Error(error.message);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        alert(error.message);
    }
}

async function onLoad(){
    const result = await request(baseUrl);

    tBodyElement.innerHTML = '';

    Object.entries(result).forEach(bookInfo => {
        const bookId = bookInfo[0];
        const bookObj = bookInfo[1];

        const trElement = document.createElement('tr');

        trElement.innerHTML = `
           <td>${bookObj.title}</td>
           <td>${bookObj.author}</td>
           <td id="${bookId}">
              <button>Edit</button>
              <button>Delete</button>
           </td>
        `;

        tBodyElement.appendChild(trElement);
    });
}

async function onTableClick(e){
    if(e.target.textContent === 'Edit'){
        await onEdit(e);
    }else if(e.target.textContent === 'Delete'){
        await onDelete(e);
    }
}

async function onSubmit(e){
    e.preventDefault();

    if(e.target.textContent === 'Submit'){
        await onCreate(e);
    }else if(e.target.textContent === 'Save'){
        await onSave(e);
    }
}

async function onCreate(e){
    const formData = new FormData(e.currentTarget);
    const bookFormData = Object.fromEntries(formData);

    if(bookFormData.title === ''
    || bookFormData.author === ''){
        return;
    }

    document.querySelector('form h3').textContent = 'FORM';
    document.querySelector('form button').textContent = 'Submit';

    await createBook(baseUrl, bookFormData);

    formElement.reset();
    await onLoad();
}

async function createBook(url, book){
    await request(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
    });
}

async function onEdit(e){
    const parentTrElement = e.target.parentNode.parentNode;
    editBookId = e.target.parentNode.id;
    parentTrElement.remove();

    const previousTitle = parentTrElement.querySelector('td');
    const previousAuthor = parentTrElement.querySelector('td:nth-child(2)');

    document.querySelector('form h3').textContent = 'Edit FORM';
    document.querySelector('form button').textContent = 'Save';

    document.querySelector('input[name="title"]').value = previousTitle.textContent;
    document.querySelector('input[name="author"]').value = previousAuthor.textContent;
}

async function onSave(e){
    const formData = new FormData(e.currentTarget);
    const bookFormData = Object.fromEntries(formData);

    if(bookFormData.title === ''
    || bookFormData.author === ''){
        return;
    }

    document.querySelector('form h3').textContent = 'FORM';
    document.querySelector('form button').textContent = 'Submit';

    await editBook(editBookId, bookFormData);
    editBookId = '';

    formElement.reset();
    await onLoad();
}

async function editBook(bookId, book){
    const editBookURL = baseUrl + `/${bookId}`;
    
    await request(editBookURL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
    });
}

async function onDelete(e){
    const bookId = e.target.parentNode.id;

    await deleteBook(bookId);
    await onLoad();
}

async function deleteBook(bookId){
    const deleteBookURL = baseUrl + `/${bookId}`;

    await request(deleteBookURL, {
        method: 'DELETE'
    });
}