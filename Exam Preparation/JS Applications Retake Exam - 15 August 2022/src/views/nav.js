import { logoutUser } from "../api/user.js";
import { render, html, page } from "../lib.js";
import { getUserData } from "../utils.js";

const headerRoot = document.querySelector('header');

const navTemplate = (hasUser) => html`
    <a id="logo" href="/">
        <img id="logo-img" src="./images/logo.png" alt=""/>
    </a>

    <nav>
        <div>
        <a href="/catalog">Dashboard</a>
        <a href="/search">Search</a>
        </div>
        
        ${!hasUser ? html`<div class="guest">
                <a href="/login">Login</a>
                <a href="/register">Register</a>
            </div>`
           : html`
             <div class="user">
                <a href="/create">Add Pair</a>
                <a @click=${onLogout} href="javascript:void(0)">Logout</a>
             </div>`
        }
    </nav>
`;


export function updateNav(){
    const user = getUserData();
    render(navTemplate(user), headerRoot);
}

function onLogout(){
    logoutUser();
    updateNav();
    page.redirect('/catalog');
}