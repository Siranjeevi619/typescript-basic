const inputEl = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const listEl = document.getElementById("todoList");
addBtn.addEventListener("click", addTodo);
let todos = JSON.parse(localStorage.getItem("task-data") || "[]");
renderTodos();
function addTodo() {
    const text = inputEl.value.trim();
    if (text === "")
        return;
    const newTodo = {
        id: Date.now(),
        text,
        status: false,
    };
    todos.push(newTodo);
    inputEl.value = "";
    saveTodos();
    renderTodos();
}
function toggleTodo(id) {
    todos = todos.map((todo) => todo.id === id ? Object.assign(Object.assign({}, todo), { status: !todo.status }) : todo);
    saveTodos();
    renderTodos();
}
function deleteTodo(id) {
    todos = todos.filter((todo) => todo.id !== id);
    saveTodos();
    renderTodos();
}
function saveTodos() {
    localStorage.setItem("task-data", JSON.stringify(todos));
}
function editTask(id) {
    var todo = todos.find((task) => task.id === id);
    if (!todo)
        return;
    const updatedTask = prompt("update task", todo.text);
    if (updatedTask && updatedTask.trim() !== "") {
        todo.text = updatedTask.trim();
        saveTodos();
        renderTodos();
    }
}
function renderTodos() {
    listEl.innerHTML = "";
    todos.forEach((todo) => {
        const li = document.createElement("li");
        const textSpan = document.createElement("span");
        textSpan.textContent = todo.text;
        if (todo.status)
            textSpan.classList.add("completed");
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
export {};
