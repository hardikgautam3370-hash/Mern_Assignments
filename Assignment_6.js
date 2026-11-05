"use strict";

// ======================================
// Assignment 26: Filter and Summarize Products
// ======================================

const products = [
    { name: "Keyboard", category: "Electronics", price: 800 },
    { name: "Mouse", category: "Electronics", price: 500 },
    { name: "Notebook", category: "Stationery", price: 100 },
    { name: "Pen Set", category: "Stationery", price: 150 },
    { name: "Backpack", category: "Accessories", price: 900 },
    { name: "Headphones", category: "Electronics", price: 1200 }
];

document.getElementById("filter-products-btn").addEventListener("click", function () {
    const category = document.getElementById("category-filter").value;
    const minPrice = Number(document.getElementById("min-price").value);

    const productResults = document.getElementById("product-results");
    const summary = document.getElementById("product-summary");

    if (!Number.isFinite(minPrice) || minPrice < 0) {
        productResults.textContent = "Enter a valid minimum price.";
        summary.textContent = "";
        return;
    }

    const filtered = products.filter(function (product) {
        const categoryMatches =
            category === "All" || product.category === category;

        return categoryMatches && product.price >= minPrice;
    });

    if (filtered.length === 0) {
        productResults.textContent = "No products match your filters.";
        summary.textContent = "Number of products: 0";
        return;
    }

    productResults.textContent = filtered.map(function (product) {
        return `${product.name} — ${product.category} — ₹${product.price}`;
    }).join("\n");

    const total = filtered.reduce(function (sum, product) {
        return sum + product.price;
    }, 0);

    const average = total / filtered.length;

    summary.textContent =
        `Products: ${filtered.length} | Total price: ₹${total} | Average price: ₹${average.toFixed(2)}`;
});


// ======================================
// Assignment 27: Text-Cleaning Utility
// ======================================

function cleanText(text) {
    if (typeof text !== "string") {
        return "";
    }

    return text
        .normalize("NFC")
        .trim()
        .replace(/\s+/g, " ");
}

document.getElementById("clean-text-btn").addEventListener("click", function () {
    const rawText = document.getElementById("raw-text").value;
    const cleaned = cleanText(rawText);

    document.getElementById("cleaned-output").textContent =
        cleaned || "Please enter some text.";
});


// ======================================
// Assignment 28: Array Problems
// ======================================

document.getElementById("array-problems-btn").addEventListener("click", function () {
    const input = document.getElementById("array-input").value.trim();
    const output = document.getElementById("array-results");

    if (!input) {
        output.textContent = "Please enter at least one number.";
        return;
    }

    const parts = input.split(",").map(value => value.trim());

    if (parts.some(value => value === "")) {
        output.textContent = "Please separate numbers using commas correctly.";
        return;
    }

    const numbers = parts.map(Number);

    if (numbers.some(number => !Number.isFinite(number))) {
        output.textContent = "Please enter only valid numbers separated by commas.";
        return;
    }

    const sum = numbers.reduce((total, number) => total + number, 0);
    const largest = Math.max(...numbers);
    const smallest = Math.min(...numbers);

    output.textContent =
        `Original array: ${numbers.join(", ")}\n` +
        `Sum: ${sum}\n` +
        `Largest number: ${largest}\n` +
        `Smallest number: ${smallest}\n` +
        `Sorted array: ${[...numbers].sort((a, b) => a - b).join(", ")}`;
});


// Assignment 28: String Problems

document.getElementById("string-problems-btn").addEventListener("click", function () {
    const text = document.getElementById("string-input").value;
    const output = document.getElementById("string-results");
    const reversed = Array.from(text).reverse().join("");

    output.textContent =
        `Original: ${text}\n` +
        `Length: ${Array.from(text).length}\n` +
        `Uppercase: ${text.toUpperCase()}\n` +
        `Lowercase: ${text.toLowerCase()}\n` +
        `Reversed: ${reversed}`;
});


// ======================================
// Assignment 29: Test Cases
// ======================================

document.getElementById("run-tests-btn").addEventListener("click", function () {
    const tests = [
        {
            name: "Remove leading and trailing spaces",
            input: "  Hello World  ",
            expected: "Hello World"
        },
        {
            name: "Replace repeated spaces",
            input: "Hello     World",
            expected: "Hello World"
        },
        {
            name: "Clean tabs and newlines",
            input: "Hello\t\nWorld",
            expected: "Hello World"
        },
        {
            name: "Empty string stays empty",
            input: "",
            expected: ""
        }
    ];

    const lines = tests.map(function (test) {
        const actual = cleanText(test.input);
        const passed = actual === test.expected;

        return `${passed ? "PASS" : "FAIL"} — ${test.name}`;
    });

    const passedCount = tests.filter(function (test) {
        return cleanText(test.input) === test.expected;
    }).length;

    document.getElementById("test-results").textContent =
        `${passedCount}/${tests.length} tests passed.\n` + lines.join("\n");
});


// ======================================
// Assignment 30: Nested Product Object
// ======================================

const product = {
    id: 101,
    name: "Laptop",
    brand: "ExampleTech",
    price: 55000,
    inStock: true,
    specifications: {
        processor: {
            brand: "ExampleChip",
            model: "i5"
        },
        memory: {
            ram: "16 GB",
            storage: "512 GB SSD"
        },
        display: {
            sizeInches: 15.6,
            resolution: "1920 x 1080"
        }
    }
};

document.getElementById("show-product-btn").addEventListener("click", function () {
    document.getElementById("product-object-output").textContent =
        JSON.stringify(product, null, 2);
});


// Show initial product examples when the page loads.
document.getElementById("filter-products-btn").click();
document.getElementById("show-product-btn").click();