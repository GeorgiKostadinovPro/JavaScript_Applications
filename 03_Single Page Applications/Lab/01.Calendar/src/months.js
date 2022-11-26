import { showDaysView } from "./days.js";

Array.from(document.querySelectorAll('caption')).forEach(el => {
    el.addEventListener('click', returnToYearsView);
});

Array.from(document.querySelectorAll('.monthCalendar tbody')).forEach(el => {
    el.addEventListener('click', showDaysView);
});

function showMonthsView(e){
    if(e.target.tagName !== 'TD'){
        return;
    }

    const yearsSectionElement = document.getElementById('years'); 
    yearsSectionElement.style.display = 'none';

    const yearDivElement = e.target.querySelector('.date');
    const sectionId = `year-${yearDivElement.textContent}`;

    const sectionToDisplay = document.getElementById(sectionId);
    sectionToDisplay.style.display = 'block';
}

function returnToYearsView(e){
    e.currentTarget.parentNode.parentNode.style.display = 'none';
    document.getElementById('years').style.display = 'block';
}

export { showMonthsView }