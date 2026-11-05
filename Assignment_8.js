"use strict";

// ==========================================
// ASSIGNMENT 38: ACCESSIBLE PROFILE STATES
// ==========================================

const profileBox = document.querySelector(".profile-box");
const profileStatus = document.getElementById("profile-status");

const profileStateButtons = {
    "available-btn": "available",
    "busy-btn": "busy",
    "away-btn": "away"
};

function setProfileState(state) {
    profileBox.classList.remove(
        "state-available",
        "state-busy",
        "state-away"
    );

    profileBox.classList.add(`state-${state}`);

    profileStatus.textContent =
        `Status: ${state.charAt(0).toUpperCase()}${state.slice(1)}`;

    Object.entries(profileStateButtons).forEach(([id, buttonState]) => {
        document.getElementById(id).setAttribute(
            "aria-pressed",
            String(buttonState === state)
        );
    });
}

Object.entries(profileStateButtons).forEach(([id, state]) => {
    document.getElementById(id).addEventListener("click", () => {
        setProfileState(state);
    });
});

setProfileState("available");


// ==========================================
// ASSIGNMENT 39: EVENT MAP
// ==========================================

const eventMap = [
    {
        element: "available-btn",
        event: "click",
        action: "Sets profile status to Available"
    },
    {
        element: "busy-btn",
        event: "click",
        action: "Sets profile status to Busy"
    },
    {
        element: "away-btn",
        event: "click",
        action: "Sets profile status to Away"
    },
    {
        element: "render-cards-btn",
        event: "click",
        action: "Renders reusable information cards"
    },
    {
        element: "reading-form",
        event: "submit",
        action: "Adds a book to the reading list"
    },
    {
        element: "contact-form",
        event: "submit",
        action: "Validates and displays contact summary"
    },
    {
        element: "todo-form",
        event: "submit",
        action: "Adds or updates a to-do task"
    },
    {
        element: "settings-form",
        event: "submit",
        action: "Saves persistent settings"
    }
];

document.getElementById("show-event-map-btn").addEventListener("click", () => {
    document.getElementById("event-map-output").textContent =
        eventMap.map((event, index) =>
            `${index + 1}. Element: ${event.element}\n` +
            `   Event: ${event.event}\n` +
            `   Action: ${event.action}`
        ).join("\n\n");
});


// ==========================================
// ASSIGNMENT 40: REUSABLE CARD RENDERING
// ==========================================

const cardData = [
    {
        title: "HTML",
        description: "Creates the structure of a webpage."
    },
    {
        title: "CSS",
        description: "Styles the webpage and makes layouts responsive."
    },
    {
        title: "JavaScript",
        description: "Adds logic and interactive behaviour."
    }
];

function createCard(item) {
    const card = document.createElement("article");
    card.className = "generated-card";

    const heading = document.createElement("h3");
    heading.textContent = item.title;

    const description = document.createElement("p");
    description.textContent = item.description;

    card.append(heading, description);

    return card;
}

document.getElementById("render-cards-btn").addEventListener("click", () => {
    const container = document.getElementById("reusable-cards");
    container.replaceChildren();

    cardData.forEach(item => {
        container.appendChild(createCard(item));
    });
});


// ==========================================
// ASSIGNMENT 41: DYNAMIC READING LIST
// ==========================================

let readingList = [];
let nextBookId = 1;

