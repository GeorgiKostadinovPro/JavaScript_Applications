import { createAlbum } from '../api/requestsApi.js';
import { html } from '../lib.js';
import { createSubmitPackageHandler } from '../utilities.js';

const createAlbumPageTemplate = (onCreate) => html`
    <!-- Create Page (Only for logged-in users) -->
    <section id="create">
      <div class="form">
        <h2>Add Album</h2>
        <form @submit=${onCreate} class="create-form">
          <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" />
          <input type="text" name="album" id="album-album" placeholder="Album" />
          <input type="text" name="imageUrl" id="album-img" placeholder="Image url" />
          <input type="text" name="release" id="album-release" placeholder="Release date" />
          <input type="text" name="label" id="album-label" placeholder="Label" />
          <input type="text" name="sales" id="album-sales" placeholder="Sales" />

          <button type="submit">post</button>
        </form>
      </div>
    </section>
`;

export function displayCreateAlbumView(ctx){
    ctx.render(createAlbumPageTemplate(createSubmitPackageHandler(onCreate)));

    async function onCreate({singer, album, imageUrl, release, label, sales}){
        const inputFields = [singer, album, imageUrl, release, label, sales];

        if(inputFields.some(x => x === '')){
            return alert('Please fill all the empty fields!');
        }

        const albumData = {
            singer,
            album,
            imageUrl,
            release,
            label,
            sales
        };

        await createAlbum(albumData);
        ctx.page.redirect('/albums');
    }
}