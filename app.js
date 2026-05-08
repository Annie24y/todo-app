function addTask() {
  let input = document.getElementById("taskInput");
  let task = input.value;

  if (task === "") return;

  // create list item
  let li = document.createElement("li");

  // task text
  let span = document.createElement("span");
  span.textContent = task;

  // mark as completed
  span.onclick = function () {
    span.classList.toggle("completed");
  };

  // delete button
  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";

  deleteBtn.onclick = function () {
    li.remove();
  };

  li.appendChild(span);
  li.appendChild(deleteBtn);

  document.getElementById("taskList").appendChild(li);

  input.value = "";
}
