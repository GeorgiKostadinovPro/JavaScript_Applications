function loadCommits() {
    let usernameInputElement = document.getElementById('username');
    let repoInputElement = document.getElementById('repo');
    let commitsUlElement = document.getElementById('commits');

    let url = `https://api.github.com/repos/${usernameInputElement.value.trim()}/${repoInputElement.value.trim()}/commits`;
    commitsUlElement.innerHTML = '';

    fetch(url, {
        method: 'GET'
    }).then((response) => {
        if(response.ok){
            return response.json();
        }
        
        throw new Error(`Error: ${response.status} (Not Found)`);
    })
    .then((data) => {
        data.forEach(commitObj => {
            let commitLiElement = document.createElement('li');
            let commitAuthor = commitObj.commit.author.name;
            let commitMessage = commitObj.commit.message;
            commitLiElement.textContent = `${commitAuthor}: ${commitMessage}`;

            commitsUlElement.appendChild(commitLiElement);
        });
    })
    .catch((error) => {
        let commitLiElement = document.createElement('li');
        commitLiElement.textContent = error.message;

        commitsUlElement.appendChild(commitLiElement);
    })
}