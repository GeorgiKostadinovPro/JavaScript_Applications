import { html, render } from './node_modules/lit-html/lit-html.js';

const baseURL = 'http://localhost:3030/jsonstore/advanced/dropdown';

const root = document.getElementById('menu');
const formElement = document.querySelector('form');
formElement.addEventListener('submit', addItem);

const optionTemplate = (townObj) => html`
    <option .value=${townObj._id}>${townObj.text}</option>
`;

updateCurrState();

async function updateCurrState(){
    let towns = await request(baseURL);
    towns = Object.values(towns);

    render(towns.map(optionTemplate), root);
}

async function addItem(e) {
    e.preventDefault();

    const town = e.currentTarget.querySelector('#itemText');
    const townObj = {
        text: town.value.trim()
    }

    await request(baseURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(townObj)
    });

    await updateCurrState();
    town.value = '';
}

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