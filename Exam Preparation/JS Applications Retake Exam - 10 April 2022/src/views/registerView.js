import { registerUser } from '../api/users.js';
import { html } from '../lib.js';
import { createSubmitPackageHandler } from '../utils.js';
import { updateNav } from './navigationView.js';

const registerPageTemplate = (onRegister) => html`
    <section id="register-page" class="auth">
        <form @submit=${onRegister} id="register">
            <h1 class="title">Register</h1>

            <article class="input-group">
                <label for="register-email">Email: </label>
                <input type="email" id="register-email" name="email">
            </article>

            <article class="input-group">
                <label for="register-password">Password: </label>
                <input type="password" id="register-password" name="password">
            </article>

            <article class="input-group">
                <label for="repeat-password">Repeat Password: </label>
                <input type="password" id="repeat-password" name="repeatPassword">
            </article>

            <input type="submit" class="btn submit-btn" value="Register">
        </form>
    </section>
`;

export function displayRegisterView(ctx){
    ctx.render(registerPageTemplate(createSubmitPackageHandler(onRegister)));

    async function onRegister({email, password, repeatPassword}){
        if(email === '' || password === ''){
            return alert('Please fill all the fields!');
        }

        if(password !== repeatPassword){
            return alert('Passwords don\'t match!');
        }

        await registerUser(email, password);
        updateNav();
        ctx.page.redirect('/');
    }
}