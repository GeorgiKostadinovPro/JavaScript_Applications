import { contacts as data } from "./contacts.js";
import { html, nothing, render } from './node_modules/lit-html/lit-html.js';

const root = document.getElementById('contacts');

const contacts = data.map(x => Object.assign({}, x, { active: false }));

const contactCard = (contact) => html`
    <div class="contact card">
        <div>
            <i class="far fa-user-circle gravatar"></i>
        </div>
        <div class="info">
            <h2>Name: ${contact.name}</h2>
            <button id=${contact.id} class="detailsBtn">Details</button>
            ${contact.active
            ? html`<div class="details">
                <p>Phone number: ${contact.phoneNumber}</p>
                <p>Email: ${contact.email}</p>
            </div>`
            : nothing}
        </div>
    </div>
`; 

root.addEventListener('click', toggleDetails);

updateCurrState();

function updateCurrState(){
    render(contacts.map(contactCard), root);
}

function toggleDetails(e){
    if(e.target.classList.contains('detailsBtn')){
        const contact = contacts.find(x => x.id == e.target.id);
        contact.active = !contact.active;

        updateCurrState();
    }
}