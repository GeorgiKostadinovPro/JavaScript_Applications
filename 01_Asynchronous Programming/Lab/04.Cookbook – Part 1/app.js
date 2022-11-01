function loadRecipies(){
    let pElement = document.querySelector('p');
    let mainElement = document.querySelector('main');
    let url = 'http://localhost:3030/jsonstore/cookbook/recipes';

    mainElement.removeChild(pElement);

    fetch(url, {
        method: 'GET'
    }).then((response) => {
        if(response.ok){
            return response.json();
        }

        throw new Error(`Error: ${response.status} (Not Found)`);
    })
    .then((data) => {
        Object.entries(data).forEach(el => {
            let recipeArticleElement = document.createElement('article');
            recipeArticleElement.classList.add('preview');

            let titleDivElement = document.createElement('div');
            titleDivElement.classList.add('title');
            let titleH2Element = document.createElement('h2');
            titleH2Element.textContent = el[1].name;

            let imageDivElement = document.createElement('div');
            imageDivElement.classList.add('small');
            let imageElement = document.createElement('img');
            imageElement.src = el[1].img;

            titleDivElement.appendChild(titleH2Element);
            imageDivElement.appendChild(imageElement);

            recipeArticleElement.appendChild(titleDivElement);
            recipeArticleElement.appendChild(imageDivElement);
            mainElement.appendChild(recipeArticleElement);

            recipeArticleElement.addEventListener('click', (e) => {
                let currRecipeInfoUrl = `http://localhost:3030/jsonstore/cookbook/details/${el[0]}`;
                
                fetch(currRecipeInfoUrl, {
                    method: 'GET'
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
    })
}