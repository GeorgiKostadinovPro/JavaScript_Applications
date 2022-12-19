import { del, get, post, put } from "./api.js";

export async function getAll(){
    return get('/data/pets?sortBy=_createdOn%20desc&distinct=name');
}

export async function getById(petId){
    return get(`/data/pets/${petId}`);
}

export async function createPet(pet){
    return post(`/data/pets`, pet);
}

export async function editById(petId, pet){
    return put(`/data/pets/${petId}`, pet);
}

export async function deleteById(petId){
    return del(`/data/pets/${petId}`);
}