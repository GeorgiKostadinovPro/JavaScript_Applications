function getUserData(){
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    return userData;
}

function setUserData(data){
    const userData = JSON.stringify(data);
    sessionStorage.setItem('userData', userData);
}

function clearUserData(){
    sessionStorage.removeItem('userData');
}

function createSubmitPackageHandler(callback){
    return function(event){
        event.preventDefault();
        const formData = new FormData(event.target);
        const userData = Object.fromEntries(formData);

        callback(userData);
    }
}

export {
    getUserData,
    setUserData,
    clearUserData,
    createSubmitPackageHandler
}