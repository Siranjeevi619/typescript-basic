import Todo from "./modules/Todo.js";

const inputEl = document.getElementById("todoInput") as HTMLInputElement;
const addBtn = document.getElementById("addBtn") as HTMLButtonElement;
const listEl = document.getElementById("todoList") as HTMLUListElement;

addBtn.addEventListener("click", addTodo);

let todos: Todo[] = JSON.parse(localStorage.getItem("task-data") || "[]");
renderTodos();

function addTodo(): void {
  const text = inputEl.value.trim();
  if (text === "") return;

  const newTodo: Todo = {
    id: Date.now(),
    text,
    status: false,
  };

  todos.push(newTodo);
  inputEl.value = "";
  saveTodos();
  renderTodos();
}

function toggleTodo(id: number): void {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, status: !todo.status } : todo
  );
  saveTodos();
  renderTodos();
}

function deleteTodo(id: number): void {
  todos = todos.filter((todo) => todo.id !== id);
  saveTodos();
  renderTodos();
}

function saveTodos(): void {
  localStorage.setItem("task-data", JSON.stringify(todos));
}

function editTask(id: number): void {
  var todo = todos.find((task) => task.id === id);
  if (!todo) return;
  const updatedTask = prompt("update task", todo.text);
  if (updatedTask && updatedTask.trim() !== "") {
    todo.text = updatedTask.trim();
    saveTodos();
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
