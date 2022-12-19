import { deletePostById, getPostById } from '../api/data.js';
import { donate, getPostDonationsCount, getUserDonationsForPostCount } from '../api/donations.js';
import { html, nothing } from '../lib.js';

const detailsPageTemplate = (post, donations, hasUser, canDonate, isOwner, onDelete, onDonate) => html`
    <section id="details-page">
        <h1 class="title">Post Details</h1>

        <div id="container">
            <div id="details">
                <div class="image-wrapper">
                    <img src=${post.imageUrl} alt="Material Image" class="post-image">
                </div>
                <div class="info">
                    <h2 class="title post-title">${post.title}</h2>
                    <p class="post-description">Description: ${post.description}</p>
                    <p class="post-address">${post.address}</p>
                    <p class="post-number">Phone number: ${post.phone}</p>
                    <p class="donate-Item">Donate Materials: ${donations}</p>

                    <!--Edit and Delete are only for creator-->
                    ${postControls(post, hasUser, canDonate, isOwner, onDelete, onDonate)}
                </div>
            </div>
        </div>
    </section>
`;

function postControls(post, hasUser, canDonate, isOwner, onDelete, onDonate){
    if(!hasUser){
        return nothing;
    }

    if(canDonate){
        return html`
         <div class="btns">
            <a @click=${onDonate} href="javascript:void(0)" class="donate-btn btn">Donate</a>
         </div>
        `;
    }

    if(isOwner){
        return html`
        <div class="btns">
            <a href="/edit/${post._id}" class="edit-btn btn">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" class="delete-btn btn">Delete</a>
        </div>
        `;
    }
}

export async function displayDetailsView(ctx){
    const postId = ctx.params.id;

    const requests = [
        getPostById(postId),
        getPostDonationsCount(postId)
    ];
    
    const hasUser = Boolean(ctx.user);

    if(hasUser){
        requests.push(getUserDonationsForPostCount(postId, ctx.user._id));
    }

    const [post, donations, userDonations] = await Promise.all(requests);
    
    const isOwner = hasUser && ctx.user._id === post._ownerId;
    const canDonate = !isOwner && userDonations === 0;

    ctx.render(detailsPageTemplate(post, donations, hasUser, canDonate, isOwner, onDelete, onDonate));

    async function onDelete(){
        const choice = confirm('Are you sure you want to delete this post?');

        if(choice){
            await deletePostById(postId);
            ctx.page.redirect('/');
        }
    }

    async function onDonate(){
        await donate(postId);
        ctx.page.redirect(`/posts/${postId}`);
    }
}