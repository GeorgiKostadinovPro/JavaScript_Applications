import { html, render } from './node_modules/lit-html/lit-html.js';

const baseURL = 'http://localhost:3030/jsonstore/advanced/table';
const root = document.querySelector('.container tbody');

const trTemplate = (personObj) => html`
   <tr>
         <td>${personObj.firstName} ${personObj.lastName}</td>
         <td>${personObj.email}</td>
         <td>${personObj.course}</td>
   </tr>
`;

function solve() {
   document.querySelector('#searchBtn').addEventListener('click', onClick);

   function onClick() {
      const searchInputElement = document.getElementById('searchField');
      const trElements = Array.from(document.querySelectorAll('.container tbody tr'));

      trElements.forEach(el => {
         if(el.textContent.toLowerCase().includes(searchInputElement.value.toLowerCase())){
            el.classList.add('select');
         }else{
            el.classList.remove('select');
         }
      });

      updateCurrState();
      searchInputElement.value = '';
   }
}

updateCurrState();

async function updateCurrState(){
   let data = await request(baseURL);
   data = Object.values(data);

   render(data.map(trTemplate), root);
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

solve();