import closeImage from '../../images/close.svg';

import { todoManager, domManager } from "./controller";

export const setup = () => {
    //dialog for adding new todos
    const addModal = document.createElement('dialog');
    addModal.id = 'add-dialog';
    
    const closeIcon2 = document.createElement('img');
    closeIcon2.className = 'icon';
    closeIcon2.src = closeImage;
    closeIcon2.height = 25;
    closeIcon2.alt = "close";
    closeIcon2.addEventListener('click', (e) => {
        addModal.close();
    });
    
    closeIcon2.style.float = 'right';
    
    const editForm = document.createElement('form');
    editForm.setAttribute("method", "post");
    editForm.setAttribute('action', 'whatever');
    
    
    
    editForm.style.display = 'flex';
    editForm.style.flexDirection = 'column';
    editForm.style.gap = '1em';
    
    const titleContainer = document.createElement('div');
    titleContainer.className = 'editContainer';
    titleContainer.innerHTML = `
        <h3>Title:</h3>
        <input type='text' name='title' id='title'>
    `
    
    
    const descContainer = document.createElement('div');
    descContainer.className = 'editContainer';
    descContainer.innerHTML = `
        <h3>Description</h3>
        <input type='text' name='desc' id='desc'>
    `;
    
    
    
    const dateContainer = document.createElement('div');
    dateContainer.className = 'editContainer';
    dateContainer.innerHTML = `
        <h3>Due Date:</h2>
        <input type="date" id="date" name="date">
    `;
    
    
    const priorityContainer = document.createElement('div');
    priorityContainer.className = 'editContainer';
    
    priorityContainer.innerHTML = `
        <h3>Priority</h3>
        <div style='display: flex; gap: 0.5em'>
            <label>
                <input type='radio' name='priority' value='Low'>
                Low
            </label>
            <label>
                <input type='radio' name='priority' value='Medium'>
                Medium
            </label>
            <label>
                <input type='radio' name='priority' value='High'>
                High
            </label>
    
        </div>
    `
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'editContainer button';

    const submitButton = document.createElement('button');
    submitButton.textContent = 'Create ToDo';
    submitButton.style.width = '30%';
    submitButton.setAttribute("type", "submit");

    //form submission which uses todo and dom managers to update page
    submitButton.addEventListener('click', (e) => {
        e.preventDefault();
        const formData = new FormData(editForm);
        const data = Object.fromEntries(formData.entries());

        const todo = todoManager.createToDo(
            data.title,
            data.desc,
            data.date,
            data.priority
        )

        domManager.addToDo(todo);


        addModal.close();
    })
    
    buttonContainer.appendChild(submitButton);
    
    editForm.appendChild(titleContainer);
    editForm.appendChild(descContainer);
    editForm.appendChild(dateContainer);
    editForm.appendChild(priorityContainer);
    editForm.appendChild(buttonContainer);
    
    addModal.appendChild(closeIcon2);
    addModal.appendChild(editForm);

    const aside = document.getElementById('sidebar');
    aside.appendChild(addModal);
}