import { get, post, put, del } from './api.js';
const baseURL = '/jsonstore/collections/books';

const endpoints = {
  navigate: function(id){
    return baseURL + '/' + id;
  } 
};

async function getBookById(id) {
  return await get(endpoints.navigate(id));
}

async function getAllBooks() {
  return await get(baseURL);
}

async function createBook(title, author) {
  await post(baseURL, { title, author });
}

async function updateBook(id, book) {
  await put(endpoints.navigate(id), book);
}

async function deleteBook(id) {
  await del(endpoints.navigate(id));
}

export { getBookById, 
         getAllBooks, 
         createBook, 
         updateBook, 
         deleteBook };
   
