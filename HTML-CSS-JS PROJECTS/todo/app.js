document.addEventListener("DOMContentLoaded", () => {
  //Select all the elements
  const todoTitle = document.getElementById("todoTitle");
  const todoDesc = document.getElementById("todoDesc");
  const addBtn = document.getElementById("addBtn");
  const todoList = document.getElementById("todoList");

  //Load todos from localstorage
  const todos = JSON.parse(localStorage.getItem("todos")) || [];

  //Render todos
  function renderTodos() {
    todoList.innerHTML = todos
      .map(
        (todo, index) => ` <div class="card todo-item">
            <div class="todo-content">
              <h3>${todo.title}</h3>
              <p>${todo.description}</p>
              <span class="status status-pending">Pending</span>
            </div>
            <!-- Actions -->
            <div class="todo-actions">
              <button onclick="editTodo(${index})" class="btn edit-btn">
                <i class="fas fa-edit"></i>
              </button>
              <button onclick="deleteTodo(${index})" class="btn delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>`
      )
      .join("");
  }

  renderTodos();
  //add new todo and save into localstorage
  function addTodo() {
    const title = todoTitle.value.trim();
    const description = todoDesc.value.trim();
    if (title) {
      todos.push({
        title,
        description,
      });
      todoTitle.value = "";
      todoDesc.value = "";
    }
    renderTodos();
    //save into localstorage
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  //delete todo
  window.deleteTodo = (todoIndex) => {
    todos.splice(todoIndex, 1);
    //update the ui
    renderTodos();
  };

  //edit
  window.editTodo = (todoIndex) => {
    const todoToEdit = todos[todoIndex];
    todoTitle.value = todoToEdit.title || "";
    todoDesc.value = todoToEdit.description | "";
    todos.splice(todoIndex, 1);
    renderTodos();
  };
  addBtn.addEventListener("click", addTodo);
});
