import { loginUser } from '../api/users.js';
import { html } from '../lib.js';
import { createSubmitPackageHandler } from '../utils.js';
import { updateNav } from './navigationView.js';

const loginPageTemplate = (onLogin) => html`
    <section id="login-page" class="auth">
        <form @submit=${onLogin} id="login">
            <h1 class="title">Login</h1>

            <article class="input-group">
                <label for="login-email">Email: </label>
                <input type="email" id="login-email" name="email">
            </article>

            <article class="input-group">
                <label for="password">Password: </label>
                <input type="password" id="password" name="password">
            </article>

            <input type="submit" class="btn submit-btn" value="Log In">
        </form>
    </section>
`;

export function displayLoginView(ctx){
    ctx.render(loginPageTemplate(createSubmitPackageHandler(onLogin)));

    async function onLogin({email, password}){
        if(email === '' || password === ''){
            return alert('Please fill all the fields!');
        }

        await loginUser(email, password);
        updateNav();
        ctx.page.redirect('/');
    }
}