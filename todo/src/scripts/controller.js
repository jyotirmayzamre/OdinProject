import editImage from '../../images/edit.png';
import binImage from '../../images/bin.png';
import closeImage from '../../images/close.svg';
import emptyBoxImage from '../../images/empty-box.png';
import plusImage from '../../images/plus.svg';
import checkedImage from '../../images/checked.svg';


/*
Things to finish today
- add to do form
- create project
*/


/*
Todo manager factory function
- createToDo: creates a todo item
- updateToDo: updates a todo item via form
- changeChecked: changes whether a todo item is complete or not
*/
export const todoManager = (function () {
    const currProject = 'Home';

    const createToDo = (title, description, dueDate, priority, project=currProject, checked=false) => {
        return { title, description, dueDate, priority, project, checked };
    }

    const updateToDo = (toDo, newTitle, newDescription, newDueDate, newPriority) => {
        toDo.title = newTitle;
        toDo.description = newDescription;
        toDo.dueDate = newDueDate;
        toDo.priority = newPriority;
    }
    const changeChecked = (toDo) => {
        toDo.checked = !toDo.checked;
    }

    return { createToDo, updateToDo, changeChecked }
})();


/*
Dom manager factory function
- addToDo: used to add a todo item to home page
*/

export const domManager = (function() {
    const todoContainer = document.getElementById('todo-container');

    const addToDo = (toDo) => {
        const container = document.createElement('div');
        container.classList.add('todo');

        const leftSide = document.createElement('div');
        leftSide.classList.add('side');
        const rightSide = document.createElement('div');
        rightSide.classList.add('side');

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
            <h1>${toDo.title}</h1>
            <p><b>Project:</b> ${toDo.project}</p>
            <p><b>Priority:</b> ${toDo.priority}</p>
            <p><b>Due Date:</b> ${toDo.dueDate}</p>
            <p><b>Details:</b> ${toDo.description}</p>
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
        editForm.setAttribute("method", "post");
        editForm.setAttribute('action', 'whatever');

        

        editForm.style.display = 'flex';
        editForm.style.flexDirection = 'column';
        editForm.style.gap = '1em';

        const titleContainer = document.createElement('div');
        titleContainer.className = 'editContainer';
        titleContainer.innerHTML = `
            <h3>Title:</h3>
            <textarea>${toDo.title}</textarea>
        `
        

       const descContainer = document.createElement('div');
       descContainer.className = 'editContainer';
       descContainer.innerHTML = `
            <h3>Description</h3>
            <textarea>${toDo.description}</textarea>
       `;



        const dateContainer = document.createElement('div');
        dateContainer.className = 'editContainer';
        dateContainer.innerHTML = `
            <h3>Due Date:</h2>
            <input type="date" id="date" name="date" value=${toDo.dueDate}>
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
        

        const submitButton = document.createElement('button');
        submitButton.textContent = 'Confirm Changes';
        submitButton.setAttribute("type", "submit");
        submitButton.addEventListener('click', (e) => {
            e.preventDefault();
            editModal.close();
        })

    
        editForm.appendChild(titleContainer);
        editForm.appendChild(descContainer);
        editForm.appendChild(dateContainer);
        editForm.appendChild(priorityContainer);
        editForm.appendChild(submitButton);

        editModal.appendChild(closeIcon2);
        editModal.appendChild(editForm);


        rightSide.appendChild(editModal);




        //details button
        const detailButton = document.createElement('button');
        detailButton.classList.add('detail-btn')
        detailButton.textContent = 'DETAILS';
        detailButton.addEventListener('click', () => {
            detailModal.showModal();
        })

        rightSide.appendChild(detailButton);

        //edit icon
        const editIcon = document.createElement('img');
        editIcon.className = 'icon';
        editIcon.src = editImage;
        editIcon.alt = 'Edit';
        editIcon.addEventListener('click', () => {
            editModal.showModal();
        })
        rightSide.appendChild(editIcon);

        //bin icon
        const binIcon = document.createElement('img');
        binIcon.className = 'icon';
        binIcon.src = binImage;
        binIcon.alt = "Delete";

        binIcon.addEventListener('click', (e) => {
            todoContainer.removeChild(e.target.parentNode.parentNode);
        })

        rightSide.appendChild(binIcon);


        container.appendChild(leftSide);
        container.appendChild(rightSide);

        todoContainer.appendChild(container);
    }


    return { addToDo }
})();

