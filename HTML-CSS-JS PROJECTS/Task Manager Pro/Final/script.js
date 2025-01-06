// Get todos from localStorage or initialize empty array
let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all";

// Function to save todos to localStorage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Function to render todos
function renderTodos() {
  const todoList = document.getElementById("todoList");
  todoList.innerHTML = "";

  const filteredTodos = todos.filter((todo) => {
    if (currentFilter === "completed") return todo.completed;
    if (currentFilter === "pending") return !todo.completed;
    return true;
  });

  filteredTodos.forEach((todo, index) => {
    const li = document.createElement("li");
    if (todo.completed) {
      li.classList.add("completed");
    }

    li.innerHTML = `
      <div class="todo-content">
        <span class="todo-text">${todo.text}</span>
      </div>
      <div class="todo-actions">
        <button onclick="toggleTodo(${index})" class="action-btn complete-btn">
          <i class="fas ${todo.completed ? "fa-rotate-left" : "fa-check"}"></i>
        </button>
        <button onclick="deleteTodo(${index})" class="action-btn delete-btn">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `;

    todoList.appendChild(li);
  });
}

// Function to add new todo
function addTodo() {
  const input = document.getElementById("todoInput");
  const text = input.value.trim();

  if (text) {
    todos.push({
      text: text,
      completed: false,
    });

    input.value = "";
    saveTodos();
    renderTodos();
  }
}

// Function to toggle todo completion
function toggleTodo(index) {
  todos[index].completed = !todos[index].completed;
  saveTodos();
  renderTodos();
}

// Function to delete todo
function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
}

// Add event listeners
document.getElementById("todoInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTodo();
  }
});

// Add filter functionality
document.querySelector(".filters").addEventListener("click", function (e) {
  const filterBtn = e.target.closest(".filter-btn");
  if (!filterBtn) return;

  // Remove active class from all buttons
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.remove("active");
  });

  // Add active class to clicked button
  filterBtn.classList.add("active");

  // Update current filter
  currentFilter = filterBtn.dataset.filter;
  renderTodos();
});

// Initial render
renderTodos();
