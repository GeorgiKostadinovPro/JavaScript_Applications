import { logoutUser } from "../api/users.js";
import { html, render, page } from "../lib.js";
import { getUserData } from "../utils.js";

const headerRoot = document.querySelector('header');

const navigationTemplate = (user) => html`
 <!-- Navigation -->
    <h1><a href="/">Orphelp</a></h1>
    <nav>
        <a href="/">Dashboard</a>

    ${!user ? html` 
        <!-- Guest users -->
        <div id="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
        </div>
    `: html`
        <!-- Logged-in users -->
        <div id="user">
            <a href="/userPosts/${user._id}">My Posts</a>
            <a href="/create">Create Post</a>
            <a @click=${onLogout} href="javascript:void(0)">Logout</a>
        </div>
    `}

    </nav>
`;

export function updateNav(){
    const user = getUserData();

    render(navigationTemplate(user), headerRoot);
}

function onLogout(){
    logoutUser();
    updateNav();
    page.redirect('/');
}