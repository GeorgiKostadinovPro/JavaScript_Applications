import { render } from "../lib.js";
import { getUserInfo } from "../utilities.js";
import { updateNav } from "../views/navigationView.js";

export function decorateContextMiddleware(rootElement){
    return function(ctx, next) {
        ctx.render = (content) => render(content, rootElement);
        ctx.updateNav = updateNav();

        const user = getUserInfo();

        if(user){
            ctx.user = user;
        }

        next();
    }
}