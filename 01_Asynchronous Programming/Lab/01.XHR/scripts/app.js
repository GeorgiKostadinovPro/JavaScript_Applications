function loadRepos() {
   let url = 'https://api.github.com/users/testnakov/repos';

   const httpRequest = new XMLHttpRequest();

   httpRequest.addEventListener('readystatechange', () => {
      if(httpRequest.readyState === 4 && httpRequest.status === 200){
         const resDivElement = document.getElementById('res');
         resDivElement.textContent = httpRequest.responseText;
      }
   });

   httpRequest.open('GET', url);
   httpRequest.send();
}