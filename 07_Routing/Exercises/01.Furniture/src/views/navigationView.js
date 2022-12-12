import { logoutUser } from '../api/usersApi.js';
import { html, render, page } from '../lib.js'; 
import { getUserData } from '../utils.js';

const headerRootElement = document.querySelector('header');

const navigationBarTemplate = (hasUser) => html`
    <h1>
        <a href="/">Furniture Store</a>
    </h1>
    <nav>
        <a id="catalogLink" href="/" class="active">Dashboard</a>
        ${!hasUser ? html`
        <div id="guest">
            <a id="loginLink" href="/login">Login</a>
            <a id="registerLink" href="/register">Register</a>
        </div>
        `: html`
        <div id="user">
            <a id="createLink" href="/create">Create Furniture</a>
            <a id="profileLink" href="/myFurniture">My Publications</a>
            <a @click=${onLogout} id="logoutBtn" href="javascript:void(0)">Logout</a>
        </div>
        `}
        
    </nav>
`;

export function updateNav(){
    const hasUser = Boolean(getUserData());
    render(navigationBarTemplate(hasUser), headerRootElement);
}

function onLogout(){
    logoutUser();
    updateNav();
    page.redirect('/');
}