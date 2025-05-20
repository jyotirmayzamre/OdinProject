import "../styles/style.css";

import { setup } from "./newDialog";


setup();

//event listener for the plus button
const addNew = document.getElementById('add-new');
const addModal = document.getElementById('add-dialog');
addNew.addEventListener('click', ()=>{
    addModal.showModal();
})
