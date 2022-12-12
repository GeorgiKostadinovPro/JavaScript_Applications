import { page } from "./lib.js";
import { decorateContextMiddleware } from "./middlewares/decorateContext.js";
import { displayCreateFurnitureView } from "./views/createFurnitureView.js";
import { displayDashboardView } from "./views/dashboardView.js";
import { displayEditFurnitureView } from "./views/editFurnitureView.js";
import { displayFurnitureDetailsView } from "./views/furnitureDetailsView.js";
import { displayLoginView } from "./views/loginView.js";
import { diplsayMyFurnitureView } from "./views/myFurnitureView.js";
import { updateNav } from "./views/navigationView.js";
import { displayRegisterView } from "./views/registerView.js";

const rootElement = document.querySelector('.container');

page(decorateContextMiddleware(rootElement));
page('/', displayDashboardView);
page('/furniture/:id', displayFurnitureDetailsView);
page('/myFurniture', diplsayMyFurnitureView);
page('/edit/:id', displayEditFurnitureView);
page('/create', displayCreateFurnitureView);
page('/login', displayLoginView);
page('/register', displayRegisterView)

updateNav();
page.start();