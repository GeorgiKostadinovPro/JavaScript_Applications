function attachEvents() {
    const postsSelectElement = document.getElementById('posts');
    const postTitleElement = document.getElementById('post-title');
    const postBodyElement = document.getElementById('post-body');
    const postCommentsElement = document.getElementById('post-comments');

    const loadBtnElement = document.getElementById('btnLoadPosts');
    loadBtnElement.addEventListener('click', onLoad);

    const viewBtnElement = document.getElementById('btnViewPost');
    viewBtnElement.addEventListener('click', onView);

    const baseURL = 'http://localhost:3030/jsonstore/blog';

    const postsInfo = [];

    async function onLoad(){
        const getPostsURL = baseURL + '/posts';
        postsSelectElement.innerHTML = '';
        
        const result = await request(getPostsURL);

        Object.entries(result).forEach(el => {
            const postInfo = el[1];

            const { id, title } = postInfo;
            postsInfo.push(postInfo);
            
            const optionElement = document.createElement('option');
            optionElement.value = id;
            optionElement.textContent = title;

            postsSelectElement.appendChild(optionElement);
        });
    }

    async function onView(){
        const selectedPost = postsSelectElement
        .options[postsSelectElement.selectedIndex];
        
        postCommentsElement.innerHTML = '';

        const getCommentsURL = baseURL + '/comments';

        const result = await request(getCommentsURL);

        const postComments = Object.values(result)
        .filter(x => x.postId === selectedPost.value);
        
        const currentPostInfo = postsInfo
        .find(x => x.id === selectedPost.value); 

        postTitleElement.textContent = currentPostInfo.title;
        postBodyElement.textContent = currentPostInfo.body;

        postComments.forEach(el => {
            const liElement = document.createElement("li");
            liElement.textContent = el.text;
            
            postCommentsElement.appendChild(liElement);
          });
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
}

attachEvents();