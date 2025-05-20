import "../styles/style.css";
import { todoManager, domManager } from "./controller";

const todo1 = todoManager.createToDo(
    'get dressed',
    'get dressed',
    '20-1-2025',
    'High'
)

const todo2 = todoManager.createToDo(
    'hello',
    'hello',
    '20-5-2024',
    'Low'
)


domManager.addToDo(todo1);
domManager.addToDo(todo2);