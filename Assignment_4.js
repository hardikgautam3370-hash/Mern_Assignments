"use strict";

// Assignment 16: Grade Calculator

document.getElementById("grade-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const inputs = document.querySelectorAll(".marks");
    const marks = Array.from(inputs).map(input => Number(input.value));
    const result = document.getElementById("grade-result");

    if (marks.some(mark => !Number.isFinite(mark) || mark < 0 || mark > 100)) {
        result.textContent = "Enter marks between 0 and 100.";
        return;
    }

    const total = marks.reduce((sum, mark) => sum + mark, 0);
    const average = total / marks.length;

    let grade;

    if (average >= 90) {
        grade = "A+";
    } else if (average >= 80) {
        grade = "A";
    } else if (average >= 70) {
        grade = "B";
    } else if (average >= 60) {
        grade = "C";
    } else if (average >= 40) {
        grade = "D";
    } else {
        grade = "F";
    }

    result.textContent =
        `Total: ${total}/500 | Average: ${average.toFixed(2)}% | Grade: ${grade}`;
});


// Assignment 17: Loop Problems

document.getElementById("run-loops").addEventListener("click", function () {
    const n = Number(document.getElementById("loop-number").value);

    const sequence = document.getElementById("sequence-output");
    const sumOutput = document.getElementById("sum-output");
    const tableOutput = document.getElementById("table-output");

    if (!Number.isInteger(n) || n < 1 || n > 30) {
        sequence.textContent = "Enter a whole number from 1 to 30.";
        sumOutput.textContent = "";
        tableOutput.textContent = "";
        return;
    }

    const numbers = [];
    let sum = 0;

    for (let i = 1; i <= n; i++) {
        numbers.push(i);
        sum += i;
    }

    sequence.textContent = numbers.join(", ");
    sumOutput.textContent = `Sum = ${sum}`;

    const table = [];

    for (let i = 1; i <= 10; i++) {
        table.push(`${n} x ${i} = ${n * i}`);
    }

    tableOutput.textContent = table.join("\n");
});


// Assignment 18: Debugging

// Wrong: if (score = 50)
// Correct: if (score === 50)

document.getElementById("test-debug").addEventListener("click", function () {
    const score = Number(document.getElementById("debug-score").value);
    const result = document.getElementById("debug-result");

    if (!Number.isFinite(score) || score < 0 || score > 100) {
        result.textContent = "Enter a score between 0 and 100.";
    } else if (score === 50) {
        result.textContent = "The score is exactly 50.";
    } else {
        result.textContent = `The score is ${score}, not 50.`;
    }
});


// Assignment 19: Mini Project 1 — Student Result

document.getElementById("student-summary-btn").addEventListener("click", function () {
    const name = document.getElementById("student-name").value.trim();
    const marks = Number(document.getElementById("student-marks").value);
    const result = document.getElementById("student-summary");

    if (name === "") {
        result.textContent = "Please enter the student's name.";
        return;
    }

    if (!Number.isFinite(marks) || marks < 0 || marks > 100) {
        result.textContent = "Enter marks between 0 and 100.";
        return;
    }

    const status = marks >= 40 ? "Pass" : "Fail";
    result.textContent = `${name} scored ${marks}/100. Result: ${status}.`;
});


// Assignment 19: Mini Project 2 — Number Analyzer

document.getElementById("analyze-number-btn").addEventListener("click", function () {
    const number = Number(document.getElementById("analyzer-number").value);
    const result = document.getElementById("analyzer-result");

    if (!Number.isInteger(number) || number < 0 || number > 12) {
        result.textContent = "Enter a whole number from 0 to 12.";
        return;
    }

    const type = number % 2 === 0 ? "Even" : "Odd";

    let factorial = 1;

    for (let i = 1; i <= number; i++) {
        factorial *= i;
    }

    result.textContent =
        `${number} is ${type}. Factorial of ${number} is ${factorial}.`;
});


// Assignment 20: Five Reusable Mathematical Functions

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "Cannot divide by zero";
    }

    return a / b;
}

function percentage(value, total) {
    if (total === 0) {
        return "Cannot calculate percentage when total is zero";
    }

    return (value / total) * 100;
}


// Display all five function results

document.getElementById("run-math").addEventListener("click", function () {
    const a = Number(document.getElementById("math-a").value);
    const b = Number(document.getElementById("math-b").value);
    const results = document.getElementById("math-results");

    if (!Number.isFinite(a) || !Number.isFinite(b)) {
        results.textContent = "Please enter valid numbers.";
        return;
    }

    const percent = percentage(a, b);

    results.textContent =
        `Addition: ${add(a, b)} | ` +
        `Subtraction: ${subtract(a, b)} | ` +
        `Multiplication: ${multiply(a, b)} | ` +
        `Division: ${divide(a, b)} | ` +
        `Percentage: ${
            typeof percent === "number"
                ? percent.toFixed(2) + "%"
                : percent
        }`;
});


// Display initial examples when the page loads

document.getElementById("run-loops").click();
document.getElementById("run-math").click();