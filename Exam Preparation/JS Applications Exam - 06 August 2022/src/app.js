import { render, page } from './lib.js';
import { getUserData } from './utils.js';
import { displayDashboardView } from './views/catalog.js';
import { displayCreateView } from './views/create.js';
import { displayDetailsView } from './views/details.js';
import { displayEditView } from './views/edit.js';
import { displayHomeView } from './views/home.js';
import { displayLoginView } from './views/login.js';
import { updateNav } from './views/nav.js';
import { displayRegisterView } from './views/register.js';

const rootElement = document.querySelector('main');

page(decorateContext);
page('/', displayHomeView);
page('/catalog', displayDashboardView);
page('/catalog/:id', displayDetailsView);
page('/create', displayCreateView);
page('/edit/:id', displayEditView);
page('/login', displayLoginView);
page('/register', displayRegisterView);

updateNav();
page.start();

function decorateContext(ctx, next){
    ctx.render = (content) => render(content, rootElement);
    ctx.updateNav = updateNav();

    const user = getUserData();

    if(user){
        ctx.user = user;
    }

    next();
}