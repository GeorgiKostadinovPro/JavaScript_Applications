function attachEvents() {
    let textareaElement = document.getElementById('messages');
    let [authorInputElement, contentInputElement] 
    = document.querySelectorAll('input[type="text"]');

    let sendBtnElement = document.getElementById('submit');
    let refreshBtnElement = document.getElementById('refresh');

    let baseURL = 'http://localhost:3030/jsonstore/messenger';

    sendBtnElement.addEventListener('click', (e) => {
        let messageData = {
            author: authorInputElement.value,
            content: contentInputElement.value
        };

        authorInputElement.value = '';
        contentInputElement.value = '';

        fetch(baseURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(messageData)
        }).then((response) => {
            if(response.ok){
                return response.json();
            }

            throw new Error(`Something went wrong: ${response.status}!`);
        }).catch((error) => {
            alert(error.message);
        });
    });

    refreshBtnElement.addEventListener('click', (e) => {
        textareaElement.innerHTML = '';
        authorInputElement.value = '';
        contentInputElement.value = '';

        fetch(baseURL, {
            method: 'GET'
        }).then((response) => {
            if(response.ok){
                return response.json();
            }

            throw new Error(`Something went wrong: ${response.status}!`);
        })
        .then((data) => {
            let allMessages = [];

            Object.entries(data).forEach(el => {
                allMessages.push(el[1]);
            });


            let result = allMessages
            .map(x => `${x.author}: ${x.content}`)
            .join('\n');

            textareaElement.textContent = result;
        })
        .catch((error) => {
            alert(error.message);
        });
    });
}

attachEvents();