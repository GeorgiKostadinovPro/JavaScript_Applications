import { getAllPosts } from "../api/data.js";
import { html } from "../lib.js";

const dashboardPageTemplate = (allPosts) => html`
    <section id="dashboard-page">
        <h1 class="title">All Posts</h1>
        
        ${allPosts.length > 0 
        ? html`
        <div class="all-posts">
            ${allPosts.map(postTemplate)}
        </div>
        `
        : html`
          <h1 class="title no-posts-title">No posts yet!</h1>
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

export async function displayDashboardView(ctx){
    const allPosts = await getAllPosts();

    ctx.render(dashboardPageTemplate(allPosts));
}