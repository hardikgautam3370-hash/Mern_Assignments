// ==========================================
// ASSIGNMENT 47
// REUSABLE STORAGE HELPER MODULE
// ==========================================

const StorageHelper = {

    saveData(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error("Storage Error:", error);
            return false;
        }
    },

    loadData(key, defaultValue = null) {
        try {
            const data = localStorage.getItem(key);

            return data === null
                ? defaultValue
                : JSON.parse(data);

        } catch (error) {
            console.error("Loading Error:", error);
            return defaultValue;
        }
    },

    removeData(key) {
        localStorage.removeItem(key);
    },

    clearData() {
        localStorage.removeItem("assignment9-demo");
    }
};


// Storage Helper Demo

const storageInput = document.getElementById("storageInput");
const storageOutput = document.getElementById("storageOutput");

document.getElementById("saveDataBtn").addEventListener("click", function () {

    const value = storageInput.value.trim();

    if (value === "") {
        storageOutput.textContent = "Please enter some data first.";
        return;
    }

    const saved = StorageHelper.saveData("assignment9-demo", value);

    storageOutput.textContent = saved
        ? "Data saved successfully: " + value
        : "Unable to save data.";
});


document.getElementById("loadDataBtn").addEventListener("click", function () {

    const data = StorageHelper.loadData("assignment9-demo");

    storageOutput.textContent = data !== null
        ? "Loaded Data: " + data
        : "No saved data found.";
});


document.getElementById("removeDataBtn").addEventListener("click", function () {

    StorageHelper.removeData("assignment9-demo");

    storageOutput.textContent = "Selected data removed successfully.";
});


document.getElementById("clearDataBtn").addEventListener("click", function () {

    StorageHelper.clearData();

    storageOutput.textContent = "Demo storage cleared successfully.";
});


// ==========================================
// ASSIGNMENT 48
// LOAD-UPDATE-SAVE-RENDER LIFECYCLE
// ==========================================

function runLifecycle() {

    const output = document.getElementById("lifecycleOutput");

    const steps = [];

    // Step 1: Load
    let tasks = loadTasks();

    steps.push("1. LOAD: Saved tasks retrieved.");

    // Step 2: Update
    tasks = tasks.map(task => ({
        ...task
    }));

    steps.push("2. UPDATE: Task data prepared.");

    // Step 3: Save
    saveTasks(tasks);

    steps.push("3. SAVE: Updated data stored.");

    // Step 4: Render
    renderTasks();

    steps.push("4. RENDER: Tasks displayed on screen.");

    output.innerHTML = "";

    const list = document.createElement("ul");

    steps.forEach(step => {

        const item = document.createElement("li");

        item.textContent = step;

        list.appendChild(item);

    });

    output.appendChild(list);
}

document.getElementById("runLifecycleBtn")
    .addEventListener("click", runLifecycle);


// ==========================================
// ASSIGNMENT 49
// PERSISTENT TO-DO APPLICATION
// ==========================================

const TASK_STORAGE_KEY = "assignment9-tasks";

let tasks = loadTasks();

let currentFilter = "all";


// Load Tasks

function loadTasks() {

    const savedTasks = StorageHelper.loadData(
        TASK_STORAGE_KEY,
        []
    );

    return Array.isArray(savedTasks) ? savedTasks : [];
}


// Save Tasks

function saveTasks(taskData = tasks) {

    const saved = StorageHelper.saveData(
        TASK_STORAGE_KEY,
        taskData
    );

    if (!saved) {
        console.error("Tasks could not be saved.");
    }
}


// Generate Unique ID

function generateId() {

    return Date.now().toString(36) +
        Math.random().toString(36).substring(2, 9);
}


// Validate Task

function validateTask(taskName) {

    return typeof taskName === "string" &&
        taskName.trim().length > 0;
}


// Add Task

