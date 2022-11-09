function loginUser(){
    let formElement = document.querySelector('form');
    let loginUserURL = 'http://localhost:3030/users/login'; 

    formElement.addEventListener('submit', (e) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);

        const userData = Object.fromEntries(formData);
        
        fetch(loginUserURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        }).then((response) => {
            if(response.ok){
                return response.json();
            }

            throw new Error(`Something went wrong: ${response.status}!`);
        })
        .then((data) => {
            sessionStorage.setItem('_id', data._id);
            sessionStorage.setItem('email', data.email);
            sessionStorage.setItem('accessToken', data.accessToken);

            window.location = 'index.html';
            alert('Succesful login!');
        })
        .catch((error) => {
            alert(error.message);
        });
    });
}