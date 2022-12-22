import { registerUser } from '../api/usersApi.js';
import { html } from '../lib.js';
import { createSubmitPackageHandler } from '../utilities.js';
import { updateNav } from './navigationView.js';

const loginPageTemplate = (onRegister) => html`
    <section id="register">
        <div class="form">
          <h2>Register</h2>
          <form @submit=${onRegister} class="login-form">
            <input type="text" name="email" id="register-email" placeholder="email" />
            <input type="password" name="password" id="register-password" placeholder="password" />
            <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
            <button type="submit">register</button>
            <p class="message">Already registered? <a href="/login">Login</a></p>
          </form>
        </div>
      </section>
`;

export function displayRegisterView(ctx){
    ctx.render(loginPageTemplate(createSubmitPackageHandler(onRegister)));

    async function onRegister(userData){
        const { email, password } = userData;
        const repeatPassword = userData['re-password'];

        if(email === '' || password === '' 
        || repeatPassword === ''){
            return alert('Please fill all the empty fields!');
        }

        if(password !== repeatPassword){
            return alert('Password don\'t match!');
        }

        await registerUser(email, password);
        updateNav();
        ctx.page.redirect('/albums');
    }
}