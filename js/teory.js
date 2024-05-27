document.addEventListener('DOMContentLoaded', function() {
    const homeButton = document.querySelector('.home-button');
    homeButton.addEventListener('click', function() {
        window.location.href = '../index.html';
    });
});