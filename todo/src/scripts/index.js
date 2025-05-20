import "../styles/style.css";

import { domManager } from "./dom-manager"; 


domManager.setup();

//event listener for the plus button
const addNew = document.getElementById('add-new');
const addModal = document.getElementById('add-dialog');
addNew.addEventListener('click', ()=>{
    addModal.showModal();
})
