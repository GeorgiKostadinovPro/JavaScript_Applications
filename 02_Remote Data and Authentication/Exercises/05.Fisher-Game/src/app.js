window.addEventListener('DOMContentLoaded', initializeData);

let userData = null;

function initializeData(){
   userData = JSON.parse(sessionStorage.getItem('userData'));

   if(userData){
      const guestDivElement = document.getElementById('guest');
      guestDivElement.style.display = 'none';

      const addBtnElement = document.querySelector('#addForm .add');
      addBtnElement.disabled = false;
    
      const addFormElement = document.getElementById('addForm');
      addFormElement.addEventListener('submit', onCreate)

      const guestEmailDivElement = document.querySelector('.email span');
      guestEmailDivElement.textContent = userData.email;

      const logoutBtnElement = document.getElementById('logout');
      logoutBtnElement.addEventListener('click', onLogout);
   }else{
      const userDivElement = document.getElementById('user');

      userDivElement.style.display = 'none';
   }

   const loadBtnElement = document.querySelector('.load');
   loadBtnElement.addEventListener('click', loadData);
}

async function request(url, options){
    try {
        const response = await fetch(url, options);

        if(!response.ok){
            const error = await response.json();
            throw new Error(error.message);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        alert(error.message);
    }
}

async function onLogout(e){
    e.preventDefault();
    const logoutURL = 'http://localhost:3030/users/logout';

    await request(logoutURL, {
        method: 'GET',
        headers: {
            'X-Authorization': userData.accessToken
        }
    });

    sessionStorage.clear();
    window.location = './index.html';
}

async function loadData(){
    const loadDataURL = 'http://localhost:3030/data/catches';

    const data = await request(loadDataURL);

    const catchesDivElement = document.getElementById('catches');
    catchesDivElement.innerHTML = '';

    data
    .map(x => createPreview(x))
    .forEach(el => {
        catchesDivElement.appendChild(el);
    });
}

function createPreview(item){
    const isOwner = userData && item._ownerId === userData.id;

    const catchDivElement = document.createElement('div');
    catchDivElement.classList.add('catch');
    catchDivElement.innerHTML = `
        <label>Angler</label>
        <input type="text" class="angler" value="${item.angler}" ${!isOwner ? 'disabled' : ''}>
        <label>Weight</label>
        <input type="text" class="weight" value="${item.weight}" ${!isOwner ? 'disabled' : ''}>
        <label>Species</label>
        <input type="text" class="species" value="${item.species}" ${!isOwner ? 'disabled' : ''}>
        <label>Location</label>
        <input type="text" class="location" value="${item.location}" ${!isOwner ? 'disabled' : ''}>
        <label>Bait</label>
        <input type="text" class="bait" value="${item.bait}" ${!isOwner ? 'disabled' : ''}>
        <label>Capture Time</label>
        <input type="number" class="captureTime" value="${item.captureTime}" ${!isOwner ? 'disabled' : ''}>
        <button class="update" data-id="${item._id}" ${!isOwner ? 'disabled' : ''}>Update</button>
        <button class="delete" data-id="${item._id}" ${!isOwner ? 'disabled' : ''}>Delete</button>
    `;

    catchDivElement.addEventListener('click', onTableClick);

    return catchDivElement;
}

async function onCreate(e){
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const catchFormData = Object.fromEntries(formData);

    e.currentTarget.reset();

    for (const key in catchFormData) {
        if (Object.hasOwnProperty.call(catchFormData, key)) {
            if(catchFormData[key] === ''){
                return;
            }
        }
    }

    await createCatch(catchFormData);
    await loadData();
}

async function createCatch(catchObj){
    const createCatchURL = 'http://localhost:3030/data/catches';

    const result = await request(createCatchURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': userData.accessToken
        },
        body: JSON.stringify(catchObj)
    });

    return result;
}

function onTableClick(e){
    e.preventDefault();

    if(e.target.className === 'delete'){
        onDelete(e.target);
    }else if(e.target.className === 'update'){
        onUpdate(e.target);
    }
}

async function onUpdate(button){
    const catchDivElementToUpdate = button.parentNode;
    const catchId = button.dataset.id;

    let allInputFieldsElements = Array.from(catchDivElementToUpdate.querySelectorAll('input'));

    if(allInputFieldsElements.some(x => x.value === '')){
        return;
    }

    let catchDataObj = {};

    allInputFieldsElements.forEach(input => {
        let key = input.className;
        let value = input.value;

        catchDataObj[key] = value;
    });

    await updateCatch(catchId, catchDataObj);
    await loadData();
}

async function updateCatch(catchId, catchObj){
    const updateCatchURL = `http://localhost:3030/data/catches/${catchId}`;

    const result = await request(updateCatchURL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': userData.accessToken
        },
        body: JSON.stringify(catchObj)
    });

    return result;
}

async function onDelete(button){
    const catchId = button.dataset.id;

    await deleteCatch(catchId);
    await loadData();
}

async function deleteCatch(catchId){
    const deleteCatchURL = `http://localhost:3030/data/catches/${catchId}`;

    const result = await request(deleteCatchURL, {
        method: 'DELETE',
        headers: {
            'X-Authorization': userData.accessToken
        },
    });

    return result;
}