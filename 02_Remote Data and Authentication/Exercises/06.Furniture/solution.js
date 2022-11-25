function solve() {
  const userData = sessionStorage.getItem('userData');

  if(userData){
    window.location = './homeLogged.html';
  }else{
    window.location = './home.html';
  }

  const loginBtnElement = document.querySelector('#guest a');
}

async function onLogin(e){
  
}