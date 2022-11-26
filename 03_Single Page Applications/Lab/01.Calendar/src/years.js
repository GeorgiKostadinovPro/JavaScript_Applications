import { showMonthsView } from "./months.js";

const monthsTableElement = document.querySelector('#years .calendar'); 
monthsTableElement.addEventListener('click', showMonthsView);

function showYearsView(){
    const allSectionElements = Array.from(document.querySelectorAll('section'));
    allSectionElements.forEach(el => {
        el.style.display = 'none';
    });

    const yearsSectionElement = document.getElementById('years'); 
    yearsSectionElement.style.display = 'block';
}

export { showYearsView }