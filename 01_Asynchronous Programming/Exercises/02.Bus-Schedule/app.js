function solve() {
    let infoSpanElement = document.querySelector('#info .info');
    let departBtnElement = document.getElementById('depart');
    let arriveBtnElement = document.getElementById('arrive');
    let currBusStopId = 'depot';
    let currBusStopName = '';
    let nextBusStopId = '';

    function depart() {
        let departUrl = `http://localhost:3030/jsonstore/bus/schedule/${currBusStopId}`;

        fetch(departUrl, {
            method: 'GET'
        }).then((response) => {
            if(response.ok){
                return response.json();
            }

            throw new Error(`Error: ${response.status} (Not Found)`);
        })
        .then((data) => {
            infoSpanElement.textContent = `Next stop ${data.name}`;
            nextBusStopId = data.next;
            currBusStopName = data.name;
            
            departBtnElement.disabled = true;
            arriveBtnElement.disabled = false;
        })
        .catch((error) => {
            infoSpanElement.textContent = 'Error';
            console.log(error.message);

            departBtnElement.disabled = true;
            arriveBtnElement.disabled = true;
        });
    }

    function arrive() {
        infoSpanElement.textContent = `Arriving at ${currBusStopName}`;
        currBusStopId = nextBusStopId;
        
        arriveBtnElement.disabled = true;
        departBtnElement.disabled = false;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();