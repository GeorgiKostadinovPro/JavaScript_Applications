import { registerUser } from "../api/user.js";
import { html } from "../lib.js";
import { createSubmitHandler } from "../utils.js";

const registerPageTemplate = (onRegister) => html`
    <section id="register">
        <div class="form">
        <h2>Register</h2>
        <form @submit=${onRegister} class="login-form">
            <input
            type="text"
            name="email"
            id="register-email"
            placeholder="email"
            />
            <input
            type="password"
            name="password"
            id="register-password"
            placeholder="password"
            />
            <input
            type="password"
            name="re-password"
            id="repeat-password"
            placeholder="repeat password"
            />
            <button type="submit">login</button>
            <p class="message">Already registered? <a href="/login">Login</a></p>
        </form>
        </div>
    </section>
`;

export function displayRegisterView(ctx){
    ctx.render(registerPageTemplate(createSubmitHandler(onRegister)));

    async function onRegister(userData){
        const email = userData['email'];
        const password = userData['password'];
        const rePass = userData['re-password'];

        if(email === '' || password === ''){
            return alert('All fields are required!');
        }

        if(password !== rePass){
            return alert('Passwords don\'t match!');
        }

        await registerUser(email, password);
        ctx.updateNav();
        ctx.page.redirect('/catalog');
    }
} 