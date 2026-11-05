"use strict";

// ==========================================
// ASSIGNMENT 31: SHOPPING CART
// ==========================================

const cartProducts = {
    Laptop: 55000,
    Mouse: 500,
    Keyboard: 800,
    Headphones: 1200
};

const cart = {
    items: [],

    addProduct(name, quantity) {
        if (!Object.prototype.hasOwnProperty.call(cartProducts, name)) {
            return "Invalid product selected.";
        }

        if (!Number.isInteger(quantity) || quantity < 1) {
            return "Quantity must be a positive whole number.";
        }

        const existingItem = this.items.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                name: name,
                price: cartProducts[name],
                quantity: quantity
            });
        }

        return `${name} added to cart successfully!`;
    },

    calculateTotal() {
        return this.items.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0);
    }
};

function renderCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    if (cart.items.length === 0) {
        cartItems.textContent = "Your cart is empty.";
    } else {
        cartItems.textContent = cart.items.map(item => {
            return `${item.name} | ₹${item.price} × ${item.quantity} = ₹${item.price * item.quantity}`;
        }).join("\n");
    }

    cartTotal.textContent = `Total: ₹${cart.calculateTotal()}`;
}

document.getElementById("add-to-cart-btn").addEventListener("click", function () {
    const name = document.getElementById("cart-product").value;
    const quantity = Number(document.getElementById("cart-quantity").value);

    const message = cart.addProduct(name, quantity);

    document.getElementById("cart-message").textContent = message;

    renderCart();
});


// ==========================================
// ASSIGNMENT 32: PROFILE SUMMARY GENERATOR
// ==========================================

function createProfileSummary(profile) {
    const summary = {
        name: profile.name.trim(),
        age: profile.age,
        course: profile.course.trim(),
        skills: profile.skills
            .map(skill => skill.trim())
            .filter(skill => skill.length > 0)
    };

    return summary;
}

document.getElementById("generate-profile-btn").addEventListener("click", function () {
    const name = document.getElementById("profile-name").value;
    const ageText = document.getElementById("profile-age").value;
    const course = document.getElementById("profile-course").value;
    const skillsText = document.getElementById("profile-skills").value;

    const output = document.getElementById("profile-summary");
    const age = Number(ageText);

    if (
        !name.trim() ||
        !ageText ||
        !Number.isInteger(age) ||
        age < 1 ||
        !course.trim()
    ) {
        output.textContent = "Please enter a valid name, age and course.";
        return;
    }

    const profile = createProfileSummary({
        name: name,
        age: age,
        course: course,
        skills: skillsText.split(",")
    });

    output.textContent =
        `Name: ${profile.name}\n` +
        `Age: ${profile.age}\n` +
        `Course: ${profile.course}\n` +
        `Skills: ${profile.skills.length ? profile.skills.join(", ") : "Not specified"}\n` +
        `Number of skills: ${profile.skills.length}`;
});


// ==========================================
// ASSIGNMENT 33: LOAD AND VALIDATE JSON
// ==========================================

function validateCatalogue(data) {
    if (!Array.isArray(data)) {
        return {
            valid: false,
            message: "Catalogue must be an array."
        };
    }

    const ids = new Set();

    for (const item of data) {
        if (
            item === null ||
            typeof item !== "object" ||
            Array.isArray(item)
        ) {
            return {
                valid: false,
                message: "Each catalogue item must be an object."
            };
        }

        if (
            !Number.isInteger(item.id) ||
            typeof item.name !== "string" ||
            !item.name.trim() ||
            typeof item.category !== "string" ||
            !item.category.trim() ||
            typeof item.price !== "number" ||
            !Number.isFinite(item.price) ||
            item.price < 0
        ) {
            return {
                valid: false,
                message: "Each item needs a valid id, name, category and price."
            };
        }

        if (ids.has(item.id)) {
            return {
                valid: false,
                message: `Duplicate product ID: ${item.id}`
            };
        }

        ids.add(item.id);
    }

    return {
        valid: true,
        message: `Catalogue is valid. ${data.length} product(s) found.`
    };
}

let catalogueData = null;

