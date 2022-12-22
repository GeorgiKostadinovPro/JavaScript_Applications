import { getAllAlbumLikesCount, getAllUserLikesPerAlbumCount, likeAlbum } from '../api/likesApi.js';
import { deleteAlbumById, getAlbumById } from '../api/requestsApi.js';
import { html, nothing } from '../lib.js';

const albumDetailsPageTemplate = (album, albumLikes, hasUser, canUserLike, isOwner, onDelete, onLike) => html`
    <!-- Details page -->
    <section id="details">
        <div id="details-wrapper">
          <p id="details-title">Album Details</p>
          <div id="img-wrapper">
            <img src=${album.imageUrl} alt="example1" />
          </div>
          <div id="info-wrapper">
            <p><strong>Band:</strong><span id="details-singer">${album.singer}</span></p>
            <p>
              <strong>Album name:</strong><span id="details-album">${album.album}</span>
            </p>
            <p><strong>Release date:</strong><span id="details-release">${album.release}</span></p>
            <p><strong>Label:</strong><span id="details-label">${album.label}</span></p>
            <p><strong>Sales:</strong><span id="details-sales">${album.sales}</span></p>
          </div>
          <div id="likes">Likes: <span id="likes-count">${albumLikes}</span></div>

          ${albumDetailsAdditionalControls(album, hasUser, canUserLike, isOwner, onDelete, onLike)}
          
        </div>
    </section>
`;

function albumDetailsAdditionalControls(album,  hasUser, canUserLike, isOwner, onDelete, onLike){
  if(!hasUser){
    return nothing;
  }

  if(canUserLike){
    return html`
      <div id="action-buttons">
        <a @click=${onLike} href="javascript:void(0)" id="like-btn">Like</a>
      </div>
    `;
  }

  if(isOwner){
    return html`
      <div id="action-buttons">
        <a href="/edit/${album._id}" id="edit-btn">Edit</a>
        <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
      </div>
    `;
  }
}

export async function displayAlbumDetailsView(ctx){
    const albumId = ctx.params.id;

    const requests = [
      getAlbumById(albumId),
      getAllAlbumLikesCount(albumId)
    ];
    
    const hasUser = Boolean(ctx.user);

    if(hasUser){
      requests.push(getAllUserLikesPerAlbumCount(albumId, ctx.user._id));
    }

    const [album, albumLikes, userLikes] = await Promise.all(requests);

    const isOwner = hasUser && ctx.user._id === album._ownerId;
    const canUserLike = !isOwner && userLikes === 0;

    ctx.render(albumDetailsPageTemplate(album, albumLikes, hasUser, canUserLike, isOwner, onDelete, onLike));

    async function onDelete(){
        const confirmationChoice = confirm('Are you sure you want to delete this album?');

        if(confirmationChoice){
            await deleteAlbumById(albumId);
            ctx.page.redirect('/albums');
        }
    }

    async function onLike(){
      const likeData = { albumId };

      await likeAlbum(likeData);
      ctx.page.redirect(`/albums/${albumId}`);
    }
}