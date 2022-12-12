import { getAllFurniture } from '../api/requestsApi.js';
import { html, nothing } from '../lib.js';

const dashboardPageTemplate = (allFurniture) => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Welcome to Furniture System</h1>
            <p>Select furniture from the catalog to view details.</p>
        </div>
    </div>
    ${allFurniture.length > 0 ? html`
    <div class="row space-top">
        ${allFurniture.map(furnitureCardTemplate)}
    </div>
    ` : nothing}
`;

const furnitureCardTemplate = (furniture) => html`
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                    <img src=${furniture.img} />
                    <p>${furniture.description}</p>
                    <footer>
                        <p>Price: <span>${furniture.price} $</span></p>
                    </footer>
                    <div>
                        <a href="/furniture/${furniture._id}" class="btn btn-info">Details</a>
                    </div>
            </div>
        </div>
    </div>
`;

export async function displayDashboardView(ctx){
    const allFurniture = await getAllFurniture();

    ctx.render(dashboardPageTemplate(allFurniture));
}