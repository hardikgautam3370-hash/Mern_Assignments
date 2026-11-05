// ==========================================
// ASSIGNMENTS 55–62
// JavaScript Functionality
// ==========================================


// ------------------------------------------
// COMMON STORAGE HELPER
// ------------------------------------------

const StorageHelper = {
    save(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error("Storage save error:", error);
            return false;
        }
    },

    load(key, defaultValue = null) {
        try {
            const data = localStorage.getItem(key);
            return data === null ? defaultValue : JSON.parse(data);
        } catch (error) {
            console.error("Storage load error:", error);
            return defaultValue;
        }
    }
};


// ------------------------------------------
// ASSIGNMENT 55
// FEATURE-COMPLETE RELEASE CANDIDATE
// ------------------------------------------

const releaseStatus = document.getElementById("releaseStatus");
const releaseCheckBtn = document.getElementById("releaseCheckBtn");

releaseCheckBtn.addEventListener("click", () => {
    const requiredElements = [
        "testMatrixBody",
        "bugLogBody",
        "revisionForm",
        "dryRunBtn",
        "statisticsBtn"
    ];

    const missingElements = requiredElements.filter(
        id => !document.getElementById(id)
    );

    if (missingElements.length === 0) {
        releaseStatus.textContent =
            "Release Candidate: Ready for review. All required sections are available.";

        releaseStatus.style.color = "green";
    } else {
        releaseStatus.textContent =
            "Release Candidate: Missing elements - " +
            missingElements.join(", ");

        releaseStatus.style.color = "red";
    }
});


// ------------------------------------------
// ASSIGNMENT 56
// TEST MATRIX
// ------------------------------------------

const runTestsBtn = document.getElementById("runTestsBtn");
const testMatrixBody = document.getElementById("testMatrixBody");
const testSummary = document.getElementById("testSummary");

function reverseString(text) {
    return text.split("").reverse().join("");
}

