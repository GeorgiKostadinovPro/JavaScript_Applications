import { cats } from './catSeeder.js';
import { html, nothing, render } from './node_modules/lit-html/lit-html.js';

const root = document.getElementById('allCats');

const catLiTemplate = (cat) => html`
    <li>
        <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
        <div class="info">
            <button class="showBtn">Show status code</button>
            <div class="status" style="display: none" id=${cat.id}>
                <h4>Status Code: ${cat.statusCode}</h4>
                <p>${cat.statusMessage}</p>
            </div>
        </div>
    </li>
`;

const catsUlTemplate = (cats) => html`
    <ul>
        ${cats.length > 0 
        ? cats.map(catLiTemplate)
        : nothing}
    </ul> 
`;

updateCurrState();

function updateCurrState(){
    render(catsUlTemplate(cats), root);
}

root.addEventListener('click', reviewCat);

function reviewCat(e){
    if(e.target.classList.contains('showBtn')){
        const catStatusDivElement = e.target.parentNode
        .querySelector('.status');

        if(e.target.textContent === 'Show status code'){
            catStatusDivElement.style.display = 'block';
            e.target.textContent = 'Hide status code';
        }else{
            catStatusDivElement.style.display = 'none';
            e.target.textContent = 'Show status code';
        }

        updateCurrState();
    }
}