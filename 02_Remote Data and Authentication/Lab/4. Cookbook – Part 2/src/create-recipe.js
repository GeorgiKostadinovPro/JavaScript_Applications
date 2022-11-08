function createRecipe(){
    let formElement = document.querySelector('form');

    formElement.addEventListener('submit', (e) => {
        e.preventDefault();
        const createRecipeURL = 'http://localhost:3030/data/recipes';
        const userAccessToken = sessionStorage.getItem('accessToken');
        
        let formData = new FormData(e.currentTarget);

        const recipeData = Object.fromEntries(formData);

        const recipeDataForBody = {
            name: recipeData.name,
            img: recipeData.img,
            steps: recipeData.steps.split('\n'),
            ingredients: recipeData.ingredients.split('\n')
        };

        fetch(createRecipeURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': userAccessToken
            },
            body: JSON.stringify(recipeDataForBody)
        }).then((response) => {
            if(response.ok){
                return response.json();
            }

            throw new Error(`Something went wrong: ${response.status}!`);
        })
        .then(() => {
            window.location = 'index.html';
            alert('Succesfully added data!');
        })
        .catch((error) => {
            alert(error.message);
        });

        formElement.reset();
    });
}