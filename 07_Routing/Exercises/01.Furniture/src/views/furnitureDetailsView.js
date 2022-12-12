import { deleteFurnitureById, getFurnitureById } from "../api/requestsApi.js";
import { html, nothing } from "../lib.js";

const furnitureDetailsPageTemplate = (furniture, isOwner, onDelete) => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Furniture Details</h1>
        </div>
    </div>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="card text-white bg-primary">
                <div class="card-body">
                    <img src=${furniture.img} />
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <p>Make: <span>${furniture.make}</span></p>
            <p>Model: <span>${furniture.model}</span></p>
            <p>Year: <span>${furniture.year}</span></p>
            <p>Description: <span>${furniture.description}</span></p>
            <p>Price: <span>${furniture.price}</span></p>
            <p>Material: <span>${furniture.material}</span></p>
            ${isOwner  ? html`
            <div>
                <a href="/edit/${furniture._id}" class="btn btn-info">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" class="btn btn-red">Delete</a>
            </div>
            `: nothing}
        </div>
    </div>
`;

export async function displayFurnitureDetailsView(ctx){
    const furnitureId = ctx.params.id;
    const furniture = await getFurnitureById(furnitureId);

    const hasUser = Boolean(ctx.user);
    const isOwner  = hasUser && ctx.user._id === furniture._ownerId;

    ctx.render(furnitureDetailsPageTemplate(furniture, isOwner, onDelete));

    async function onDelete(){
        const confirmationChoice = confirm('Are you sure you want to delete this furniture?');

        if(confirmationChoice){
            await deleteFurnitureById(furnitureId);
            ctx.page.redirect('/');
        }
    }
}