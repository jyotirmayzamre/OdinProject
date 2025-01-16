import './styles/style.css';
import { homePage } from "./home.js";
const contentContainer = document.getElementById('content');

const buttons = document.getElementsByClassName('.btn');

const resetPage = () => {
    contentContainer.replaceChildren();
}

homePage(contentContainer);