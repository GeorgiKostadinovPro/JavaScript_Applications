import { del, get, post, put } from "./api.js";

export async function getAllAlbums(){
    return get('/data/albums?sortBy=_createdOn%20desc');
}

export async function getAlbumById(albumId){
    return get(`/data/albums/${albumId}`);
}

export async function createAlbum(albumData){
    return post('/data/albums', albumData);
}

export async function editAlbum(albumId, albumData){
    return put(`/data/albums/${albumId}`, albumData);
}

export async function deleteAlbumById(albumId){
    return del(`/data/albums/${albumId}`);
}