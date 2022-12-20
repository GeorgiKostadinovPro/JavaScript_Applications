import { page, render } from './lib.js';
import { getUserData } from './utils.js';
import { displayCatalogView } from './views/catalog.js';
import { dipslayCreateView } from './views/create.js';
import { displayDetailsView } from './views/details.js';
import { displayEditView } from './views/edit.js';
import { displayHomeView } from './views/home.js';
import { displayLoginView } from './views/login.js';
import { updateNav } from './views/nav.js';
import { displayRegisterView } from './views/register.js';
import { displaySearchView } from './views/search.js';

const root = document.querySelector('main');

page(decorateContent);
page('/', displayHomeView);
page('/catalog', displayCatalogView);
page('/catalog/:id', displayDetailsView);
page('/edit/:id', displayEditView);
page('/create', dipslayCreateView);
page('/login', displayLoginView);
page('/register', displayRegisterView);
page('/search', displaySearchView);

updateNav();
page.start();

function decorateContent(ctx, next){
    ctx.render = (content) => render(content, root);
    ctx.updateNav = updateNav;

    const user = getUserData();

    if(user){
        ctx.user = user;
    }

    next();
}