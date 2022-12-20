import { del, get, post, put } from './api.js';

export async function getAll(){
    return get('/data/shoes?sortBy=_createdOn%20desc');
}

export async function getById(shoesId){
    return get(`/data/shoes/${shoesId}`);
}

export async function createShoes(shoesData){
    return post('/data/shoes', shoesData);
}

export async function updateById(shoesId, shoes){
    return put(`/data/shoes/${shoesId}`, shoes);
}

export async function deleteById(shoesId){
    return del(`/data/shoes/${shoesId}`);
}