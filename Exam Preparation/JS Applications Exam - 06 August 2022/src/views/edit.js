import { getById, updateOffer } from '../api/data.js';
import { html } from '../lib.js';
import { createSubmitHandler } from '../utils.js';

const editPageTemplate = (offer, onEdit) => html`
    <section id="edit">
          <div class="form">
            <h2>Edit Offer</h2>
            <form @submit=${onEdit} class="edit-form">
              <input
                type="text"
                name="title"
                id="job-title"
                placeholder="Title"
                .value=${offer.title}
              />
              <input
                type="text"
                name="imageUrl"
                id="job-logo"
                placeholder="Company logo url"
                .value=${offer.imageUrl}
              />
              <input
                type="text"
                name="category"
                id="job-category"
                placeholder="Category"
                .value=${offer.category}
              />
              <textarea
                id="job-description"
                name="description"
                placeholder="Description"
                rows="4"
                cols="50"
                .value=${offer.description}
              ></textarea>
              <textarea
                id="job-requirements"
                name="requirements"
                placeholder="Requirements"
                rows="4"
                cols="50"
                .value=${offer.requirements}
              ></textarea>
              <input
                type="text"
                name="salary"
                id="job-salary"
                placeholder="Salary"
                .value=${offer.salary}
              />

              <button type="submit">post</button>
            </form>
          </div>
    </section>
`;

export async function displayEditView(ctx){
    const id = ctx.params.id;
    const offer = await getById(id);

    ctx.render(editPageTemplate(offer, createSubmitHandler(onEdit)));

    async function onEdit({title, imageUrl, category, description, requirements, salary}){
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

        await updateOffer(id, offerData);
        ctx.page.redirect(`/catalog/${id}`);
    }
}