import { createOffer } from '../api/data.js';
import { html } from '../lib.js';
import { createSubmitHandler } from '../utils.js';

const createPageTemplate = (onCreate) => html`
    <section id="create">
        <div class="form">
        <h2>Create Offer</h2>
        <form @submit=${onCreate} class="create-form">
            <input
            type="text"
            name="title"
            id="job-title"
            placeholder="Title"
            />
            <input
            type="text"
            name="imageUrl"
            id="job-logo"
            placeholder="Company logo url"
            />
            <input
            type="text"
            name="category"
            id="job-category"
            placeholder="Category"
            />
            <textarea
            id="job-description"
            name="description"
            placeholder="Description"
            rows="4"
            cols="50"
            ></textarea>
            <textarea
            id="job-requirements"
            name="requirements"
            placeholder="Requirements"
            rows="4"
            cols="50"
            ></textarea>
            <input
            type="text"
            name="salary"
            id="job-salary"
            placeholder="Salary"
            />

            <button type="submit">post</button>
        </form>
        </div>
    </section>
`;

export function displayCreateView(ctx){
    ctx.render(createPageTemplate(createSubmitHandler(onCreate)));

    async function onCreate({title, imageUrl, category, description, requirements, salary}){
        const fields = [title, imageUrl, category, description, requirements, salary];

        if(fields.some(x => x === '')){
            return alert('Please, fill all the empty fields!');
        }

        const offerData = {
            title, 
            imageUrl,
            category,
            description, 
            requirements, 
            salary
        };

        await createOffer(offerData);
        ctx.page.redirect('/catalog');
    }
}