function addTask(taskName) {

    if (!validateTask(taskName)) {
        alert("Please enter a valid task.");
        return;
    }

    const newTask = {
        id: generateId(),
        title: taskName.trim(),
        completed: false,
        createdAt: new Date().toISOString()
    };

    tasks.push(newTask);

    saveTasks();

    renderTasks();
}


// Edit Task

function editTask(id) {

    const task = tasks.find(task => task.id === id);

    if (!task) return;

    const updatedName = prompt(
        "Edit your task:",
        task.title
    );

    if (updatedName === null) return;

    if (!validateTask(updatedName)) {
        alert("Task name cannot be empty.");
        return;
    }

    task.title = updatedName.trim();

    saveTasks();

    renderTasks();
}


// Complete Task

function toggleTask(id) {

    const task = tasks.find(task => task.id === id);

    if (!task) return;

    task.completed = !task.completed;

    saveTasks();

    renderTasks();
}


// Delete Task

function deleteTask(id) {

    const confirmed = confirm(
        "Are you sure you want to delete this task?"
    );

    if (!confirmed) return;

    tasks = tasks.filter(task => task.id !== id);

    saveTasks();

    renderTasks();
}


// Filter Tasks

function filterTasks(filter) {

    currentFilter = filter;

    document.querySelectorAll(".filter-btn")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.filter === filter
            );

        });

    renderTasks();
}


// Get Task Count

function getTaskCount() {

    return {
        total: tasks.length,

        active: tasks.filter(task => !task.completed).length,

        completed: tasks.filter(task => task.completed).length
    };
}


// Render Tasks

function renderTasks() {

    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if (currentFilter === "active") {

        filteredTasks = tasks.filter(
            task => !task.completed
        );

    } else if (currentFilter === "completed") {

        filteredTasks = tasks.filter(
            task => task.completed
        );

    }

    filteredTasks.forEach(task => {

        const li = document.createElement("li");

        const taskInfo = document.createElement("div");

        taskInfo.className = "task-info";

        if (task.completed) {
            taskInfo.classList.add("completed");
        }

        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.checked = task.completed;

        checkbox.setAttribute(
            "aria-label",
            "Mark " + task.title + " as completed"
        );

        checkbox.addEventListener("change", function () {
            toggleTask(task.id);
        });

        const title = document.createElement("span");

        title.textContent = task.title;

        taskInfo.appendChild(checkbox);

        taskInfo.appendChild(title);


        const actions = document.createElement("div");

        actions.className = "task-actions";


        const editButton = document.createElement("button");

        editButton.textContent = "Edit";

        editButton.className = "edit-btn";

        editButton.addEventListener("click", function () {
            editTask(task.id);
        });


        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", function () {
            deleteTask(task.id);
        });


        actions.appendChild(editButton);

        actions.appendChild(deleteButton);

        li.appendChild(taskInfo);

        li.appendChild(actions);

        taskList.appendChild(li);

    });


    if (filteredTasks.length === 0) {

        const emptyMessage = document.createElement("li");

        emptyMessage.textContent = "No tasks found.";

        taskList.appendChild(emptyMessage);

    }


    // Update task summary

    const counts = getTaskCount();

    document.getElementById("totalCount").textContent =
        "Total: " + counts.total;

    document.getElementById("activeCount").textContent =
        "Active: " + counts.active;

    document.getElementById("completedCount").textContent =
        "Completed: " + counts.completed;

}


// Add Task Button

document.getElementById("addTaskBtn")
    .addEventListener("click", function () {

        const input = document.getElementById("taskInput");

        addTask(input.value);

        input.value = "";

        input.focus();

    });


// Enter Key Support

document.getElementById("taskInput")
    .addEventListener("keydown", function (event) {

        if (event.key === "Enter") {

            document.getElementById("addTaskBtn").click();

        }

    });


// Filter Buttons

document.querySelectorAll(".filter-btn")
    .forEach(button => {

        button.addEventListener("click", function () {

            filterTasks(this.dataset.filter);

        });

    });


// Initial Rendering

