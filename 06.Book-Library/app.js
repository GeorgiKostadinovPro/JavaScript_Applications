import { displayBodyTemplate } from './views/bodyView.js';
import { showBooks } from './views/bookView.js';
import { addFormTemplate, editFormTemplate, displayFormTemplate } from './views/formsViews.js';
import { getBookById, getAllBooks, createBook, updateBook,deleteBook } from './api/endpoints.js';

onRender();

function onRender() {
  displayBodyTemplate();
  displayFormTemplate(addFormTemplate);
}

document.getElementById('loadBooks').addEventListener('click', loadBooks);

async function loadBooks() {
  const library = await getAllBooks();
  showBooks(library);
}

document.querySelector('table tbody').addEventListener('click', handleContainer);

renderForm();

function renderForm(id) {
  document.querySelector('form').addEventListener('submit', handleForm);
  
  async function handleForm(ev) {
    ev.preventDefault();
    const data = getFormData(ev);
    handleButtons(data, id, ev);
  }
}

function getFormData(ev) {
  const formData = new FormData(ev.target);
  const { title, author } = Object.fromEntries(formData);

  if (title == '' || author == '') {
    return alert('All fields are required!');
  }

  return { title, author };
}

async function handleButtons(data, id, ev) {
  if (ev.target.id.includes('add')) {
    await onSubmit(data.title, data.author);
  } else {
    await onSave(id, data.title, data.author);
  }
  ev.target.reset();
}

function handleContainer(ev) {
  if (ev.target.nodeName !== 'BUTTON') {
    return;
  }
  const id = ev.target.dataset.id;
  ev.target.textContent == 'Delete' ? onDelete(id) : onEdit(id);
}

async function onSubmit(author, title) {
  await createBook(author, title);
  loadBooks();
}

async function onSave(id, title, author) {
  await updateBook(id, { title, author });
  displayFormTemplate(addFormTemplate);
  loadBooks();
}

async function onEdit(id) {
  const data = await getBookById(id);
  displayFormTemplate(editFormTemplate(data));
  renderForm(id);
}

async function onDelete(id) {
  await deleteBook(id);
  loadBooks();
}