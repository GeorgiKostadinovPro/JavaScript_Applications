function lockedProfile() {
    let mainElement = document.getElementById('main');
    let getAllUsersURL = 'http://localhost:3030/jsonstore/advanced/profiles';

    mainElement.innerHTML = '';
    
    fetch(getAllUsersURL, {
        method: 'GET'
    }).then((response) => {
        if(response.ok){
            return response.json();
        }

        throw new Error(`Error: ${response.status} (Not Found)`);
    })
    .then((data) => {
        Object.entries(data).forEach((userInfo, i) => {
            let userProfileDivElement = document.createElement('div');
            userProfileDivElement.classList.add('profile');

            let userInfoObj = userInfo[1];
            i++;

            userProfileDivElement.innerHTML = `
            <img src="./iconProfile2.png" class="userIcon" />
				<label>Lock</label>
				<input type="radio" name="user${i}Locked" value="lock" checked>
				<label>Unlock</label>
				<input type="radio" name="user${i}Locked" value="unlock"><br>
				<hr>
				<label>Username</label>
				<input type="text" name="user${i}Username" value="${userInfoObj.username}" disabled readonly />
				<div id="user${i}HiddenFields">
					<hr>
					<label>Email:</label>
					<input type="email" name="user${i}Email" value="${userInfoObj.email}" disabled readonly />
					<label>Age:</label>
					<input type="email" name="user${i}Age" value="${userInfoObj.age}" disabled readonly />
				</div>
				
				<button>Show more</button>
            `;

            let userHiddenFieldsDivElement = userProfileDivElement.querySelector('div')
            userHiddenFieldsDivElement.style.display = 'none';

            mainElement.appendChild(userProfileDivElement);

            let showMoreBtn = userProfileDivElement.querySelector('button');

            showMoreBtn.addEventListener('click', (e) => {
                let currProfileDivElement = e.currentTarget.parentNode;
                let lockInputRadioElement = currProfileDivElement.querySelector('input[value="lock"]');
    
                if(lockInputRadioElement.checked){
                    return;
                }
                
                let hiddenInformationDivElement = currProfileDivElement.querySelector('div');
    
                if(e.currentTarget.textContent === 'Show more'){
                    hiddenInformationDivElement.style.display = 'inline-block';
                    e.currentTarget.textContent = 'Hide it'; 
                }else{
                    hiddenInformationDivElement.style.display = 'none';
                    e.currentTarget.textContent = 'Show more'; 
                }
            });
        });
    })
    .catch((error) => {
        console.log(error.message);
    });
}