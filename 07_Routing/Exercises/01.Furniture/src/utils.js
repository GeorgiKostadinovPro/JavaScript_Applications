function getUserData(){
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    return userData;
}

function setUserData(userData){
    const userDataStr = JSON.stringify(userData);
    sessionStorage.setItem('userData', userDataStr);
}

function clearUserData(){
    sessionStorage.removeItem('userData');
}

function createSubmitHandler(callback){
    return function(event){
        event.preventDefault();
        const formData = new FormData(event.target);
        const inputData = Object.fromEntries(formData);

        callback(inputData);
    }
}

export {
    getUserData,
    setUserData,
    clearUserData,
    createSubmitHandler
}