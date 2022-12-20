import { deleteById, getById } from "../api/data.js";
import { html, nothing } from "../lib.js";

const detailsPageTemplate = (shoes, isOwner, onDelete) => html`
    <section id="details">
        <div id="details-wrapper">
        <p id="details-title">Shoe Details</p>
        <div id="img-wrapper">
            <img src=${shoes.imageURL} alt="example1" />
        </div>
        <div id="info-wrapper">
            <p>Brand: <span id="details-brand">${shoes.brand}</span></p>
            <p>
            Model: <span id="details-model">${shoes.model}</span>
            </p>
            <p>Release date: <span id="details-release">${shoes.release}</span></p>
            <p>Designer: <span id="details-designer">${shoes.designer}</span></p>
            <p>Value: <span id="details-value">${shoes.value}</span></p>
        </div>

        <!--Edit and Delete are only for creator-->
        ${isOwner ? html`
        <div id="action-buttons">
            <a href="/edit/${shoes._id}" id="edit-btn">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
        </div>
        `: nothing}
        </div>
    </section>
`;

export async function displayDetailsView(ctx){
    const id = ctx.params.id;
    const shoes = await getById(id);

    const hasUser = Boolean(ctx.user);
    const isOwner = hasUser && ctx.user._id === shoes._ownerId;

    ctx.render(detailsPageTemplate(shoes, isOwner, onDelete));

    async function onDelete(){
        const choice = confirm('Are you sure you want to delete this shoes?');

        if(choice){
            await deleteById(id);
            ctx.page.redirect('/catalog');
        }
    }
}