import { clearUserInfo, setUserInfo } from "../utilities.js";
import { get, post } from "./api.js";

async function loginUser(email, password){
    const userData = { email, password };
    const { _id, email: resultEmail, accessToken } = await post('/users/login', userData);

    setUserInfo({
        _id,
        email: resultEmail,
        accessToken
    });
}

async function registerUser(email, password){
    const userData = { email, password };
    const { _id, email: resultEmail, accessToken } = await post('/users/register', userData);

    setUserInfo({
        _id,
        email: resultEmail,
        accessToken
    });
}

async function logoutUser(){
    get('/users/logout');
    clearUserInfo();
}

export {
    loginUser,
    registerUser,
    logoutUser
}