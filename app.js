
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Render saved tasks when the page loads
tasks.forEach(function (task) {
  createTask(task.text, task.completed);
});

function addTask() {
  let input = document.getElementById("taskInput");
  let taskText = input.value.trim();

  if (taskText === "") return;

  // Add to UI
  createTask(taskText, false);

  // Add to array
  tasks.push({
    text: taskText,
    completed: false
  });

  // Save to localStorage
  saveTasks();

  // Clear input
  input.value = "";
}

function createTask(taskText, completed) {
  let li = document.createElement("li");

  // Task text
  let span = document.createElement("span");
  span.textContent = taskText;

  if (completed) {
    span.classList.add("completed");
  }

  // Toggle completed
  span.onclick = function () {
    span.classList.toggle("completed");
    updateTaskStatus(
      taskText,
      span.classList.contains("completed")
    );
  };

  // Delete button
  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";

  deleteBtn.onclick = function () {
    li.remove();

    tasks = tasks.filter(function (task) {
      return task.text !== taskText;
    });

    saveTasks();
  };

  li.appendChild(span);
  li.appendChild(deleteBtn);

  document.getElementById("taskList").appendChild(li);
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskStatus(taskText, completed) {
  tasks = tasks.map(function (task) {
    if (task.text === taskText) {
      return {
        text: task.text,
        completed: completed
      };
    }

    return task;
  });

  saveTasks();
}
