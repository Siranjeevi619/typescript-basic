import Todo from "./modules/Todo.js";

document.title = "Todo app";

const inputEl = document.getElementById("todoInput") as HTMLInputElement;
const addBtn = document.getElementById("addBtn") as HTMLButtonElement;
const listEl = document.getElementById("todoList") as HTMLUListElement;
const searchTask = document.createElement("input") as HTMLInputElement;

const divEl = document.getElementById("searchBar") as HTMLDivElement;
const searchButton = document.createElement("button") as HTMLButtonElement;
searchButton.innerText = "Search";
searchButton.style.color = "white";
searchButton.style.backgroundColor = "blue";

divEl.style.paddingTop = "10px";
divEl.style.paddingBottom = "10px";
searchTask.placeholder = "Search task";
divEl.appendChild(searchTask);
divEl.appendChild(searchButton);

let allTodos: Todo[] = JSON.parse(localStorage.getItem("task-data") || "[]");
let todos: Todo[] = [...allTodos];

searchButton.addEventListener("click", (e) => {
  e.stopPropagation();
  const val = searchTask.value;
  filterTask(val);
});

// searchTask.addEventListener("input", (e) => {
//   e.stopPropagation();
//   const val = searchTask.value;
//   filterTask(val);
// });

addBtn.addEventListener("click", addTodo);

renderTodos();

function addTodo(): void {
  const text = inputEl.value.trim();
  if (text === "") return;
  const newTodo: Todo = {
    id: Date.now(),
    text,
    status: false,
  };
  allTodos.push(newTodo);
  todos = [...allTodos];
  inputEl.value = "";
  saveTodos();
  renderTodos();
}

function toggleTodo(id: number): void {
  allTodos = allTodos.map((todo) =>
    todo.id === id ? { ...todo, status: !todo.status } : todo
  );
  todos = [...allTodos];
  saveTodos();
  renderTodos();
}

function deleteTodo(id: number): void {
  allTodos = allTodos.filter((todo) => todo.id !== id);
  todos = [...allTodos];
  saveTodos();
  renderTodos();
}

function saveTodos(): void {
  localStorage.setItem("task-data", JSON.stringify(allTodos));
}

function editTask(id: number): void {
  const todo = allTodos.find((task) => task.id === id);
  if (!todo) return;
  const updatedTask = prompt("update task", todo.text);
  if (updatedTask && updatedTask.trim() !== "") {
    todo.text = updatedTask.trim();
    saveTodos();
    todos = [...allTodos];
    renderTodos();
  }
}

function renderTodos(): void {
  listEl.innerHTML = "";
  todos.forEach((todo) => {
    const li = document.createElement("li");
    const textSpan = document.createElement("span");
    textSpan.textContent = todo.text;
    if (todo.status) textSpan.classList.add("completed");

    const updateButton = document.createElement("button");
    updateButton.innerText = todo.status ? "Undo" : "Complete";
    updateButton.style.backgroundColor = todo.status === false ? "red" : "blue";
    updateButton.className = "update-btn";
    updateButton.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleTodo(todo.id);
      saveTodos();
    });

    const editBtn = document.createElement("button");
    editBtn.innerText = "edit";
    editBtn.style.backgroundColor = "yellow";
    editBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      editTask(todo.id);
    });

    const delBtn = document.createElement("button");
    delBtn.textContent = "✕";
    delBtn.className = "delete-btn";
    delBtn.style.borderColor = "red";
    delBtn.style.borderRadius = "6px";
    delBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      deleteTodo(todo.id);
    });

    li.appendChild(textSpan);
    li.appendChild(updateButton);
    li.appendChild(editBtn);
    li.appendChild(delBtn);
    listEl.appendChild(li);
  });
}

function filterTask(task: string): void {
  if (task.trim() === "") {
    todos = [...allTodos];
  } else {
    todos = allTodos.filter((todo) =>
      todo.text.toLowerCase().includes(task.toLowerCase())
    );
  }
  renderTodos();
}
