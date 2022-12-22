function getUserInfo(){
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    return userData;
}

function setUserInfo(userData){
    const userDataStr = JSON.stringify(userData);
    sessionStorage.setItem('userData', userDataStr);
}

function clearUserInfo(){
    sessionStorage.removeItem('userData');
}

function createSubmitPackageHandler(callback){
    return function(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const inputData = Object.fromEntries(formData);

        callback(inputData);
    }
}

export {
    getUserInfo,
    setUserInfo,
    clearUserInfo,
    createSubmitPackageHandler
}