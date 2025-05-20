import editImage from '../../images/edit.png';
import binImage from '../../images/bin.png';
import closeImage from '../../images/close.svg';
import emptyBoxImage from '../../images/empty-box.png';
import plusImage from '../../images/plus.svg';
import checkedImage from '../../images/checked.svg';

import { todoManager } from './todo-manager.js';


/*
Dom manager factory function
- addToDo: used to add a todo item to home page
*/

export const domManager = (function() {
    const todoContainer = document.getElementById('todo-container');

    const addToDo = (toDo) => {
        const container = document.createElement('div');
        container.className = 'todo';

        container.id = toDo.id;

        const leftSide = document.createElement('div');
        leftSide.className = 'side';
        const rightSide = document.createElement('div');
        rightSide.className = 'side';

        //checkbox icon
        const emptyBox = document.createElement('img');
        emptyBox.dataset.curr = 'empty';
        emptyBox.className = 'icon';

        //event listener for checkbox icon
        emptyBox.addEventListener('click', (e) => {
            if(e.target.dataset.curr == 'empty'){
                e.target.src = checkedImage;
                e.target.dataset.curr = 'checked';
                e.target.parentNode.style.textDecoration = 'line-through';
                e.target.parentNode.parentNode.style.opacity = 0.5;
                

            } else{
                e.target.src = emptyBoxImage;
                e.target.dataset.curr = 'empty';
                e.target.parentNode.style.textDecoration = 'none';
                e.target.parentNode.parentNode.style.opacity = 1;
            }

            todoManager.changeChecked(toDo);
        })

        emptyBox.src = emptyBoxImage;
        emptyBox.alt = 'Check'
        leftSide.appendChild(emptyBox);

        container.style.borderLeft = '5px solid';

        //change identifier colour acc to priority
        switch(toDo.priority){
            case 'Low':
                container.style.borderLeftColor = 'lightgreen';
                break;
            case 'Medium':
                container.style.borderLeftColor = 'orange';
                break;
            case 'High':
                container.style.borderLeftColor = 'red';
                break;
        }

        //title of the todo
        const title = document.createElement('p');
        title.textContent = toDo.title;
        leftSide.appendChild(title);


        //Dialog for viewing todo details
        const detailModal = document.createElement('dialog');
        detailModal.innerHTML = `
            <h1 id=${container.id + '-title'}>${toDo.title}</h1>
            <p><b>Project:</b> <span id=${container.id + '-project'}>${toDo.project}</span></p>
            <p><b>Priority:</b> <span id=${container.id + '-priority'}>${toDo.priority}</span></p>
            <p><b>Due Date:</b> <span id=${container.id + '-dueDate'}>${toDo.dueDate}</span></p>
            <p><b>Description:</b> <span id=${container.id + '-desc'}>${toDo.description}</span></p>
        `
        const closeIcon = document.createElement('img');
        closeIcon.className = 'icon';
        closeIcon.src = closeImage;
        closeIcon.height = 25;
        closeIcon.alt = "close";
        closeIcon.addEventListener('click', (e) => {
            detailModal.close();
        });
        detailModal.appendChild(closeIcon);

        
        rightSide.appendChild(detailModal);

        //set up the edit modal + event listeners
        const editModal = editForm(toDo);

        
        rightSide.appendChild(editModal);

        //set up icons + event listeners
        const { detailButton, editIcon, binIcon } = icons(detailModal, editModal, todoContainer, toDo.id);

        rightSide.appendChild(detailButton);
        rightSide.appendChild(editIcon);
        rightSide.appendChild(binIcon);


        container.appendChild(leftSide);
        container.appendChild(rightSide);

        todoContainer.appendChild(container);
    }

    //function for updating display of todo after editing
    const updateToDo = (id, data) => {
        const node = document.getElementById(id);

        //update the title, desc, priority, duedate
        const title = document.getElementById(id + '-title');
        title.textContent = data.title;

        const desc = document.getElementById(id + '-desc');
        desc.textContent = data.desc;

        const project = document.getElementById(id + '-project');
        project.textContent = data.project;

        const dateElem = document.getElementById(id + '-dueDate');
        dateElem.textContent = data.date;

        const priority = document.getElementById(id + '-priority');
        priority.textContent = data.priority;

        switch(data.priority){
            case 'Low':
                node.style.borderLeftColor = 'lightgreen';
                break;
            case 'Medium':
                node.style.borderLeftColor = 'orange';
                break;
            case 'High':
                node.style.borderLeftColor = 'red';
                break;
        }

        const heading = node.childNodes[0].childNodes[1];
        heading.textContent = data.title;
        

    }

    const icons = (detailModal, editModal, todoContainer, id) => {
        //details button
        const detailButton = document.createElement('button');
        detailButton.classList.add('detail-btn')
        detailButton.textContent = 'DETAILS';
        detailButton.addEventListener('click', () => {
            detailModal.showModal();
        })

        //edit icon
        const editIcon = document.createElement('img');
        editIcon.className = 'icon';
        editIcon.src = editImage;
        editIcon.alt = 'Edit';
        editIcon.addEventListener('click', () => {
            editModal.showModal();
        })

        //bin icon
        const binIcon = document.createElement('img');
        binIcon.className = 'icon';
        binIcon.src = binImage;
        binIcon.alt = "Delete";

        binIcon.addEventListener('click', (e) => {
            todoContainer.removeChild(e.target.parentNode.parentNode);
            todoManager.deleteToDo(id);
        })

        return { detailButton, editIcon, binIcon };
    }

    const editForm = (toDo) => {
        /*
        Dialog for editing the todo
        */
        const editModal = document.createElement('dialog');

        const closeIcon2 = document.createElement('img');
        closeIcon2.className = 'icon';
        closeIcon2.src = closeImage;
        closeIcon2.height = 25;
        closeIcon2.alt = "close";
        closeIcon2.addEventListener('click', (e) => {
            editModal.close();
        });

        closeIcon2.style.float = 'right';

        const editForm = document.createElement('form');
        editForm.className = 'form edit'
        editForm.setAttribute("method", "post");
        editForm.setAttribute('action', 'whatever');

        

        editForm.style.display = 'flex';
        editForm.style.flexDirection = 'column';
        editForm.style.gap = '1em';

        const titleContainer = document.createElement('div');
        titleContainer.className = 'editContainer';
        titleContainer.innerHTML = `
            <h3>Title:</h3>
            <input type="text" name="title" id="title" value=${toDo.title} required>
        `
        

       const descContainer = document.createElement('div');
       descContainer.className = 'editContainer';
       descContainer.innerHTML = `
            <h3>Description</h3>
            <input type="text" name="desc" id="desc" value=${toDo.description} required>
       `;

       const projectContainer = document.createElement('div');
       projectContainer.className = 'editContainer';
       projectContainer.innerHTML = `
            <h3>Project</h3>
            <input type="text" name="project" id="project" value=${toDo.project}>
       `


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

        priorityContainer.querySelectorAll('input[type="radio"]').forEach((item)=>{
            item.checked = (item.value == toDo.priority);
        });
        
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'editContainer button';

        const submitButton = document.createElement('button');
        submitButton.textContent = 'Confirm Changes';
        submitButton.setAttribute("type", "submit");
        submitButton.style.width = '40%';

        //submit button for editing todo
        submitButton.addEventListener('click', (e) => {
            e.preventDefault();
            const formData = new FormData(editForm);
            const data = Object.fromEntries(formData.entries());
            todoManager.updateToDo(toDo.id, data);
            updateToDo(toDo.id, data);
            editModal.close();
        })

        buttonContainer.appendChild(submitButton);

    
        editForm.appendChild(titleContainer);
        editForm.appendChild(descContainer);
        editForm.appendChild(projectContainer);
        editForm.appendChild(dateContainer);
        editForm.appendChild(priorityContainer);
        editForm.appendChild(buttonContainer);

        editModal.appendChild(closeIcon2);
        editModal.appendChild(editForm);
        return editModal;
    }

    const setup = () => {

        //adding event listeners for project related pages

        const projList = document.querySelector('.projects-list');

        const todoContainer = document.getElementById('todo-container');
        
        projList.addEventListener('click', (e) => {
            if (e.target.classList.contains('project')){
                todoContainer.replaceChildren();
                for (let i=0; i < localStorage.length; i++){
                    const key = localStorage.key(i);
                    const val = JSON.parse(localStorage.getItem(key));
                    if (val.project == e.target.dataset.name)
                        addToDo(val);
                }
            }
        });

        //event listener for home
        const homePage = document.querySelector('.section');

        homePage.addEventListener('click', (e)=>{
            todoContainer.replaceChildren();
            for (let i=0; i < localStorage.length; i++){
                const key = localStorage.key(i);
                const val = JSON.parse(localStorage.getItem(key));
                addToDo(val);
            }
        });

        //event listener for new project
        const projectContainer = document.getElementById("proj-container");
        const projPlus = document.getElementById('new-proj');
        const projModal = document.createElement('dialog');

        //form to put in modal
        const addForm = document.createElement('form');
        addForm.setAttribute("method", "post");
        addForm.setAttribute('action', 'whatever');

        addForm.style.display = 'flex';

        const headingContainer = document.createElement('div');
        headingContainer.className = 'editContainer';
        headingContainer.innerHTML = `
            <h3>Title:</h3>
            <input type='text' name='title' id='title'>
        `


        const submitbtnContainer = document.createElement('div');
        submitbtnContainer.className = 'editContainer button';

        const submitProj = document.createElement('button');
        submitProj.textContent = 'Create Project';
        submitProj.style.width = '30%';
        submitProj.setAttribute("type", "submit");

        submitProj.addEventListener("click", (e) => {
            e.preventDefault();
            const formData = new FormData(addForm);
            const data = Object.fromEntries(formData.entries());
            const lItem = document.createElement('li');
            lItem.textContent = data.title;
            projList.appendChild(lItem);
        })

        const closeIcon3 = document.createElement('img');
        closeIcon3.className = 'icon';
        closeIcon3.src = closeImage;
        closeIcon3.height = 25;
        closeIcon3.alt = "close";
        closeIcon3.addEventListener('click', (e) => {
            projModal.close();
        });
        
        closeIcon2.style.float = 'right';

        addForm.appendChild(headingContainer);
        addForm.appendChild(submitbtnContainer);
        projModal.appendChild(closeIcon3);
        projModal.appendChild(addForm);

        projectContainer.appendChild(projModal);


        //event listener for adding new project
        projPlus.addEventListener('click', (e)=>{
            projModal.showModal();
        })

       



        

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

            addToDo(todo);


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


        //render local storage items
        for (let i=0; i < localStorage.length; i++){
            const key = localStorage.key(i);
            const val = localStorage.getItem(key);
            addToDo(JSON.parse(val));
        }
    }


    return { addToDo, setup }
})();

