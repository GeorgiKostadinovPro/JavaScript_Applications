import { get } from "./api.js";

export async function searchByBrand(brand){
    return get(`/data/shoes?where=brand%20LIKE%20%22${brand}%22`);
}