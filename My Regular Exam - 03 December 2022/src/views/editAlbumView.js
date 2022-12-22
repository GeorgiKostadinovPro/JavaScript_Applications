import { getAlbumById, editAlbum } from '../api/requestsApi.js';
import { html } from '../lib.js';
import { createSubmitPackageHandler } from '../utilities.js';

const editAlbumPageTemplate = (album, onEdit) => html`
    <!-- Edit Page (Only for logged-in users) -->
    <section id="edit">
        <div class="form">
          <h2>Edit Album</h2>
          <form @submit=${onEdit} class="edit-form">
            <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" .value=${album.singer} />
            <input type="text" name="album" id="album-album" placeholder="Album" .value=${album.album} />
            <input type="text" name="imageUrl" id="album-img" placeholder="Image url" .value=${album.imageUrl} />
            <input type="text" name="release" id="album-release" placeholder="Release date" .value=${album.release} />
            <input type="text" name="label" id="album-label" placeholder="Label" .value=${album.label} />
            <input type="text" name="sales" id="album-sales" placeholder="Sales" .value=${album.sales} />

            <button type="submit">post</button>
          </form>
        </div>
      </section>
`;

export async function displayEditAlbumView(ctx){
    const albumId = ctx.params.id;
    const album = await getAlbumById(albumId);

    ctx.render(editAlbumPageTemplate(album, createSubmitPackageHandler(onEdit)));

    async function onEdit({singer, album, imageUrl, release, label, sales}){
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

        await editAlbum(albumId, albumData);
        ctx.page.redirect(`/albums/${albumId}`);
    }
}