import { logoutUser } from '../api/user.js';
import { html, render, page } from '../lib.js';
import { getUserData } from '../utils.js';

const headerRoot = document.querySelector('header');

const navTemplate = (hasUser) => html`
  <nav>
      <section class="logo">
          <img src="./images/logo.png" alt="logo">
      </section>
      <ul>
          <!--Users and Guest-->
          <li><a href="/">Home</a></li>
          <li><a href="/catalog">Dashboard</a></li>
          
          ${!hasUser 
            ? html` 
            <!--Only Guest-->
              <li class="guest"><a href="/login">Login</a></li>
              <li class="guest"><a href="/register">Register</a></li>
            `
            : html`
            <!--Only Users-->
              <li class="user"><a href="/create">Create Postcard</a></li>
              <li class="user"><a @click=${onLogout} href="javascript:void(0)">Logout</a></li>
            `}
      </ul>
  </nav>
`;

export function updateNav() {
    const user = getUserData();
    render(navTemplate(user), headerRoot);
}

function onLogout(){
  logoutUser();
  updateNav();
  page.redirect('/');
}