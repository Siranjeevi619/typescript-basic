var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var inputEl = document.getElementById("todoInput");
var addBtn = document.getElementById("addBtn");
var listEl = document.getElementById("todoList");
var todos = [];
addBtn.addEventListener("click", addTodo);
function addTodo() {
    var text = inputEl.value.trim();
    if (text === "")
        return;
    var newTodo = {
        id: Date.now(),
        text: text,
        completed: false,
    };
    todos.push(newTodo);
    inputEl.value = "";
    renderTodos();
}
function toggleTodo(id) {
    todos = todos.map(function (todo) {
        return todo.id === id ? __assign(__assign({}, todo), { completed: !todo.completed }) : todo;
    });
    renderTodos();
}
function deleteTodo(id) {
    todos = todos.filter(function (todo) { return todo.id !== id; });
    renderTodos();
}
function renderTodos() {
    listEl.innerHTML = "";
    todos.forEach(function (todo) {
        var li = document.createElement("li");
        li.textContent = todo.text;
        if (todo.completed)
            li.classList.add("completed");
        li.addEventListener("click", function () { return toggleTodo(todo.id); });
        var delBtn = document.createElement("button");
        delBtn.textContent = "✕";
        delBtn.className = "delete-btn";
        delBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            deleteTodo(todo.id);
        });
        li.appendChild(delBtn);
        listEl.appendChild(li);
    });
}
