import { html, render } from '../utils.js';

const bookTemplate = (book, id) => html`
  <tr>
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>
      <button data-id=${id}>Edit</button>
      <button data-id=${id}>Delete</button>
    </td>
  </tr>
`;

export function showBooks(data) {
  const root = document.querySelector('tbody');

  render(Object.keys(data)
    .map(key => bookTemplate(data[key], key)), root);
}
