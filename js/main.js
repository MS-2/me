//select from dom

const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');
const menuNav = document.querySelector('.menu-nav');
const menuMarca = document.querySelector('.menu-marca');

const navItems = document.querySelectorAll('.nav-item');

//set estado inicial del menu
let showMenu = false;

menuBtn.addEventListener('click', toggleMenu);

function toggleMenu() {
    if (!showMenu) {
        menuBtn.classList.add('close');
        menu.classList.add('show');
        menuNav.classList.add('show');
        menuMarca.classList.add('show');
        navItems.forEach(item => item.classList.add('show'));
        //set menu estado

        showMenu = true;
    }else{
        menuBtn.classList.remove('close');
        menu.classList.remove('show');
        menuNav.classList.remove('show');
        menuMarca.classList.remove('show');
        navItems.forEach(item => item.classList.remove('show'));
        //set menu estado

        showMenu = false;

    }
    
}