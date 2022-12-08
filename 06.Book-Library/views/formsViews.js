import { render, html } from '../utils.js';

const addFormTemplate = html`
  <form id="add-form">
    <h3>Add book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title..." />
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author..." />
    <input type="submit" value="Submit" />
  </form>
`;

const editFormTemplate = (bookObj) => html`
  <form id="edit-form">
    <!-- <input type="hidden" name="id" /> -->
    <h3>Edit book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title..." .value=${bookObj.title} />
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author..." .value=${bookObj.author} />
    <input type="submit" value="Save" />
  </form>
`;

function displayFormTemplate(form) {
  const root = document.getElementById('forms');
  render(form, root);
}

export { displayFormTemplate, addFormTemplate, editFormTemplate };
