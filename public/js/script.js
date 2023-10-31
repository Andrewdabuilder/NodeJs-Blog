// alert("Hello");

document.addEventListener('DOMContentLoaded', funtion(){
    const allButtons = document.querySelectorAll('.searchBtn');
    const searchBar = document.querySelector('.searchBar');
    const searchInput = document.getElementById('searchInput');
    const searchClose = document.getElementById('searchClose');

    for (var i = 0; i < allButtons.length; i ++){
        allButtons[i].addEventListener('click', function(){
            searchBar.style.visibility = 'visible';
            searchBar.classList.add('Open');
            this.setAttribute('aria-expanded', 'true');
            // When you click search it will automatically put the curser there
            searchInput.focus();

        })
    }

    searchClose.addEventListener('click', function(){
        searchBar.style.visibility = 'hidden';
        searchBar.classList.remove('Open');
        this.setAttribute('aria-expanded', 'false');
        // When you click search it will automatically put the curser there
        


});