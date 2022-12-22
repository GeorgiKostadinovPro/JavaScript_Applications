import { logoutUser } from '../api/usersApi.js';
import { html, render, page } from '../lib.js';
import { getUserInfo } from '../utilities.js';

const headerRootElement = document.querySelector('header');

const navigationBarTemplate = (hasUser) => html`
    <!-- Navigation -->
    <a id="logo" href="/"><img id="logo-img" src="./images/logo.png" alt="" /></a>

    <nav>
       <div>
          <a href="/albums">Dashboard</a>
       </div>
    
    ${!hasUser ? html`
        <!-- Guest users -->
        <div class="guest">
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>
    `: html`
    <!-- Logged-in users -->
        <div class="user">
          <a href="/create">Add Album</a>
          <a @click=${onLogout} href="javascript:void(0)">Logout</a>
        </div>
    `}
    </nav>
`;

export function updateNav(){
    const hasUser = Boolean(getUserInfo());

    render(navigationBarTemplate(hasUser), headerRootElement);
}

function onLogout(){
    logoutUser();
    updateNav();
    page.redirect('/albums');
}