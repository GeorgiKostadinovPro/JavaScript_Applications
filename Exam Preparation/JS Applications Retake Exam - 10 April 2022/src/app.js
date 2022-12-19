import { page } from './lib.js';
import { decorateContextMiddleware } from './middlewares/decorateContext.js';
import { displayCreateView } from './views/createView.js';
import { displayDashboardView } from './views/dashboardView.js';
import { displayDetailsView } from './views/detailsView.js';
import { displayEditView } from './views/editView.js';
import { displayLoginView } from './views/loginView.js';
import { updateNav } from './views/navigationView.js';
import { displayRegisterView } from './views/registerView.js';
import { displayUserDashboardView } from './views/userDashboardView.js';

const rootElement = document.getElementById('main-content');

page(decorateContextMiddleware(rootElement));
page('/', displayDashboardView);
page('/posts/:id', displayDetailsView);
page('/userPosts/:id', displayUserDashboardView);
page('/edit/:id', displayEditView);
page('/create', displayCreateView);
page('/login', displayLoginView);
page('/register', displayRegisterView);

updateNav();
page.start();