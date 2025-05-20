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

        const editForm = document.createElement('form');
        editForm.setAttribute("method", "post");
        editForm.setAttribute('action', 'whatever');

        const editTitle = document.createElement('textarea');
        editTitle.textContent = toDo.title;

        const editDescription = document.createElement('textarea');
        editDescription.textContent = toDo.description;

        const dateContainer = document.createElement('div');
        dateContainer.innerHTML = `
            <h2>Due Date:</h2>
            <input type="date" id="date" name="date">
        `

        const priorityContainer = document.createElement('div');
        const priorityHeading = document.createElement('h2');
        priorityHeading.textContent = 'Priority'

        const lowButton = document.createElement('input');
        lowButton.setAttribute("type", "radio");
        lowButton.setAttribute("name", "priority");
        lowButton.setAttribute("value", "Low");
        const medButton = document.createElement('input');
        medButton.setAttribute("type", "radio");
        medButton.setAttribute("name", "priority");
        medButton.setAttribute("value", "Medium");
        const highButton = document.createElement("input");
        highButton.setAttribute("type", "radio");
        highButton.setAttribute("name", "priority");
        highButton.setAttribute("value", "High");

        switch(toDo.priority){
            case 'Low':
                lowButton.checked = true;
            case 'Medium':
                medButton.checked = true;
            case 'High':
                highButton.checked = true;
        }
        priorityContainer.appendChild(priorityHeading);
        priorityContainer.appendChild(lowButton);
        priorityContainer.appendChild(medButton);
        priorityContainer.appendChild(highButton);

        const submitButton = document.createElement('button');
        submitButton.textContent = 'Confirm Changes';
        submitButton.setAttribute("type", "submit");
        submitButton.addEventListener('click', (e) => {
            e.preventDefault();
            editModal.close();
        })


        editForm.appendChild(editTitle);
        editForm.appendChild(editDescription);
        editForm.appendChild(dateContainer);
        editForm.appendChild(priorityContainer);
        editForm.appendChild(submitButton);

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
        editIcon.src = '../../images/edit.png';
        editIcon.alt = 'Edit';
        editIcon.addEventListener('click', () => {
            editModal.showModal();
        })
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

