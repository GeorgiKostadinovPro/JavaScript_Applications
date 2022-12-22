import { page } from './lib.js';
import { decorateContextMiddleware } from './middlewares/decorateContext.js';
import { displayAlbumDetailsView } from './views/albumDetailsView.js';
import { displayCreateAlbumView } from './views/createAlbumView.js';
import { displayDashboardView } from './views/dashboardView.js';
import { displayEditAlbumView } from './views/editAlbumView.js';
import { displayHomeView } from './views/homeView.js';
import { displayLoginView } from './views/loginView.js';
import { updateNav } from './views/navigationView.js';
import { displayRegisterView } from './views/registerView.js';

const rootElement = document.querySelector('main');

page(decorateContextMiddleware(rootElement));
page('/', displayHomeView);
page('/albums', displayDashboardView);
page('/albums/:id', displayAlbumDetailsView);
page('/edit/:id', displayEditAlbumView);
page('/create', displayCreateAlbumView);
page('/login', displayLoginView);
page('/register', displayRegisterView);

updateNav();
page.start();