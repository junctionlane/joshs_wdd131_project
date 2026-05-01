let selectElem = document.querySelector('#theme-select');
let pageContent = document.querySelector('body');
let page = document.querySelector('.page');
let logo = document.querySelector('#logo');

selectElem.addEventListener('change', changeTheme);

function changeTheme() {

    let current = selectElem.value;

    if (current === 'dark') {

        // Dark mode colors
        pageContent.style.backgroundColor = "#222";
        pageContent.style.color = "white";

        page.style.backgroundColor = "#333";
        page.style.color = "white";

        // Change subtitle color
        document.querySelector('.subtitle').style.color = "#84b9ff";

        // Change logo
        logo.src = "https://wddbyui.github.io/wdd131/images/byui-logo-white.png";

    } else {

        // Light mode colors
        pageContent.style.backgroundColor = "#f5f5f5";
        pageContent.style.color = "black";

        page.style.backgroundColor = "white";
        page.style.color = "black";

        // Change subtitle color
        document.querySelector('.subtitle').style.color = "#2b5dab";

        // Change logo back
        logo.src = "https://wddbyui.github.io/wdd131/images/byui-logo-blue.webp";
    }
}