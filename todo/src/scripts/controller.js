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
        emptyBox.src = '../../images/empty-box.png';
        emptyBox.alt = 'Check'
        leftSide.appendChild(emptyBox);

        //change background acc to priority
        renderPriority(toDo.priority);

        //title of the todo
        const title = document.createElement('p');
        title.textContent = toDo.title;
        leftSide.appendChild(title);

        //dialog tag for details
        const detailModal = document.createElement('dialog');
        detailModal.innerHTML = `
            <h1>${toDo.title}</h1>
            <p><b>Project:</b> ${toDo.project}</p>
            <p><b>Priority:</b> ${toDo.priority}</p>
            <p><b>Due Date:</b> ${toDo.dueDate}</p>
            <p><b>Details:</b> ${toDo.description}</p>
        `
        const closeIcon = document.createElement('img');
        closeIcon.src = "../../images/close.svg";
        closeIcon.alt = "close";
        closeIcon.addEventListener('click', () => {
            detailModal.close();
        })
        detailModal.appendChild(closeIcon);

        
        rightSide.appendChild(detailModal);

        //dialog tag for editing the todo
        const editModal = document.createElement('dialog');
        



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
        editIcon.src = '../../images/edit.png';
        editIcon.alt = 'Edit';
        rightSide.appendChild(editIcon);

        //bin icon
        const binIcon = document.createElement('img');
        binIcon.src = "../../images/bin.png";
        binIcon.alt = "Delete";
        rightSide.appendChild(binIcon);


        container.appendChild(leftSide);
        container.appendChild(rightSide);

        todoContainer.appendChild(container);
    }

    const renderPriority = (val) => {
        let color;
        switch(val){
            case 'Low':
                color = 'lightgreen';
                break;
            case 'Medium':
                color = 'orange';
                break;
            case 'High':
                color = 'red';
                break;
                
        }
        document.documentElement.style.setProperty('--priority-color', color);
    }


    return { addToDo }
})();

