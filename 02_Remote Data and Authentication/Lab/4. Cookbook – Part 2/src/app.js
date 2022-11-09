function loadRecipes(){
    let pElement = document.querySelector('p');
    let mainElement = document.querySelector('main');
    let url = 'http://localhost:3030/data/recipes?select=_id%2Cname%2Cimg';

    mainElement.removeChild(pElement);

    let guestDivElement = document.getElementById('guest');
    let userDivElement = document.getElementById('user');
    let logOutBtnElement = document.getElementById('logoutBtn');

    logOutBtnElement.addEventListener('click', (e) => {
        e.preventDefault();

        sessionStorage.clear();
        location.reload();
    });

    let email = sessionStorage.getItem('email'); 
    let accessToken = sessionStorage.getItem('accessToken');
   
    if(!email){
        guestDivElement.style.display = 'block';
        userDivElement.style.display = 'none';
    }else{
        userDivElement.style.display = 'block';
        guestDivElement.style.display = 'none';
    }

    fetch(url, {
        method: 'GET',
        headers: {
            'X-Authorization': accessToken
        }
    }).then((response) => {
        if(response.ok){
            return response.json();
        }

        throw new Error(`Error: ${response.status} (Not Found)`);
    })
    .then((data) => {
        data.forEach(el => {
            let recipeArticleElement = document.createElement('article');
            recipeArticleElement.classList.add('preview');

            let titleDivElement = document.createElement('div');
            titleDivElement.classList.add('title');
            let titleH2Element = document.createElement('h2');
            titleH2Element.textContent = el.name;

            let imageDivElement = document.createElement('div');
            imageDivElement.classList.add('small');
            let imageElement = document.createElement('img');
            imageElement.src = el.img;

            titleDivElement.appendChild(titleH2Element);
            imageDivElement.appendChild(imageElement);

            recipeArticleElement.appendChild(titleDivElement);
            recipeArticleElement.appendChild(imageDivElement);
            mainElement.appendChild(recipeArticleElement);

            recipeArticleElement.addEventListener('click', (e) => {
                let currRecipeInfoUrl = `http://localhost:3030/data/recipes/${el._id}`;
                
                fetch(currRecipeInfoUrl, {
                    method: 'GET',
                    headers: {
                        'X-Authorization': accessToken
                    }
                }).then((recipeResponse) => {
                    if(recipeResponse.ok){
                        return recipeResponse.json();
                    }

                    throw new Error(`Error: ${recipeResponse.status} (Not Found)`);
                })
                .then((dataRecipeObj) => {
                    recipeArticleElement.removeChild(titleDivElement);
                    recipeArticleElement.removeChild(imageDivElement);

                    let bandDivElement = document.createElement('div');
                    bandDivElement.classList.add('band');

                    let currRecipeTitleElement = document.createElement('h2');
                    currRecipeTitleElement.textContent = dataRecipeObj.name;

                    let divForImgElement = document.createElement('div');
                    divForImgElement.classList.add('thumb');
                    divForImgElement.appendChild(imageElement);

                    let divForIngredientsElement = document.createElement('div');
                    divForIngredientsElement.classList.add('ingredients');

                    let ingredientsH3Element = document.createElement('h3');
                    ingredientsH3Element.textContent = 'Ingredients:';

                    let ingredientsUlElement = document.createElement('ul');
                    
                    dataRecipeObj.ingredients.forEach(ingredient => {
                        let ingredientLiElement = document.createElement('li');
                        ingredientLiElement.textContent = ingredient;

                        ingredientsUlElement.appendChild(ingredientLiElement);
                    });

                    divForIngredientsElement.appendChild(ingredientsH3Element);
                    divForIngredientsElement.appendChild(ingredientsUlElement);

                    bandDivElement.appendChild(divForImgElement);
                    bandDivElement.appendChild(divForIngredientsElement);

                    let descriptionDivElement = document.createElement('div');
                    descriptionDivElement.classList.add('description');

                    let descriptionH3Element = document.createElement('h3');
                    descriptionH3Element.textContent = 'Preparation:';

                    descriptionDivElement.appendChild(descriptionH3Element);

                    dataRecipeObj.steps.forEach(step => {
                        let stepPElement = document.createElement('p');
                        stepPElement.textContent = step;

                        descriptionDivElement.appendChild(stepPElement);
                    });

                    recipeArticleElement.appendChild(currRecipeTitleElement);
                    recipeArticleElement.appendChild(bandDivElement);
                    recipeArticleElement.appendChild(descriptionDivElement);
                })
                .catch((error) => {
                    alert(error.message);
                });
            });
        });
    })
    .catch((error) => {
        alert(error.message);
    });
}