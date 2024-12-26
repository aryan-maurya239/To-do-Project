let tasks = [];

// Load tasks from local storage when the page loads
const loadTasksFromStorage = () => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        updateTasklist();
        updateStas();
    }
};

// Save tasks to local storage
const saveTasksToStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const addTask = () => {
    const taskInput = document.getElementById('task-input').value;
    const text = taskInput.trim();

    if (text) {
        tasks.push({ text: text, Completed: false });
        saveTasksToStorage(); // Save to local storage
        updateTasklist();
        updateStas();
        document.getElementById('task-input').value = ""; // Clear the input field
    }
};

const toggleTaskcomplat = (index) => {
    tasks[index].Completed = !tasks[index].Completed;
    saveTasksToStorage(); // Save to local storage
    updateTasklist();
    updateStas();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    saveTasksToStorage(); // Save to local storage
    updateTasklist();
    updateStas();
};

const editTask = (index) => {
    const taskInput = document.getElementById("task-input");
    taskInput.value = tasks[index].text;
    tasks.splice(index, 1); // Remove the task being edited
    saveTasksToStorage(); // Save to local storage
    updateTasklist();
    updateStas();
};

const updateStas = () => {
    const completedTask = tasks.filter(task => task.Completed).length;
    const totalElement = tasks.length;

    const progress = totalElement > 0 ? (completedTask / totalElement) * 100 : 0;
    const totalTask = document.getElementById('totalTask');
    totalTask.innerText = `${completedTask}/${totalElement}`;
    
    const progressValue = document.getElementById("progress-value");
    progressValue.style.width = `${progress}%`;
};

const updateTasklist = () => {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";
    tasks.forEach((tas, index) => {
        const taskItem = document.createElement("li");
        taskItem.className = "task";
        taskItem.innerHTML = `
      <div class="li-box ${tas.Completed ? "completed" : ""}">
        <input type="checkbox" name="task" ${tas.Completed ? "checked" : ""}>
        <span class="tasktext">${tas.text}</span>
      </div>
      <div class="li-box">
        <button onclick="editTask(${index})" class="edit-button"><img src="./img/edit.png" alt="edit"></button>
        <button onclick="deleteTask(${index})" class="delete-button"><img src="./img/bin.png" alt="delete"></button>
      </div>
    `;
        taskItem.addEventListener("change", () => toggleTaskcomplat(index));
        taskList.appendChild(taskItem);
    });
};

// Event listener for the "Add Task" button
const taskElement = document.getElementById('new-task');
if (taskElement) {
    taskElement.addEventListener('click', (e) => {
        e.preventDefault();
        addTask();
    });
} else {
    console.error("Element with id 'new-task' not found.");
}

// Initialize tasks from local storage when the page loads
document.addEventListener("DOMContentLoaded", loadTasksFromStorage);
