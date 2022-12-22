import { get, post } from "./api.js";

export async function likeAlbum(likeObj){
    return post('/data/likes', likeObj);
}

export async function getAllAlbumLikesCount(albumId){
    return get(`/data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`);
}

export async function getAllUserLikesPerAlbumCount(albumId, userId){
    return get(`/data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
}