let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// render saved tasks on load
tasks.forEach(task => {
  createTask(task.text, task.completed);
});

function addTask() {
  let input = document.getElementById("taskInput");
  let task = input.value;

  if (task === "") return;

  createTask(task, false);

  tasks.push({
    text: task,
    completed: false
  });

  saveTasks();

  input.value = "";
}

function createTask(taskText, completed) {
  // create list item
  let li = document.createElement("li");

  // task text
  let span = document.createElement("span");
  span.textContent = taskText;

  if (completed) {
    span.classList.add("completed");
  }

  // mark as completed
  span.onclick = function () {
    span.classList.toggle("completed");

    updateTaskStatus(taskText, span.classList.contains("completed"));
  };

  // delete button
  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";

  deleteBtn.onclick = function () {
    li.remove();

    tasks = tasks.filter(task => task.text !== taskText);

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
  tasks = tasks.map(task => {
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