function countCompletedTasks(tasks) {
    return tasks.filter(task => task.completed).length;
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function runTest(description, testFunction) {
    try {
        const passed = testFunction();

        return {
            description,
            status: passed ? "Passed" : "Failed"
        };
    } catch (error) {
        return {
            description,
            status: "Failed"
        };
    }
}

runTestsBtn.addEventListener("click", () => {

    const tests = [
        runTest("String reversal", () => {
            return reverseString("hello") === "olleh";
        }),

        runTest("Email validation", () => {
            return validateEmail("student@example.com");
        }),

        runTest("Invalid email rejection", () => {
            return !validateEmail("invalid-email");
        }),

        runTest("Completed task counter", () => {
            const tasks = [
                { completed: true },
                { completed: false },
                { completed: true }
            ];

            return countCompletedTasks(tasks) === 2;
        }),

        runTest("Storage helper save and load", () => {
            const saved = StorageHelper.save(
                "assignmentTest",
                "Working"
            );

            const loaded = StorageHelper.load(
                "assignmentTest"
            );

            localStorage.removeItem("assignmentTest");

            return saved && loaded === "Working";
        }),

        runTest("Empty string reversal", () => {
            return reverseString("") === "";
        })
    ];

    testMatrixBody.innerHTML = "";

    let passedCount = 0;

    tests.forEach((test, index) => {
        if (test.status === "Passed") {
            passedCount++;
        }

        const row = document.createElement("tr");

        const idCell = document.createElement("td");
        idCell.textContent = `TC0${index + 1}`;

        const descriptionCell = document.createElement("td");
        descriptionCell.textContent = test.description;

        const statusCell = document.createElement("td");
        statusCell.textContent = test.status;
        statusCell.style.color =
            test.status === "Passed" ? "green" : "red";

        row.append(idCell, descriptionCell, statusCell);
        testMatrixBody.appendChild(row);
    });

    testSummary.textContent =
        `Tests Completed: ${tests.length} | Passed: ${passedCount} | Failed: ${tests.length - passedCount}`;
});


// ------------------------------------------
// ASSIGNMENT 57
// BUG LOG
// ------------------------------------------

const bugIssue = document.getElementById("bugIssue");
const bugCause = document.getElementById("bugCause");
const bugFix = document.getElementById("bugFix");
const addBugBtn = document.getElementById("addBugBtn");
const bugLogBody = document.getElementById("bugLogBody");
const bugOutput = document.getElementById("bugOutput");

addBugBtn.addEventListener("click", () => {

    const issue = bugIssue.value.trim();
    const cause = bugCause.value.trim();
    const fix = bugFix.value.trim();

    if (!issue || !cause || !fix) {
        bugOutput.textContent =
            "Please fill in all bug log fields.";

        return;
    }

    const row = document.createElement("tr");

    [issue, cause, fix, "Pending Verification"].forEach(value => {
        const cell = document.createElement("td");
        cell.textContent = value;
        row.appendChild(cell);
    });

    bugLogBody.appendChild(row);

    bugOutput.textContent = "Bug entry added successfully.";

    bugIssue.value = "";
    bugCause.value = "";
    bugFix.value = "";
});


// ------------------------------------------
// ASSIGNMENT 58
// HTML/CSS REVISION CHALLENGE
// ------------------------------------------

const revisionForm = document.getElementById("revisionForm");
const revisionOutput = document.getElementById("revisionOutput");

revisionForm.addEventListener("submit", event => {
    event.preventDefault();

    const name = document.getElementById("studentName").value.trim();
    const email = document.getElementById("studentEmail").value.trim();

    if (!name || !email) {
        revisionOutput.textContent =
            "Please complete all fields.";

        return;
    }

    if (!validateEmail(email)) {
        revisionOutput.textContent =
            "Please enter a valid email address.";

        return;
    }

    revisionOutput.textContent =
        `Revision form completed successfully. Name: ${name} | Email: ${email}`;

    StorageHelper.save("revisionDetails", {
        name,
        email
    });
});


// ------------------------------------------
// ASSIGNMENT 59
// SOLUTIONS AND DRY RUNS
// ------------------------------------------

const dryRunBtn = document.getElementById("dryRunBtn");
const dryRunOutput = document.getElementById("dryRunOutput");

dryRunBtn.addEventListener("click", () => {

    const sampleTasks = [
        { title: "HTML Practice", completed: true },
        { title: "CSS Practice", completed: false },
        { title: "JavaScript Practice", completed: true }
    ];

    const total = sampleTasks.length;
    const completed = countCompletedTasks(sampleTasks);
    const active = total - completed;

    dryRunOutput.textContent =
        `Dry Run Results:
Total Tasks = ${total}
Completed Tasks = ${completed}
Active Tasks = ${active}

Step 1: Read the sample task array.
Step 2: Count completed tasks.
Step 3: Subtract completed tasks from total tasks.
Step 4: Display the final result.`;
});


// Reverse String Challenge

const reverseInput = document.getElementById("reverseInput");
const reverseBtn = document.getElementById("reverseBtn");
const reverseOutput = document.getElementById("reverseOutput");

reverseBtn.addEventListener("click", () => {

    const input = reverseInput.value;

    if (!input.trim()) {
        reverseOutput.textContent =
            "Please enter some text.";

        return;
    }

    reverseOutput.textContent =
        "Reversed Text: " + reverseString(input);
});


// ------------------------------------------
// ASSIGNMENT 60
// WORKING CHALLENGE AND ARCHITECTURE
// ------------------------------------------

const statisticsBtn = document.getElementById("statisticsBtn");
const statisticsOutput = document.getElementById("statisticsOutput");

statisticsBtn.addEventListener("click", () => {

    const sampleTasks = [
        { title: "Learn HTML", completed: true },
        { title: "Practice CSS", completed: true },
        { title: "Learn JavaScript", completed: false },
        { title: "Build a Project", completed: false },
        { title: "Test the Project", completed: true }
    ];

    const total = sampleTasks.length;
    const completed = countCompletedTasks(sampleTasks);
    const active = total - completed;

    const completionRate = total === 0
        ? 0
        : Math.round((completed / total) * 100);

    statisticsOutput.textContent =
        `Project Statistics (Sample Data)

Total Tasks: ${total}
Completed Tasks: ${completed}
Active Tasks: ${active}
Completion Rate: ${completionRate}%

Architecture:
1. Data Layer: Stores task information.
2. Logic Layer: Calculates task statistics.
3. UI Layer: Displays the results.`;
});


// ------------------------------------------
// ASSIGNMENT 61
// ASSESSMENT REPOSITORY SUBMISSION
// ------------------------------------------

const repositoryLink = document.getElementById("repositoryLink");
const repositoryBtn = document.getElementById("repositoryBtn");
const repositoryOutput = document.getElementById("repositoryOutput");

repositoryBtn.addEventListener("click", () => {

    const link = repositoryLink.value.trim();

    try {
        const url = new URL(link);

        if (url.protocol !== "https:" && url.protocol !== "http:") {
            throw new Error("Invalid protocol");
        }

        StorageHelper.save("repositoryLink", link);

        repositoryOutput.textContent =
            "Valid repository URL saved locally: " + link +
            "\nNote: This does not upload your project.";

    } catch (error) {
        repositoryOutput.textContent =
            "Please enter a valid HTTP or HTTPS repository URL.";
    }
});


// ------------------------------------------
// ASSIGNMENT 62
// REFLECTION, FEEDBACK AND PORTFOLIO
// ------------------------------------------

const feedbackInput = document.getElementById("feedbackInput");
const portfolioLink = document.getElementById("portfolioLink");
const portfolioBtn = document.getElementById("portfolioBtn");
const reflectionOutput = document.getElementById("reflectionOutput");

portfolioBtn.addEventListener("click", () => {

    const feedback = feedbackInput.value.trim();
    const portfolio = portfolioLink.value.trim();

    if (!feedback) {
        reflectionOutput.textContent =
            "Please write your reflection before saving.";

        return;
    }

    if (portfolio) {
        try {
            const url = new URL(portfolio);

            if (url.protocol !== "https:" && url.protocol !== "http:") {
                throw new Error("Invalid protocol");
            }

        } catch (error) {
            reflectionOutput.textContent =
                "Please enter a valid portfolio URL.";

            return;
        }
    }

    const reflectionData = {
        feedback,
        portfolio,
        savedAt: new Date().toLocaleString()
    };

    const saved = StorageHelper.save(
        "assignmentReflection",
        reflectionData
    );

    if (saved) {
        reflectionOutput.textContent =
            "Reflection saved locally!\n" +
            "Saved At: " + reflectionData.savedAt +
            (portfolio
                ? "\nPortfolio URL: " + portfolio
                : "\nNo portfolio URL provided.") +
            "\nYour portfolio has not been published automatically.";
    } else {
        reflectionOutput.textContent =
            "Unable to save reflection. Please check browser storage.";
    }
});


// ------------------------------------------
// PAGE INITIALIZATION
// ------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
    console.log("Assignment 10 JavaScript loaded successfully.");
});