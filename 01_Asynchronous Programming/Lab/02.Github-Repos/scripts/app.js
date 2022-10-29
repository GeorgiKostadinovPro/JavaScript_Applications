function loadRepos() {
	let usernameInputElement = document.getElementById('username'); 
	let reposUlElement = document.getElementById('repos');

	let url = `https://api.github.com/users/${usernameInputElement.value.trim()}/repos`;
	reposUlElement.innerHTML = '';


	fetch(url, { 
		method: 'GET'
	}).then((response) => {
		if(response.ok){
			return response.json();
		}
		
		throw new Error(`Error: ${response.status} (Not Found)`);
	})
	.then((data) => {
		data.forEach(repoObj => {
			let repoLiElement = document.createElement('li');
			let repoLinkElement = document.createElement('a');
			repoLinkElement.href = repoObj.html_url;
			repoLinkElement.textContent = repoObj.full_name;

			repoLiElement.appendChild(repoLinkElement);
			reposUlElement.appendChild(repoLiElement);
		});
	})
	.catch((error) => {
		let repoLiElement = document.createElement('li');
		repoLiElement.textContent = error.message;

		reposUlElement.appendChild(repoLiElement);
	});
}