function renderReadingList() {
    const container = document.getElementById("reading-list");
    container.replaceChildren();

    if (readingList.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.textContent = "Your reading list is empty.";
        container.appendChild(emptyMessage);
        return;
    }

    readingList.forEach(book => {
        const item = document.createElement("article");
        item.className = "list-item";

        if (book.read) {
            item.classList.add("completed");
        }

        const title = document.createElement("h3");
        title.className = "item-title";
        title.textContent = book.title;

        const author = document.createElement("p");
        author.textContent = `Author: ${book.author}`;

        const status = document.createElement("p");
        status.textContent = book.read ? "Status: Read" : "Status: Not read";

        const toggleButton = document.createElement("button");
        toggleButton.type = "button";
        toggleButton.textContent = book.read ? "Mark Unread" : "Mark Read";

        toggleButton.addEventListener("click", () => {
            book.read = !book.read;
            renderReadingList();
        });

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Delete Book";

        deleteButton.addEventListener("click", () => {
            readingList = readingList.filter(item => item.id !== book.id);
            renderReadingList();
        });

        item.append(title, author, status, toggleButton, deleteButton);
        container.appendChild(item);
    });
}

document.getElementById("reading-form").addEventListener("submit", event => {
    event.preventDefault();

    const titleInput = document.getElementById("book-title");
    const authorInput = document.getElementById("book-author");

    const title = titleInput.value.trim();
    const author = authorInput.value.trim();

    if (!title || !author) {
        return;
    }

    readingList.push({
        id: nextBookId++,
        title,
        author,
        read: false
    });

    renderReadingList();
    event.target.reset();
    titleInput.focus();
});

renderReadingList();


// ==========================================
// ASSIGNMENT 42: CONTACT FORM SUMMARY
// ==========================================

document.getElementById("contact-form").addEventListener("submit", event => {
    event.preventDefault();

    const name = document.getElementById("contact-name").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const subject = document.getElementById("contact-subject").value.trim();
    const message = document.getElementById("contact-message").value.trim();

    const output = document.getElementById("contact-summary");

    if (!name || !email || !subject || !message) {
        output.textContent = "Please complete all fields.";
        return;
    }

    const summary = document.createElement("div");

    const heading = document.createElement("h3");
    heading.textContent = "Submission Summary";

    const nameLine = document.createElement("p");
    nameLine.textContent = `Name: ${name}`;

    const emailLine = document.createElement("p");
    emailLine.textContent = `Email: ${email}`;

    const subjectLine = document.createElement("p");
    subjectLine.textContent = `Subject: ${subject}`;

    const messageLine = document.createElement("p");
    messageLine.textContent = `Message: ${message}`;

    const note = document.createElement("p");
    note.textContent =
        "Demo only: the form summary is displayed locally; no email was sent.";

    summary.append(
        heading,
        nameLine,
        emailLine,
        subjectLine,
        messageLine,
        note
    );

    output.replaceChildren(summary);
});


// ==========================================
// ASSIGNMENT 43: VALIDATION TEST MATRIX
// ==========================================

function isValidName(name) {
    return typeof name === "string" && name.trim().length > 0;
}

