import { html } from '../lib.js';
import { getAllPostsByUserId } from '../api/data.js';

const userDashboardTemplate = (userPosts) => html`
    <section id="my-posts-page">
        <h1 class="title">My Posts</h1>

        <!-- Display a div with information about every post (if any)-->
        ${userPosts.length > 0 ? html`
        <div class="my-posts">
            ${userPosts.map(postTemplate)}
        </div>
        `
        : html`
        <!-- Display an h1 if there are no posts -->
        <h1 class="title no-posts-title">You have no posts yet!</h1>
        `}
    </section>
`;

const postTemplate = (post) => html`
    <div class="post">
        <h2 class="post-title">${post.title}</h2>
        <img class="post-image" src=${post.imageUrl} alt="Material Image">
        <div class="btn-wrapper">
            <a href="/posts/${post._id}" class="details-btn btn">Details</a>
        </div>
    </div>
`;

export async function displayUserDashboardView(ctx){
    const userId = ctx.params.id;
    const userPosts = await getAllPostsByUserId(userId);

    ctx.render(userDashboardTemplate(userPosts));
}