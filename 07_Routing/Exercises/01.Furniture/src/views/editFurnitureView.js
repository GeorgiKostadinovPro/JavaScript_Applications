import { editFurniture, getFurnitureById } from "../api/requestsApi.js";
import { html } from "../lib.js";
import { createSubmitHandler } from "../utils.js";

const editFurniturePageTemplate = (furniture, onEdit) => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Edit Furniture</h1>
            <p>Please fill all fields.</p>
        </div>
    </div>
    <form @submit=${onEdit}>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="new-make">Make</label>
                    <input class="form-control" id="new-make" type="text" name="make" .value=${furniture.make}>
                </div>
                <div class="form-group has-success">
                    <label class="form-control-label" for="new-model">Model</label>
                    <input class="form-control is-valid" id="new-model" type="text" name="model" .value=${furniture.model}>
                </div>
                <div class="form-group has-danger">
                    <label class="form-control-label" for="new-year">Year</label>
                    <input class="form-control is-invalid" id="new-year" type="number" name="year" .value=${furniture.year}>
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-description">Description</label>
                    <input class="form-control" id="new-description" type="text" name="description" .value=${furniture.description}>
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="new-price">Price</label>
                    <input class="form-control" id="new-price" type="number" name="price" .value=${furniture.price}>
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-image">Image</label>
                    <input class="form-control" id="new-image" type="text" name="img" .value=${furniture.img}>
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-material">Material (optional)</label>
                    <input class="form-control" id="new-material" type="text" name="material" .value=${furniture.material}>
                </div>
                <input type="submit" class="btn btn-info" value="Edit"/>
            </div>
        </div>
    </form>
`;

export async function displayEditFurnitureView(ctx){
    const furnitureId = ctx.params.id;
    const furniture = await getFurnitureById(furnitureId);

    ctx.render(editFurniturePageTemplate(furniture, createSubmitHandler(onEdit)));

    async function onEdit({make, model, year, description, price, img, material}){
        if(make.length < 4 || model.length < 4){
            return alert('Make and Model must be at least 4 symbols long!');
        }

        const parsedYear = Number(year);

        if(parsedYear < 1950 || parsedYear > 2050){
            return alert('Year must be between 1950 and 2050!');
        }

        if(description.length <= 10){
            return alert('Description must be more than 10 symbol!');
        }

        const parsedPrice = Number(price);

        if(parsedPrice < 0){
            return alert('Price must be a positive number!');
        }

        if(img === ''){
            return alert('Image URL is required!');
        }

        const furnitureData = {
            make,
            model,
            year,
            description,
            price,
            img,
            material
        };

        await editFurniture(furnitureId, furnitureData);
        ctx.page.redirect('/');
    }
}