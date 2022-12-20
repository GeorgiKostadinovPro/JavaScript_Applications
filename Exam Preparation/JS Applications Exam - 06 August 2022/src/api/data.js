import { del, get, post, put } from "./api.js";

export async function getAll(){
    return get('/data/offers?sortBy=_createdOn%20desc');
}

export async function getById(id){
    return get(`/data/offers/${id}`);
}

export async function createOffer(offer){
    return post('/data/offers', offer);
}

export async function updateOffer(id, offer){
    return put(`/data/offers/${id}`, offer);
}

export async function deleteById(id){
    return del(`/data/offers/${id}`);
}