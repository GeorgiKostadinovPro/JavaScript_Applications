function attachEvents() {
    let formElement = document.getElementById('form');
    let tableBodyElement = document.querySelector('#results tbody');
    let baseURL = 'http://localhost:3030/jsonstore/collections/students';
    
    getStudents();
    
    formElement.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let [firstNameInputElement, lastNameInputElement, 
            facultyNumberInputElement, gradeInputElement] = document.querySelectorAll('input[type="text"]');
        
        if(firstNameInputElement.value === ''
        || lastNameInputElement.value === ''
        || facultyNumberInputElement.value === ''
        || (gradeInputElement.value === '' || isNaN(Number(gradeInputElement.value)))){
            return;
        }
        
        let studentDataObj = {
            firstName: firstNameInputElement.value,
            lastName: lastNameInputElement.value,
            facultyNumber: facultyNumberInputElement.value,
            grade: gradeInputElement.value
        };

        fetch(baseURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(studentDataObj)
        }).then((response) => {
            if(response.ok){
                return response.json();
            }

            throw new Error(`Something went wrong: ${response.status}!`);
        })
        .then(() => {
            getStudents();
        })
        .catch((error) => {
            alert(error.message);
        });
        
        formElement.reset();
    });

    function getStudents(){
        fetch(baseURL, {
            method: 'GET'
        }).then((response) => {
            if(response.ok){
                return response.json();
            }

            throw new Error(`Something went wrong: ${response.status}!`);
        })
        .then((data) => {
            tableBodyElement.innerHTML = '';

            Object.entries(data).forEach(el => {
                let studentInfoObj = el[1];

                let studentTrElement = document.createElement('tr');

                for (const key in studentInfoObj) {
                    if (Object.hasOwnProperty.call(studentInfoObj, key) 
                    && key !== '_id') {
                        let studentTdElement = document.createElement('td');
                        studentTdElement.textContent = studentInfoObj[key];

                        studentTrElement.appendChild(studentTdElement);
                    }
                }

                tableBodyElement.appendChild(studentTrElement);
            });
        })
        .catch((error) => {
            alert(error.message);
        });
    }
}