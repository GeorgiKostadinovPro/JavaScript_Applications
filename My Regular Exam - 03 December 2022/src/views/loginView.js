import { loginUser } from '../api/usersApi.js';
import { html } from '../lib.js';
import { createSubmitPackageHandler } from '../utilities.js';
import { updateNav } from './navigationView.js';

const loginPageTemplate = (onLogin) => html`
    <section id="login">
        <div class="form">
          <h2>Login</h2>
          <form @submit=${onLogin} class="login-form">
            <input type="text" name="email" id="email" placeholder="email" />
            <input type="password" name="password" id="password" placeholder="password" />
            <button type="submit">login</button>
            <p class="message">
              Not registered? <a href="/register">Create an account</a>
            </p>
          </form>
        </div>
    </section>
`;

export function displayLoginView(ctx){
    ctx.render(loginPageTemplate(createSubmitPackageHandler(onLogin)));

    async function onLogin({email, password}){
        if(email === '' || password === ''){
            return alert('Please fill all the empty fields!');
        }

        await loginUser(email, password);
        updateNav();
        ctx.page.redirect('/albums');
    }
}