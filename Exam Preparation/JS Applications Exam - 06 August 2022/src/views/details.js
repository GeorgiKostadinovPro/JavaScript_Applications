import { apply, getApllicationsCount, getUserApplications } from '../api/applications.js';
import { deleteById, getById } from '../api/data.js';
import { html, nothing } from '../lib.js';

const detailsPageTemplate = (offer, applications, hasUser, canApply, isOwner, onDelete, onApply) => html`
    <section id="details">
        <div id="details-wrapper">
        <img id="details-img" src=${offer.imageUrl} alt="example1" />
        <p id="details-title">${offer.title}</p>
        <p id="details-category">
            Category: <span id="categories">${offer.category}</span>
        </p>
        <p id="details-salary">
            Salary: <span id="salary-number">${offer.salary}</span>
        </p>
        <div id="info-wrapper">
            <div id="details-description">
            <h4>Description</h4>
            <span>${offer.description}</span>
            </div>
            <div id="details-requirements">
            <h4>Requirements</h4>
            <span>${offer.requirements}</span>
            </div>
        </div>
        <p>Applications: <strong id="applications">${applications}</strong></p>

        <div id="action-buttons">
            ${offerControls(offer, hasUser, canApply, isOwner, onDelete, onApply)}
        </div>
    </section>
`;

function offerControls(offer, hasUser, canApply, isOwner, onDelete, onApply){
    if(!hasUser){
        return nothing;
    }

    if(canApply){
        return html`
        <a @click=${onApply} href="javascript:void(0)" id="apply-btn">Apply</a>
        `;
    }

    if(isOwner){
        return html`
            <a href="/edit/${offer._id}" id="edit-btn">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
        `;
    }
}

export async function displayDetailsView(ctx){
    const id = ctx.params.id;

    const requests = [
        getById(id),
        getApllicationsCount(id)
    ];
    
    const hasUser = Boolean(ctx.user);

    if(hasUser){
        requests.push(getUserApplications(id, ctx.user._id));
    }
    
    const [offer, applications, userApplicationsCount] = await Promise.all(requests);

    const isOwner = hasUser && ctx.user._id === offer._ownerId;
    const canApply =  !isOwner && userApplicationsCount === 0;

    ctx.render(detailsPageTemplate(offer, applications, hasUser, canApply, isOwner, onDelete, onApply));

    async function onDelete(){
        const choice = confirm('Are you sure you want to delete this offer?');

        if(choice){
            await deleteById(id);
            ctx.page.redirect('/catalog');
        }
    }
    
    async function onApply(){
        await apply(id);
        ctx.page.redirect(`/catalog/${id}`);
    }
}