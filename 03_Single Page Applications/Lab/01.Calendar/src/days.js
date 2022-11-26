function showDaysView(e){
    if(e.target.tagName !== 'TD'){
        return;
    }

    const monthsSectionToHide = e.target.parentNode.parentNode
    .parentNode.parentNode;
    monthsSectionToHide.style.display = 'none';

    const year = monthsSectionToHide.id.substring(5);
    const monthNameDivElement = e.target.querySelector('.date');

    const months = {
        'Jan': 1,
        'Feb': 2,
        'Mar': 3,
        'Apr': 4,
        'May': 5,
        'Jun': 6,
        'Jul': 7,
        'Aug': 8,
        'Sep': 9,
        'Oct': 10,
        'Nov': 11,
        'Dec': 12
    };

    const sectionId = `month-${year}-${months[monthNameDivElement.textContent]}`;
    const sectionToDisplay = document.getElementById(sectionId);

    if(sectionToDisplay){
        sectionToDisplay.style.display = 'block';
    }
}

export { showDaysView }