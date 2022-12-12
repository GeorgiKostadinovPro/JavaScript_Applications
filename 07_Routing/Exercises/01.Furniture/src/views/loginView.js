import { loginUser } from '../api/usersApi.js';
import { html } from '../lib.js';
import { createSubmitHandler } from '../utils.js';
import { updateNav } from './navigationView.js';

const loginPageTemplate = (onLogin) => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Login User</h1>
            <p>Please fill all fields.</p>
        </div>
    </div>
    <form @submit=${onLogin}>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="email">Email</label>
                    <input class="form-control" id="email" type="text" name="email">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="password">Password</label>
                    <input class="form-control" id="password" type="password" name="password">
                </div>
                <input type="submit" class="btn btn-primary" value="Login" />
            </div>
        </div>
    </form>
`;

export function displayLoginView(ctx){
    ctx.render(loginPageTemplate(createSubmitHandler(onLogin)));

    async function onLogin({email, password}){
        if(email === '' || password === ''){
            return alert('Please fill all the empty fields!');
        }

        await loginUser(email, password);
        updateNav();
        ctx.page.redirect('/');
    }
}