function isValidEmail(email) {
    if (typeof email !== "string") {
        return false;
    }

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

document.getElementById("run-validation-tests-btn").addEventListener("click", () => {
    const tests = [
        {
            name: "Empty name",
            actual: isValidName(""),
            expected: false
        },
        {
            name: "Whitespace-only name",
            actual: isValidName("   "),
            expected: false
        },
        {
            name: "Valid name",
            actual: isValidName("Aman"),
            expected: true
        },
        {
            name: "Invalid email",
            actual: isValidEmail("abc"),
            expected: false
        },
        {
            name: "Email without domain suffix",
            actual: isValidEmail("test@example"),
            expected: false
        },
        {
            name: "Valid email",
            actual: isValidEmail("test@example.com"),
            expected: true
        }
    ];

    const passed = tests.filter(test => test.actual === test.expected).length;

    const lines = tests.map(test => {
        const result = test.actual === test.expected ? "PASS" : "FAIL";
        return `${result} — ${test.name} (expected: ${test.expected}, got: ${test.actual})`;
    });

    document.getElementById("validation-test-results").textContent =
        `${passed}/${tests.length} tests passed.\n\n` + lines.join("\n");
});


// ==========================================
// ASSIGNMENT 44: PERSISTENT TO-DO APP
// ==========================================

const TODO_STORAGE_KEY = "assignment8-todos";

let todos = [];
let currentFilter = "all";
let editingTodoId = null;
let nextTodoId = 1;

function loadTodos() {
    try {
        const saved = localStorage.getItem(TODO_STORAGE_KEY);

        if (!saved) {
            return [];
        }

        const parsed = JSON.parse(saved);

        if (!Array.isArray(parsed)) {
            return [];
        }

        return parsed.filter(todo =>
            todo &&
            Number.isInteger(todo.id) &&
            typeof todo.text === "string" &&
            typeof todo.completed === "boolean"
        );
    } catch (error) {
        console.warn("Could not load saved tasks:", error);
        return [];
    }
}

function saveTodos() {
    try {
        localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
        return true;
    } catch (error) {
        console.error("Could not save tasks:", error);
        return false;
    }
}

todos = loadTodos();
nextTodoId = todos.reduce((max, todo) => Math.max(max, todo.id), 0) + 1;

function renderTodos() {
    const container = document.getElementById("todo-list");
    container.replaceChildren();

    const visibleTodos = todos.filter(todo => {
        if (currentFilter === "active") {
            return !todo.completed;
        }

        if (currentFilter === "completed") {
            return todo.completed;
        }

        return true;
    });

    if (visibleTodos.length === 0) {
        const message = document.createElement("p");
        message.textContent = "No tasks in this view.";
        container.appendChild(message);
    }

    visibleTodos.forEach(todo => {
        const item = document.createElement("article");
        item.className = "list-item todo-task";

        if (todo.completed) {
            item.classList.add("is-completed");
        }

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "task-checkbox";
        checkbox.checked = todo.completed;
        checkbox.setAttribute("aria-label", `Mark ${todo.text} completed`);

        checkbox.addEventListener("change", () => {
            todo.completed = checkbox.checked;
            saveTodos();
            renderTodos();
        });

        const text = document.createElement("span");
        text.className = "task-text";
        text.textContent = todo.text;

        const editButton = document.createElement("button");
        editButton.type = "button";
        editButton.textContent = "Edit";

        editButton.addEventListener("click", () => {
            editingTodoId = todo.id;

            const input = document.getElementById("todo-input");
            input.value = todo.text;
            input.focus();

            document.getElementById("todo-submit-btn").textContent = "Save Changes";
            document.getElementById("cancel-edit-btn").hidden = false;
        });

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", () => {
            todos = todos.filter(item => item.id !== todo.id);

            if (editingTodoId === todo.id) {
                resetTodoEditor();
            }

            saveTodos();
            renderTodos();
        });

        item.append(checkbox, text, editButton, deleteButton);
        container.appendChild(item);
    });

    const remaining = todos.filter(todo => !todo.completed).length;

    document.getElementById("todo-count").textContent =
        `${todos.length} total task(s), ${remaining} active`;
    
    document.querySelectorAll(".todo-filter").forEach(button => {
        button.setAttribute(
            "aria-pressed",
            String(button.dataset.filter === currentFilter)
        );
    });
}

function resetTodoEditor() {
    editingTodoId = null;
    document.getElementById("todo-form").reset();
    document.getElementById("todo-submit-btn").textContent = "Add Task";
    document.getElementById("cancel-edit-btn").hidden = true;
}

document.getElementById("todo-form").addEventListener("submit", event => {
    event.preventDefault();

    const input = document.getElementById("todo-input");
    const text = input.value.trim();

    if (!text) {
        input.focus();
        return;
    }

    if (editingTodoId !== null) {
        const todo = todos.find(item => item.id === editingTodoId);

        if (todo) {
            todo.text = text;
        }
    } else {
        todos.push({
            id: nextTodoId++,
            text,
            completed: false
        });
    }

    saveTodos();
    resetTodoEditor();
    renderTodos();
});

document.getElementById("cancel-edit-btn").addEventListener("click", resetTodoEditor);

