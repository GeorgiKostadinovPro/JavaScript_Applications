
import { searchByBrand } from "../api/search.js";
import { html, nothing } from "../lib.js";
import { createSubmitHandler } from "../utils.js";

const searchPageTemplate = (shoesCollection, hasUser, onSearch) => html`
<section id="search">
          <h2>Search by Brand</h2>

          <form @submit=${onSearch} class="search-wrapper cf">
            <input
              id="#search-input"
              type="text"
              name="search"
              placeholder="Search here..."
              required
            />
            <button type="submit">Search</button>
          </form>

          <h3>Results:</h3>

          <div id="search-container">
            ${shoesCollection.length > 0 ? html`
            <ul class="card-wrapper">
              ${shoesCollection.map(x => shoesCardTemplate(x, hasUser))}
            </ul>
            `: html`
            <h2>There are no results found.</h2> 
            `}
          </div>
        </section>
`; 

const shoesCardTemplate = (shoes, hasUser) => html`
    <li class="card">
        <img src=${shoes.imageUrl} alt="travis" />
        <p>
            <strong>Brand: </strong><span class="brand">${shoes.brand}</span>
        </p>
        <p>
            <strong>Model: </strong
            ><span class="model">${shoes.model}</span>
        </p>
        <p><strong>Value:</strong><span class="value">${shoes.value}</span>$</p>
        ${hasUser ? html`
        <a class="details-btn" href="/catalog/${shoes._id}">Details</a>
        `: nothing}
        </li>
`;

export function displaySearchView(ctx){
    const hasUser = Boolean(ctx.user);
    ctx.render(searchPageTemplate([], hasUser, createSubmitHandler(onSearch)));

    async function onSearch({ search }){
      if(search === ''){
        return alert('Please, fill the filed!');
      }

      const shoes = await searchByBrand(search.toLowerCase());
      ctx.render(searchPageTemplate(shoes, hasUser, createSubmitHandler(onSearch)));
    }
}