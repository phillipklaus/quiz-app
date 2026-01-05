
// Each object represents ONE question
// - question: the question text
// - answers: array of possible answers
// - correct: index of the correct answer (starts at 0)

const questions = [
    {
        question: "What does HTML stand for?",
        answers: ["Hyper Text Markup Language", "High Text Machine Language", "Home Tool Markup Language", "Hyperlinks Text Machine Language"],
        correct: 0
    },
    {
        question: "Which language is used for styling web pages?",
        answers: ["HTML", "Python", "CSS", "C"],
        correct: 2
    },
    {
        question: "Which is NOT a programming language?",
        answers: ["JavaScript", "Python", "HTTP", "C"],
        correct: 2
    },
    {
        question: "What does DOM stand for?",
        answers: ["Document Object Model", "Digital Object Model", "Data Object Model", "Desktop Object Model"],
        correct: 0
    },
    {
        question: "Which keyword defines a function in JavaScript?",
        answers: ["def", "function", "fun", "define"],
        correct: 1
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        answers: ["//", "<!-- -->", "#", "**"],
        correct: 0
    },
    {
        question: "Which company developed JavaScript?",
        answers: ["Microsoft", "Netscape", "Google", "Apple"],
        correct: 1
    },
    {
        question: "Which HTML tag is used for JavaScript?",
        answers: ["<js>", "<javascript>", "<script>", "<code>"],
        correct: 2
    },
    {
        question: "What does CSS stand for?",
        answers: [
            "Creative Style Sheets",
            "Computer Style Sheets",
            "Cascading Style Sheets",
            "Colorful Style Sheets"
        ],
        correct: 2
    },
    {
        question: "Which method selects an element by ID?",
        answers: [
            "getElementById()",
            "querySelectorAll()",
            "getElementsByClass()",
            "selectById()"
        ],
        correct: 0
    }
];

// currentQuestion keeps track of which question we are on
// score keeps track of how many correct answers the user has
let currentQuestion = 0;
let score = 0;

// These variables store references to HTML elements
// so we don’t have to keep searching for them
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");
const scoreEl = document.getElementById("score");

// Displays the current question and its answers
function loadQuestion() {
    resetState(); // Clears old answers and buttons
    const q = questions[currentQuestion]; //Get current question object
    questionEl.textContent = q.question; //Display question text

    // Create answer buttons dynamically
    q.answers.forEach((answer, index) => {
        const btn = document.createElement("button");
        btn.textContent = answer;
        btn.classList.add("answer-btn");

        // When clicked, check if this anser is correct
        btn.onclick = () => selectAnswer(btn, index);
        answersEl.appendChild(btn);
    });
}

// Clears old answers and hides buttons before loading next questions
function resetState() {
    nextBtn.style.display = "none";
    scoreEl.textContent = "";
    answersEl.innerHTML = "";
}

// Checks if selected answer is correct
// Highlights correct and incorrect answers
// Disables all buttons after one click
function selectAnswer(button, index) {
    const correctIndex = questions[currentQuestion].correct;
    const buttons = document.querySelectorAll(".answer-btn");

    // Disable all answer buttons
    buttons.forEach(btn => btn.disabled = true);

    // Check if user selected the correct answer
    if (index === correctIndex) {
        button.classList.add("correct");
        score++;
    } else {
        button.classList.add("wrong");
        buttons[correctIndex].classList.add("correct");
    }

    // Show the next button
    nextBtn.style.display = "block";
}

// Moves to the next question or ends the quiz
nextBtn.onclick = () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
};

// Displays the final score and restart option
function showResults() {
    questionEl.textContent = "Quiz Completed 🎉";
    answersEl.innerHTML = "";
    nextBtn.style.display = "none";
    restartBtn.style.display = "block";
    scoreEl.textContent = `Your score: ${score} / ${questions.length}`;
}

// Resets everything and starts again
restartBtn.onclick = () => {
    currentQuestion = 0;
    score = 0;
    restartBtn.style.display = "none";
    loadQuestion();
};

// Start quiz on page load
loadQuestion();
