function getInfo() {
    let busIdInputElement = document.getElementById('stopId');
    let stopNameDivElement = document.getElementById('stopName');
    let busesUlElement= document.getElementById('buses');

    let url = `http://localhost:3030/jsonstore/bus/businfo/${busIdInputElement.value.trim()}`;
    stopNameDivElement.textContent = '';
    busesUlElement.innerHTML = '';

    fetch(url, {
        method: 'GET'
    }).then((response) => {
        if(response.ok){
            return response.json();
        }

        throw new Error(`Error: ${response.status} (Not Found)`);
    }).then((data) => {
            stopNameDivElement.textContent = data.name;

            Object.entries(data.buses).forEach(busInfo => {
                let busInfoLiElement = document.createElement('li');
                busInfoLiElement.textContent = `Bus ${busInfo[0]} arrives in ${busInfo[1]} minutes`;

                busesUlElement.appendChild(busInfoLiElement);
            });
    })
    .catch((error) => {
        stopNameDivElement.textContent = 'Error';
        console.log(error.message);
    });
}