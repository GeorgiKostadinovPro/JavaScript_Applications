import { getUsersFurniture } from '../api/requestsApi.js';
import { html, nothing } from '../lib.js';

const myFurniturePageTemplate = (usersFurniture) => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>My Furniture</h1>
            <p>This is a list of your publications.</p>
        </div>
    </div>
    ${usersFurniture.length > 0 ? html`
    <div class="row space-top">
        ${usersFurniture.map(furnitureCardTemplate)}
    </div>
    `: nothing}
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

export async function diplsayMyFurnitureView(ctx){
    const userId = ctx.user._id;
    const usersFurniture = await getUsersFurniture(userId);

    ctx.render(myFurniturePageTemplate(usersFurniture));
}