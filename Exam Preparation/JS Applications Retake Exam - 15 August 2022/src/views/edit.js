import { getById, updateById } from '../api/data.js';
import { html } from '../lib.js';
import { createSubmitHandler } from '../utils.js';

const editPageTemplate = (shoes, onEdit) => html`
    <section id="edit">
        <div class="form">
        <h2>Edit item</h2>
        <form @submit=${onEdit} class="edit-form">
            <input
            type="text"
            name="brand"
            id="shoe-brand"
            placeholder="Brand"
            .value=${shoes.brand}
            />
            <input
            type="text"
            name="model"
            id="shoe-model"
            placeholder="Model"
            .value=${shoes.model}
            />
            <input
            type="text"
            name="imageUrl"
            id="shoe-img"
            placeholder="Image url"
            .value=${shoes.imageUrl}
            />
            <input
            type="text"
            name="release"
            id="shoe-release"
            placeholder="Release date"
            .value=${shoes.release}
            />
            <input
            type="text"
            name="designer"
            id="shoe-designer"
            placeholder="Designer"
            .value=${shoes.designer}
            />
            <input
            type="text"
            name="value"
            id="shoe-value"
            placeholder="Value"
            .value=${shoes.value}
            />

            <button type="submit">post</button>
        </form>
        </div>
    </section>
`;

export async function displayEditView(ctx){
    const id = ctx.params.id;
    const shoes = await getById(id);

    ctx.render(editPageTemplate(shoes, createSubmitHandler(onEdit)));

    async function onEdit({brand, model, imageURL, release, designer, value}){
        if(brand === '' || model === ''
        || imageURL === '' || release === ''
        || designer === '' || value === ''){
            return alert('All fields are required!');
        }

        const shoesData = {
            brand,
            model,
            imageURL,
            release,
            designer,
            value
        };

        await updateById(id, shoesData);
        ctx.page.redirect(`/catalog/${id}`);
    }
}