document.querySelectorAll(".todo-filter").forEach(button => {
    button.addEventListener("click", () => {
        currentFilter = button.dataset.filter;
        renderTodos();
    });
});

renderTodos();


// ==========================================
// ASSIGNMENT 45: STORAGE COMPARISON DEMO
// ==========================================

// This small example demonstrates both storage types.
try {
    localStorage.setItem("assignment8-storage-demo", "Saved across visits");
    sessionStorage.setItem("assignment8-session-demo", "Saved for this tab session");

    console.log("localStorage demo:", localStorage.getItem("assignment8-storage-demo"));
    console.log("sessionStorage demo:", sessionStorage.getItem("assignment8-session-demo"));
} catch (error) {
    console.warn("Browser storage is unavailable:", error);
}


// ==========================================
// ASSIGNMENT 46: PERSISTENT SETTINGS PANEL
// ==========================================

const SETTINGS_STORAGE_KEY = "assignment8-settings";

const defaultSettings = {
    name: "",
    theme: "light",
    fontSize: "medium",
    notifications: false
};

function loadSettings() {
    try {
        const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);

        if (!saved) {
            return { ...defaultSettings };
        }

        const parsed = JSON.parse(saved);

        if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
            return { ...defaultSettings };
        }

        return {
            name: typeof parsed.name === "string" ? parsed.name : "",
            theme: ["light", "dark"].includes(parsed.theme) ? parsed.theme : "light",
            fontSize: ["small", "medium", "large"].includes(parsed.fontSize)
                ? parsed.fontSize
                : "medium",
            notifications: typeof parsed.notifications === "boolean"
                ? parsed.notifications
                : false
        };
    } catch (error) {
        console.warn("Could not load settings:", error);
        return { ...defaultSettings };
    }
}

function applySettings(settings) {
    document.body.classList.toggle("dark-theme", settings.theme === "dark");

    document.body.classList.remove(
        "font-small",
        "font-medium",
        "font-large"
    );

    document.body.classList.add(`font-${settings.fontSize}`);

    const displayName = settings.name.trim() || "Student Profile";
    document.getElementById("profile-display-name").textContent = displayName;
}

function readSettingsForm() {
    return {
        name: document.getElementById("settings-name").value.trim(),
        theme: document.getElementById("settings-theme").value,
        fontSize: document.getElementById("settings-font-size").value,
        notifications: document.getElementById("settings-notifications").checked
    };
}

function fillSettingsForm(settings) {
    document.getElementById("settings-name").value = settings.name;
    document.getElementById("settings-theme").value = settings.theme;
    document.getElementById("settings-font-size").value = settings.fontSize;
    document.getElementById("settings-notifications").checked = settings.notifications;
}

function saveSettings(settings) {
    try {
        localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
        return true;
    } catch (error) {
        console.error("Could not save settings:", error);
        return false;
    }
}

let settings = loadSettings();

fillSettingsForm(settings);
applySettings(settings);

document.getElementById("settings-form").addEventListener("submit", event => {
    event.preventDefault();

    settings = readSettingsForm();

    if (saveSettings(settings)) {
        applySettings(settings);

        document.getElementById("settings-status").textContent =
            "Settings saved successfully!";
    } else {
        document.getElementById("settings-status").textContent =
            "Settings could not be saved. Check browser storage permissions.";
    }
});

document.getElementById("reset-settings-btn").addEventListener("click", () => {
    settings = { ...defaultSettings };

    fillSettingsForm(settings);
    applySettings(settings);

    try {
        localStorage.removeItem(SETTINGS_STORAGE_KEY);

        document.getElementById("settings-status").textContent =
            "Settings reset to defaults.";
    } catch (error) {
        document.getElementById("settings-status").textContent =
            "Settings reset on this page, but browser storage could not be cleared.";
    }
});

console.log("Assignments 38–46 JavaScript loaded successfully.");