import { clearUserData, setUserData } from "../utils.js";
import { get, post } from "./api.js";

async function loginUser(email, password){
    const userData = { email, password };
    const { _id, email: resultEmail, accessToken } = await post('/users/login', userData);

    setUserData({
        _id,
        email: resultEmail,
        accessToken
    });
}

async function registerUser(email, password){
    const userData = { email, password };
    const { _id, email: resultEmail, accessToken } = await post('/users/register', userData);

    setUserData({
        _id,
        email: resultEmail,
        accessToken
    });
}

async function logoutUser(){
    get('/users/logout');
    clearUserData();
}

export {
    loginUser,
    registerUser,
    logoutUser
}