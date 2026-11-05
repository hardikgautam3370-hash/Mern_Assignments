"use strict";

// ========================================
// Assignment 21: Scope and Hoisting
// ========================================

document.getElementById("scope-answer-1").addEventListener("click", function () {
    const result = document.getElementById("scope-result-1");
    result.hidden = false;
    result.textContent =
        'Output: undefined. The declaration "var value" is hoisted, but its assignment happens later.';
});

document.getElementById("scope-answer-2").addEventListener("click", function () {
    const result = document.getElementById("scope-result-2");
    result.hidden = false;
    result.textContent =
        'Output: "Hello". The let variable inside the block has its own block scope.';
});

document.getElementById("scope-answer-3").addEventListener("click", function () {
    const result = document.getElementById("scope-result-3");
    result.hidden = false;
    result.textContent =
        'Output: "undefined". The variable score is local to test(), so it is not available outside the function. typeof does not throw an error for an undeclared identifier.';
});


// ========================================
// Assignment 22: Validation Utilities
// ========================================

function isNonEmptyString(value) {
    return typeof value === "string" && value.trim().length > 0;
}

function isValidEmail(email) {
    if (!isNonEmptyString(email)) {
        return false;
    }

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function isValidAge(age) {
    return Number.isInteger(age) && age >= 18 && age <= 120;
}

function validateUser(user) {
    const errors = [];

    // Guard clauses: check one condition at a time.
    if (!isNonEmptyString(user.username)) {
        errors.push("Username is required.");
    }

    if (!isValidEmail(user.email)) {
        errors.push("Please enter a valid email address.");
    }

    if (!isValidAge(user.age)) {
        errors.push("Age must be a whole number from 18 to 120.");
    }

    return {
        valid: errors.length === 0,
        errors: errors
    };
}

document.getElementById("validate-btn").addEventListener("click", function () {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const ageInput = document.getElementById("age").value;
    const result = document.getElementById("validation-result");

    if (ageInput.trim() === "") {
        result.textContent = "Please enter an age.";
        return;
    }

    const user = {
        username: username,
        email: email,
        age: Number(ageInput)
    };

    const validation = validateUser(user);

    if (validation.valid) {
        result.textContent = "All details are valid!";
    } else {
        result.textContent = validation.errors.join(" ");
    }
});


// ========================================
// Assignment 23: Merge Settings
// ========================================

const defaultSettings = {
    theme: "light",
    notifications: true,
    language: "English"
};

function mergeSettings(defaults, userSettings) {
    return { ...defaults, ...userSettings };
}

document.getElementById("merge-settings-btn").addEventListener("click", function () {
    const userSettings = {
        theme: document.getElementById("theme").value,
        notifications: document.getElementById("notifications").checked,
        language: document.getElementById("language").value.trim() || "English"
    };

    const merged = mergeSettings(defaultSettings, userSettings);

    document.getElementById("settings-result").textContent =
        JSON.stringify(merged, null, 2);
});


// Assignment 23: Calculate totals

function calculateTotal(prices) {
    if (!Array.isArray(prices)) {
        return null;
    }

    if (prices.some(price => !Number.isFinite(price) || price < 0)) {
        return null;
    }

    return prices.reduce((total, price) => total + price, 0);
}

document.getElementById("calculate-total-btn").addEventListener("click", function () {
    const prices = [
        Number(document.getElementById("price-1").value),
        Number(document.getElementById("price-2").value),
        Number(document.getElementById("price-3").value)
    ];

    const result = document.getElementById("total-result");

    if (prices.some(price => !Number.isFinite(price) || price < 0)) {
        result.textContent = "Please enter valid, non-negative prices.";
        return;
    }

    result.textContent = `Total: ₹${calculateTotal(prices).toFixed(2)}`;
});


// ========================================
// Assignment 24: Test Cases
// ========================================

document.getElementById("run-tests-btn").addEventListener("click", function () {
    const tests = [
        {
            name: "Valid details",
            user: { username: "Aman", email: "aman@example.com", age: 20 },
            expected: true
        },
        {
            name: "Empty username",
            user: { username: " ", email: "aman@example.com", age: 20 },
            expected: false
        },
        {
            name: "Invalid email",
            user: { username: "Aman", email: "not-an-email", age: 20 },
            expected: false
        },
        {
            name: "Age below 18",
            user: { username: "Aman", email: "aman@example.com", age: 16 },
            expected: false
        }
    ];

    const output = document.getElementById("test-results");
    const lines = [];

    tests.forEach(function (test) {
        const actual = validateUser(test.user).valid;
        const passed = actual === test.expected;

        lines.push(
            `${passed ? "PASS" : "FAIL"} — ${test.name} (expected ${test.expected}, received ${actual})`
        );
    });

    const passedCount = tests.filter(function (test) {
        return validateUser(test.user).valid === test.expected;
    }).length;

    output.textContent =
        `${passedCount}/${tests.length} tests passed.\n` + lines.join("\n");
});


// ========================================
// Assignment 25: Shopping-List Manager
// ========================================

const shoppingList = [];

function addShoppingItem(item) {
    if (typeof item !== "string" || item.trim() === "") {
        return false;
    }

    shoppingList.push(item.trim());
    return true;
}

function showShoppingList() {
    return [...shoppingList];
}

function clearShoppingList() {
    shoppingList.length = 0;
}

function renderShoppingList() {
    const listElement = document.getElementById("shopping-list");
    listElement.replaceChildren();

    showShoppingList().forEach(function (item) {
        const li = document.createElement("li");
        li.textContent = item;
        listElement.appendChild(li);
    });
}

document.getElementById("add-item-btn").addEventListener("click", function () {
    const input = document.getElementById("shopping-item");
    const message = document.getElementById("shopping-message");

    if (!addShoppingItem(input.value)) {
        message.textContent = "Please enter an item before adding.";
        return;
    }

    input.value = "";
    renderShoppingList();
    message.textContent = "Item added successfully.";
});

document.getElementById("show-items-btn").addEventListener("click", function () {
    const items = showShoppingList();
    document.getElementById("shopping-message").textContent =
        items.length ? `Shopping list: ${items.join(", ")}` : "Your shopping list is empty.";

    renderShoppingList();
});

document.getElementById("clear-items-btn").addEventListener("click", function () {
    clearShoppingList();
    renderShoppingList();
    document.getElementById("shopping-message").textContent = "Shopping list cleared.";
});

// Console-based demonstration for Assignment 25.
console.log("Assignment 25: Shopping-List Manager");
console.log("Add item:", addShoppingItem("Notebook"));
console.log("Add item:", addShoppingItem("Pen"));
console.log("Current list:", showShoppingList());