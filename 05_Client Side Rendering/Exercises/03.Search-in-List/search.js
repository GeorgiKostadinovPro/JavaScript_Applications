import { html, nothing, render } from './node_modules/lit-html/lit-html.js';
import { towns } from './towns.js';

const townLiTemplate = (town) => html`
   <li>${town}</li>
`;

const townsUlTemplate = (towns) => html`
   <ul>
      ${towns.length > 0
        ? towns.map(townLiTemplate)
        : nothing}
   </ul>
`;

function search() {
   const root = document.getElementById('towns');
   const searchBtnElement = document.querySelector('button');

   updateCurrState(root);

   searchBtnElement.addEventListener('click', searchInList);
}

function updateCurrState(root){
   render(townsUlTemplate(towns), root);
}

function searchInList(e){
   const townLiElements = Array.from(e.currentTarget
      .parentNode.querySelectorAll('#towns ul li'));

   const searchInputElement = e.currentTarget.parentNode.querySelector('#searchText');
   const resultDivElement = e.currentTarget.parentNode.querySelector('#result');

   let matches = 0;

   townLiElements.forEach(el => {
      if(el.textContent.includes(searchInputElement.value)){
         el.classList.add('active');
         matches++;
      }else{
         el.classList.remove('active');
      }
   });

   resultDivElement.textContent = `${matches} matches found`;
   updateCurrState();
}

search();
