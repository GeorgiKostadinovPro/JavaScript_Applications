function attachEvents() {
    let phonebookUlElement = document.getElementById('phonebook');
    let [personInputElement, contactInputElement] 
    = document.querySelectorAll('input[type="text"]');

    let loadBtnElement = document.getElementById('btnLoad');
    let createBtnElement = document.getElementById('btnCreate');

    let baseURL = 'http://localhost:3030/jsonstore/phonebook';

    loadBtnElement.addEventListener('click', () => {
        phonebookUlElement.innerHTML = '';

        fetch(baseURL, {
            method: 'GET'
        }).then((response) => {
            if(response.ok){
                return response.json();
            }

            throw new Error(`Something went wrong: ${response.status}!`);
        })
        .then((data) => {
            Object.entries(data).forEach(el => {
                let contactLiElement = document.createElement('li');
                let contactInfo = el[1];
                contactLiElement.textContent = `${contactInfo.person}: ${contactInfo.phone}`;
                contactLiElement.id = contactInfo._id;
                
                let deleteBtnElement = document.createElement('button');
                deleteBtnElement.textContent = 'Delete';  
                let deleteContactURL = baseURL + `/${contactInfo._id}`;

                deleteBtnElement.addEventListener('click', (e) => {
                    fetch(deleteContactURL, {
                        method: 'DELETE'
                    }).then((response) => {
                        if(response.ok){
                            return response.json();
                        }
            
                        throw new Error(`Something went wrong: ${response.status}!`);
                    })
                    .then(() => {
                        loadBtnElement.click();
                    })
                    .catch((error) => {
                        alert(error.message);
                    });
                });

                contactLiElement.appendChild(deleteBtnElement);
                phonebookUlElement.appendChild(contactLiElement);
            });
        })
        .catch((error) => {
            alert(error.message);
        });
    });

    createBtnElement.addEventListener('click', () => {
        if(personInputElement.value === ''
        || contactInputElement.value === ''){
            return;
        }

        let contactData = {
            person: personInputElement.value,
            phone: contactInputElement.value
        };

        personInputElement.value = '';
        contactInputElement.value = '';

        fetch(baseURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contactData)
        }).then((response) => {
            if(response.ok){
                return response.json();
            }

            throw new Error(`Something went wrong: ${response.status}!`);
        })
        .then(() => {
            loadBtnElement.click();
        })
        .catch((error) => {
            alert(error.message);
        });
    });
}

attachEvents();