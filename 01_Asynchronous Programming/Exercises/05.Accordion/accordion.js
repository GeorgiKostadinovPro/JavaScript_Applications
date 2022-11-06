function solution() {
    let mainSectionElement = document.getElementById('main');
    let getArticlesURL = 'http://localhost:3030/jsonstore/advanced/articles/list';

    fetch(getArticlesURL, {
        method: 'GET'
    }).then((response) => {
        if(response.ok){
            return response.json();
        }

        throw new Error(`Error: ${response.status} (Not Found)`);
    })
    .then((data) => {
        data.forEach(el => {
            let articleId = el._id;
            let articleTitle = el.title;

            let accordionDivElement = document.createElement('div');
            accordionDivElement.classList.add('accordion');

            let headDivElement = document.createElement('div');
            headDivElement.classList.add('head');

            let spanElement = document.createElement('span');
            spanElement.textContent = articleTitle;

            let moreBtnElement = document.createElement('button');
            moreBtnElement.classList.add('button');
            moreBtnElement.id = articleId;
            moreBtnElement.textContent = 'More';

            headDivElement.appendChild(spanElement);
            headDivElement.appendChild(moreBtnElement);
            accordionDivElement.appendChild(headDivElement);

            let extraDivElement = document.createElement('div');
            extraDivElement.classList.add('extra');

            let pElement = document.createElement('p');
            extraDivElement.appendChild(pElement);

            accordionDivElement.appendChild(extraDivElement);
            mainSectionElement.appendChild(accordionDivElement);

            moreBtnElement.addEventListener('click', (e) => {
                let getMoreInformationURL = `http://localhost:3030/jsonstore/advanced/articles/details/${articleId}`;

                fetch(getMoreInformationURL, {
                    method: 'GET'
                }).then((response) => {
                    if(response.ok){
                        return response.json();
                    }
            
                    throw new Error(`Error: ${response.status} (Not Found)`);
                })
                .then((data) => {
                    pElement.textContent = data.content;
                    
                    if(moreBtnElement.textContent === 'More'){
                        extraDivElement.style.display = 'block';
                        moreBtnElement.textContent = 'Less';
                    }else{

                        extraDivElement.style.display = 'none';
                        moreBtnElement.textContent = 'More';
                    }
                })
                .catch((error) => {
                    console.log(error.message);
                });
            });
        });
    })
    .catch((error) => {
        console.log(error.message);
    });
}

solution();