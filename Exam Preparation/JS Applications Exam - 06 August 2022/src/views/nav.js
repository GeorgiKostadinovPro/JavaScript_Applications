import { logoutUser } from "../api/users.js";
import { html, render, page } from "../lib.js";
import { getUserData } from "../utils.js";

const headerRoot = document.querySelector('header');

const navigationBarTemplate = (hasUser) => html`
    <!-- Navigation -->
    <a id="logo" href="/"
        ><img id="logo-img" src="./images/logo.jpg" alt=""
    /></a>

    <nav>
        <div>
        <a href="/catalog">Dashboard</a>
        </div>

        ${!hasUser ? html`
        <div class="guest">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
        </div>`
        : html`
        <div class="user">
        <a href="/create">Create Offer</a>
        <a @click=${onLogout} href="javascript:void(0)">Logout</a>
        </div>`}
    </nav>
`;

export function updateNav(){
    const hasUser = Boolean(getUserData());
    render(navigationBarTemplate(hasUser), headerRoot);
}

function onLogout(){
    logoutUser();
    updateNav();
    page.redirect('/catalog');
}