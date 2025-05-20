import '../styles/style.css';
import { homePage } from "./home.js";
import { contactPage } from "./contacts.js";
import { menuPage } from "./menu.js";

const contentContainer = document.getElementById('content');
const navBar = document.querySelector('nav');
let currPage = document.getElementById('home');


const resetPage = () => {
    contentContainer.replaceChildren();
}

//event listener for navbar buttons
navBar.addEventListener('click', (e) => {
    if(e.target.tagName === 'BUTTON'){
        currPage.classList.remove('current');
        currPage = e.target;
        e.target.classList.add('current');
        resetPage();
        switch(e.target.id){
            case 'home':
                homePage(contentContainer);
                break;
            case 'menu':
                menuPage(contentContainer);
                break;
            case 'contact':
                contactPage(contentContainer);
                break;
        }
    }
})

homePage(contentContainer);