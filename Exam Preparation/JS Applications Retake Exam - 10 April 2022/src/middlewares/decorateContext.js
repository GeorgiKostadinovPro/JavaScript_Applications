import { render } from '../lib.js';
import { getUserData } from '../utils.js'; 
import { updateNav } from '../views/navigationView.js'; 

export function decorateContextMiddleware(rootElement){
    return function (ctx, next) {
        ctx.render = (content) => render(content, rootElement);
        ctx.updateNav = updateNav;
    
        const user = getUserData();
    
        if(user){
            ctx.user = user;
        }
    
        next();
    }
}