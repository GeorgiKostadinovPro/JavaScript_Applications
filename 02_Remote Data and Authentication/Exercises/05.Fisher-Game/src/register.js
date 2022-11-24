const userData = sessionStorage.getItem('userData');

if (userData) {
    document.getElementById('guest').style.display = 'none';
} else {
    document.getElementById('user').style.display = 'none';
}

const formElement = document.querySelector('#register-view form');
formElement.addEventListener('submit', onRegister);

async function onRegister(e){
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const userFormData = Object.fromEntries(formData);
    
    const registerURL = 'http://localhost:3030/users/register';

    try {
        const response = await fetch(registerURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userFormData)
        });

        if(!response.ok){
            const error = response.json();
            throw new Error(error.message);
        }

        const data = await response.json();

        const userData = {
            id: data._id,
            email: data.email,
            accessToken: data.accessToken
        };

        sessionStorage.setItem('userData', JSON.stringify(userData));
        window.location = './index.html';
    } catch (error) {
        alert(error.message);
    }
}