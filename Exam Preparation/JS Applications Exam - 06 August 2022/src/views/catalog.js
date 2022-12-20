import { getAll } from '../api/data.js';
import { html } from '../lib.js';

const dashboardPageTemplate = (offers) => html`
    <section id="dashboard">
        <h2>Job Offers</h2>
        <!-- Display a div with information about every post (if any)-->
        ${offers.length > 0
        ? offers.map(offerTemplate)
        : html`
        <!-- Display an h2 if there are no posts -->
        <h2>No offers yet.</h2>
        `}
        
    </section>
`;

const offerTemplate = (offer) => html`
    <div class="offer">
        <img src=${offer.imageUrl} alt="example1" />
        <p>
            <strong>Title: </strong><span class="title">${offer.title}</span>
        </p>
        <p><strong>Salary:</strong><span class="salary">${offer.salary}</span></p>
        <a class="details-btn" href="/catalog/${offer._id}">Details</a>
    </div>
`;

export async function displayDashboardView(ctx){
    const offers = await getAll();

    ctx.render(dashboardPageTemplate(offers));
}