import "../styles/style.css";
import { todoManager, domManager } from "./controller";

const todo = todoManager.createToDo(
    'get dressed',
    'get dressed',
    '20-1-2025',
    'high'
)

domManager.addToDo(todo);