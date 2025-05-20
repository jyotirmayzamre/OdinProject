import "../styles/style.css";
import { todoManager, domManager } from "./controller";
import { setup } from "./newDialog";


setup();

//event listener for the plus button
const addNew = document.getElementById('add-new');
const addModal = document.getElementById('add-dialog');
addNew.addEventListener('click', ()=>{
    addModal.show();
})

const todo1 = todoManager.createToDo(
    'get dressed',
    'get dressed',
    '2025-01-20',
    'High'
)

const todo2 = todoManager.createToDo(
    'hello',
    'hello',
    '2024-05-20',
    'Low'
)


domManager.addToDo(todo1);
domManager.addToDo(todo2);