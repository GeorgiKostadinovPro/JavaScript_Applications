import { getUserData, clearUserData } from "../utils.js";

const host = 'http://localhost:3030';

async function request(method, url, data){
    const options = {
        method,
        headers: {}
    };

    if(data){
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const user = getUserData();

    if(user){
        options.headers['X-Authorization'] = user.accessToken;
    }

    try {
        const response = await fetch(host + url, options);

        if(response.status === 204){
            return response;
        }
        
        const result = await response.json();

        if(!response.ok){
            if(response.status === 403){
                clearUserData();
            }

            throw new Error(result.message);
        }

        return result;
    } catch (error) {
        alert(error.message);
        throw error;
    }
}

const get = request.bind(null, 'GET');
const post = request.bind(null, 'POST');
const put = request.bind(null, 'PUT');
const del = request.bind(null, 'DELETE');

export {
    get,
    post,
    put,
    del
}