document.getElementById("load-catalogue-btn").addEventListener("click", async function () {
    const status = document.getElementById("catalogue-status");
    const results = document.getElementById("catalogue-results");

    status.textContent = "Loading catalogue...";
    results.textContent = "";

    try {
        const response = await fetch("./Assignment_7.json");

        if (!response.ok) {
            throw new Error("Could not load Assignment_7.json.");
        }

        const data = await response.json();
        const validation = validateCatalogue(data);

        if (!validation.valid) {
            catalogueData = null;
            status.textContent = validation.message;
            return;
        }

        catalogueData = data;
        status.textContent = validation.message;

        results.textContent = data.length
            ? data.map(item =>
                `${item.name} | ${item.category} | ₹${item.price}`
            ).join("\n")
            : "The catalogue is empty.";

    } catch (error) {
        catalogueData = null;
        status.textContent =
            `${error.message} Check the JSON filename and run the page using Live Server.`;
    }
});


// ==========================================
// ASSIGNMENT 34: CATALOGUE TEST SCENARIOS
// ==========================================

document.getElementById("run-catalogue-tests-btn").addEventListener("click", function () {
    const validCatalogue = [
        { id: 1, name: "Mouse", category: "Electronics", price: 500 },
        { id: 2, name: "Notebook", category: "Stationery", price: 100 }
    ];

    const tests = [
        {
            name: "Valid catalogue is accepted",
            input: validCatalogue,
            expected: true
        },
        {
            name: "Non-array data is rejected",
            input: {},
            expected: false
        },
        {
            name: "Missing product name is rejected",
            input: [{ id: 1, name: "", category: "Stationery", price: 100 }],
            expected: false
        },
        {
            name: "Negative price is rejected",
            input: [{ id: 1, name: "Pen", category: "Stationery", price: -5 }],
            expected: false
        },
        {
            name: "Duplicate IDs are rejected",
            input: [
                { id: 1, name: "Pen", category: "Stationery", price: 10 },
                { id: 1, name: "Book", category: "Stationery", price: 50 }
            ],
            expected: false
        },
        {
            name: "Empty catalogue is accepted",
            input: [],
            expected: true
        }
    ];

    const results = tests.map(test => {
        const actual = validateCatalogue(test.input).valid;
        const passed = actual === test.expected;

        return `${passed ? "PASS" : "FAIL"} — ${test.name}`;
    });

    const passedCount = tests.filter(test => {
        return validateCatalogue(test.input).valid === test.expected;
    }).length;

    document.getElementById("catalogue-test-results").textContent =
        `${passedCount}/${tests.length} tests passed.\n\n` +
        results.join("\n");
});


// ==========================================
// ASSIGNMENT 35: DOM NODE RELATIONSHIPS
// ==========================================

document.getElementById("inspect-dom-btn").addEventListener("click", function () {
    const heading = document.getElementById("dom-heading");
    const name = document.getElementById("dom-student-name");
    const course = document.getElementById("dom-student-course");

    const output = document.getElementById("dom-results");

    output.textContent =
        `Heading parent: ${heading.parentElement.id}\n` +
        `Parent's child elements: ${heading.parentElement.children.length}\n` +
        `Heading next element sibling: ${heading.nextElementSibling.id}\n` +
        `Name previous element sibling: ${name.previousElementSibling.id}\n` +
        `Name next element sibling: ${name.nextElementSibling.id}\n` +
        `Course parent: ${course.parentElement.id}`;
});


// ==========================================
// ASSIGNMENT 36: ELEMENT SELECTION
// ==========================================

document.getElementById("change-text-btn").addEventListener("click", function () {
    const text = document.getElementById("challenge-text");

    text.textContent = "The text has been updated using JavaScript!";
});

document.getElementById("highlight-items-btn").addEventListener("click", function () {
    const items = document.querySelectorAll(".challenge-item");

    items.forEach(function (item) {
        item.classList.toggle("highlight");
    });

    document.getElementById("selection-results").textContent =
        `Highlight toggled for ${items.length} list items.`;
});

document.getElementById("count-items-btn").addEventListener("click", function () {
    const count = document.querySelectorAll("#challenge-list li").length;

    document.getElementById("selection-results").textContent =
        `Total list items: ${count}`;
});


// ==========================================
// ASSIGNMENT 37: SAFE PROFILE CONTENT UPDATER
// ==========================================

document.getElementById("update-profile-btn").addEventListener("click", function () {
    const name = document.getElementById("update-name").value.trim();
    const bio = document.getElementById("update-bio").value.trim();

    const message = document.getElementById("update-message");

    if (!name || !bio) {
        message.textContent = "Please enter both a display name and a bio.";
        return;
    }

    // textContent displays input as text, not executable HTML.
    document.getElementById("preview-name").textContent = name;
    document.getElementById("preview-bio").textContent = bio;

    message.textContent = "Profile updated successfully!";
});


// ==========================================
// INITIAL SETUP
// ==========================================

renderCart();

console.log("Assignments 31–37 JavaScript loaded successfully.");