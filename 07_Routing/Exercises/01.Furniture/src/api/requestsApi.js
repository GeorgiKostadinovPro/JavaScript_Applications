import { del, get, post, put } from "./api.js";

export async function getAllFurniture(){
    return get('/data/catalog');
}

export async function getFurnitureById(furnitureId){
    return get(`/data/catalog/${furnitureId}`);
}

export async function getUsersFurniture(userId){
    return get(`/data/catalog?where=_ownerId%3D%22${userId}%22`);
}

export async function createFurniture(furnitureData){
    return post('/data/catalog', furnitureData);
}

export async function editFurniture(furnitureId, furnitureData){
    return put(`/data/catalog/${furnitureId}`, furnitureData);
}

export async function deleteFurnitureById(furnitureId){
    return del(`/data/catalog/${furnitureId}`);
}