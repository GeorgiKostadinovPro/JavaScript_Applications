import { del, get, post, put } from "./api.js";

export async function getAllPosts(){
    return get('/data/posts?sortBy=_createdOn%20desc');
}

export async function getPostById(postId){
    return get(`/data/posts/${postId}`);
}

export async function getAllPostsByUserId(userId){
    return get(`/data/posts?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export async function createPost(postData){
    return post('/data/posts', postData);
}

export async function updatePostById(postId, postData){
    return put(`/data/posts/${postId}`, postData);
}

export async function deletePostById(postId){
    return del(`/data/posts/${postId}`);
}