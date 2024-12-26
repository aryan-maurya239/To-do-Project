document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("task-form");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  // Load tasks from localStorage on page load
  const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.forEach((taskText) => createTaskElement(taskText));
  };

  // Save tasks to localStorage
  const saveTasks = () => {
    const tasks = Array.from(
      document.querySelectorAll("#task-list li span")
    ).map((task) => task.textContent);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  // Add a new task
  taskForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent page refresh

    const taskText = taskInput.value.trim(); // Get input value
    if (taskText === "") return; // Ignore empty input

    createTaskElement(taskText);
    saveTasks(); // Save to localStorage

    taskInput.value = ""; // Clear input field
  });

  // Create a task element using innerHTML
  function createTaskElement(taskText) {
    const taskItem = document.createElement("li");
    taskItem.className = "task";
    taskItem.innerHTML = `
      <div class="li-box">
        <input type="checkbox" name="task">
        <span class="tasktext">${taskText}</span>
      </div>
      <div class="li-box">
        <button class="edit-button"><img src="./img/edit.png" alt="edit"></button>
        <button class="delete-button"><img src="./img/bin.png" alt="delete"></button>
      </div>
    `;

    // Attach event listeners to buttons
    const editButton = taskItem.querySelector(".edit-button");
    const deleteButton = taskItem.querySelector(".delete-button");
    const taskContent = taskItem.querySelector("span");

    editButton.addEventListener("click", () =>
      editTask(taskItem, taskContent)
    );

    deleteButton.addEventListener("click", () => {
      taskList.removeChild(taskItem);
      saveTasks(); // Save to localStorage
    });

    taskList.appendChild(taskItem);
  }

  // Edit a task
  // Edit a task
  function editTask(taskItem, taskContent) {
    // Replace task content with an input field
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = taskContent.textContent;
    editInput.className = "edit-input";

    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";

    // Save the edited task
    saveButton.addEventListener("click", () => {
      const updatedText = editInput.value.trim();
      if (updatedText !== "") {
        taskContent.textContent = updatedText;
        taskItem.replaceChild(taskContent, editInput);
        taskItem.replaceChild(editButton, saveButton);
        saveTasks(); // Save to localStorage
      }
    });

    // Replace task content with input and "Save" button
    taskItem.replaceChild(editInput, taskContent);
    taskItem.replaceChild(saveButton, taskItem.querySelector("button"));
  }

  // Call loadTasks on DOMContentLoaded
  loadTasks();
});
