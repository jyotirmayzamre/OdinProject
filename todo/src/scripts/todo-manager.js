let num = 1;


/*
Things to finish today
- create event listener to add new project
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
        const id = 'todo' + num;
        const newItem = { title, description, dueDate, priority, project, id, checked };
        localStorage.setItem(id, JSON.stringify(newItem));
        num += 1;

        return newItem;
    }

    const updateToDo = (id, data) => {
        let toDo = JSON.parse(localStorage.getItem(id));
        toDo.title = data.title;
        toDo.description = data.desc;
        toDo.dueDate = data.dueDate;
        toDo.priority = data.priority;
        toDo.project = data.project;
        localStorage.setItem(id, JSON.stringify(toDo));
        return toDo;
    }

    const changeChecked = (toDo) => {
        toDo.checked = !toDo.checked;
        localStorage.setItem(toDo.id, JSON.stringify(toDo));
    }

    const deleteToDo = (id) => {
        localStorage.removeItem(id);
    }

    return { createToDo, updateToDo, changeChecked , deleteToDo }
})();


