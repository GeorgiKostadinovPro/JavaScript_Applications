import { html, render } from "./node_modules/lit-html/lit-html.js";

let townsDB = [];

const formElement = document.querySelector('form.content');
const root = document.getElementById('root');

const liTemplate = (town) => html`
    <li>${town}</li>
`;

const ulTemplate = (towns) => html`
    <ul>
        ${towns.map(liTemplate)}
    </ul>
`;

formElement.addEventListener('submit', onSubmit);

function updateCurrState(){
    render(ulTemplate(townsDB), root);
}

function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const towns = formData.get('towns').trim();
    townsDB = towns
    .split(', ')
    .filter(x => x !== '');

    updateCurrState();
}
