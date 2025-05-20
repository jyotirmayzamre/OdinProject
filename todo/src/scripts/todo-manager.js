let num = 1;


/*
Things to finish today
- store todos in internal storage
- make edit todo functional
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
        const id = 'todo' + num;
        const newItem = { title, description, dueDate, priority, project, id, checked };
        localStorage.setItem(id, newItem);
        num += 1;

        return newItem;
    }

    const updateToDo = (toDo, data) => {
        toDo.title = data.title;
        toDo.description = data.desc;
        toDo.dueDate = data.dueDate;
        toDo.priority = data.priority;
        localStorage.setItem(toDo.id, toDo);
        return toDo;
    }

    const changeChecked = (toDo) => {
        toDo.checked = !toDo.checked;
        localStorage.setItem(toDo.id, toDo);
    }

    return { createToDo, updateToDo, changeChecked }
})();


