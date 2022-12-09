import { html, render } from '../utils.js';

const bodyTemplate = html`
  <button id="loadBooks">LOAD ALL BOOKS</button>
  <table>
    <thead>
      <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <!-- books go here -->
    </tbody>
  </table>

  <div id="forms">
    <!--  form goes here -->
  </div>
`;

export function displayBodyTemplate() {
  const root = document.querySelector('body');
  render(bodyTemplate, root);
}