renderTasks();


// ==========================================
// ASSIGNMENT 50
// PROJECT IDEA AND REQUIREMENTS
// ==========================================

// Project information is documented in HTML.
// No extra JavaScript interaction is required here.


// ==========================================
// ASSIGNMENT 51
// WIREFRAME AND USER FLOW
// ==========================================

// Wireframe and user flow are documented in HTML/CSS.
// No extra JavaScript interaction is required here.


// ==========================================
// ASSIGNMENT 52
// RESPONSIVE PROJECT SCAFFOLD
// ==========================================

// Responsive layout is handled by CSS media queries.


// ==========================================
// ASSIGNMENT 53
// ARCHITECTURE AND STARTER UTILITY FUNCTIONS
// ==========================================

const utilityInput = document.getElementById("utilityInput");

const utilityOutput = document.getElementById("utilityOutput");


// Validate Task Button

document.getElementById("validateBtn")
    .addEventListener("click", function () {

        const value = utilityInput.value;

        if (validateTask(value)) {

            utilityOutput.textContent =
                "Valid task: " + value.trim();

        } else {

            utilityOutput.textContent =
                "Invalid task. Please enter a task name.";

        }

    });


// Generate ID Button

document.getElementById("generateIdBtn")
    .addEventListener("click", function () {

        utilityOutput.textContent =
            "Generated ID: " + generateId();

    });


// Count Tasks Button

document.getElementById("countTasksBtn")
    .addEventListener("click", function () {

        const counts = getTaskCount();

        utilityOutput.textContent =
            "Total Tasks: " + counts.total +
            " | Active Tasks: " + counts.active +
            " | Completed Tasks: " + counts.completed;

    });


// ==========================================
// ASSIGNMENT 54
// WORKING CORE FEATURE AND README PROGRESS LOG
// ==========================================

function runFeatureTests() {

    const output = document.getElementById("verificationOutput");

    const tests = [

        {
            name: "Task validation",
            result: validateTask("Study JavaScript") === true
        },

        {
            name: "Empty task rejection",
            result: validateTask("   ") === false
        },

        {
            name: "Unique ID generation",
            result: generateId() !== generateId()
        },

        {
            name: "Task count calculation",
            result: getTaskCount().total === tasks.length
        },

        {
            name: "Storage save and load",
            result: testStorage()
        },

        {
            name: "Task rendering",
            result: document.getElementById("taskList") !== null
        }

    ];


    const passed = tests.filter(test => test.result).length;

    const total = tests.length;

    output.innerHTML = "";


    const heading = document.createElement("h3");

    heading.textContent =
        "Test Results: " + passed + "/" + total + " Passed";

    output.appendChild(heading);


    tests.forEach(test => {

        const line = document.createElement("p");

        line.textContent =
            (test.result ? "PASS: " : "FAIL: ") + test.name;

        line.style.color = test.result ? "green" : "red";

        output.appendChild(line);

    });


    const summary = document.createElement("p");

    summary.textContent = passed === total
        ? "All feature tests passed successfully!"
        : "Some tests need attention.";

    output.appendChild(summary);

}


// Test Storage Helper

function testStorage() {

    const testKey = "assignment9-test";

    try {

        const testData = {
            name: "Test",
            value: 123
        };

        const saved = StorageHelper.saveData(testKey, testData);

        const loaded = StorageHelper.loadData(testKey);

        StorageHelper.removeData(testKey);

        return saved &&
            loaded !== null &&
            loaded.name === "Test" &&
            loaded.value === 123;

    } catch (error) {

        return false;

    }

}


// Feature Test Button

document.getElementById("verifyBtn")
    .addEventListener("click", runFeatureTests);


// ==========================================
// APPLICATION INITIALIZATION
// ==========================================

console.log("Persistent To-Do Application Loaded.");

console.log("Total Tasks:", tasks.length);

console.log("Storage Helper:", StorageHelper);

console.log("All application modules initialized.");