import { getAll } from "../api/data.js";
import { html } from "../lib.js";

const catalogPageTemplate = (shoesCollection) => html`
<section id="dashboard">
          <h2>Collectibles</h2>
          ${shoesCollection.length > 0 
            ? html`
            <ul class="card-wrapper">
                ${shoesCollection.map(shoesCardTemplate)}
            </ul>
          `
            : html`
            <h2>There are no items added yet.</h2>
            `}
        </section>
`;

const shoesCardTemplate = (shoes) => html`
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
        <a class="details-btn" href="/catalog/${shoes._id}">Details</a>
    </li>
`;

export async function displayCatalogView(ctx){
    const shoes = await getAll();

    ctx.render(catalogPageTemplate(shoes));
}