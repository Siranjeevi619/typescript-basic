interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const inputEl = document.getElementById("todoInput") as HTMLInputElement;
const addBtn = document.getElementById("addBtn") as HTMLButtonElement;
const listEl = document.getElementById("todoList") as HTMLUListElement;

let todos: Todo[] = [];

addBtn.addEventListener("click", addTodo);

function addTodo(): void {
  const text = inputEl.value.trim();
  if (text === "") return;

  const newTodo: Todo = {
    id: Date.now(),
    text,
    completed: false,
  };

  todos.push(newTodo);
  inputEl.value = "";
  renderTodos();
}

function toggleTodo(id: number): void {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  renderTodos();
}

function deleteTodo(id: number): void {
  todos = todos.filter((todo) => todo.id !== id);
  renderTodos();
}

function renderTodos(): void {
  listEl.innerHTML = "";

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = todo.text;
    if (todo.completed) li.classList.add("completed");

    li.addEventListener("click", () => toggleTodo(todo.id));

    const delBtn = document.createElement("button");
    delBtn.textContent = "✕";
    delBtn.className = "delete-btn";
    delBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      deleteTodo(todo.id);
    });

    li.appendChild(delBtn);
    listEl.appendChild(li);
  });
}
