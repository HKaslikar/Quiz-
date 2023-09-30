// Quiz data
const questions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Rome"],
        correctAnswer: "Paris",
    },
    {
        question: "Which planet is known as the 'Red Planet'?",
        options: ["Mars", "Venus", "Earth", "Jupiter"],
        correctAnswer: "Mars",
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["Elephant", "Giraffe", "Blue Whale", "Lion"],
        correctAnswer: "Blue Whale",
    },
    {
        question: "Which gas do plants absorb from the atmosphere?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        correctAnswer: "Carbon Dioxide",
    },
    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        options: ["William Shakespeare", "Charles Dickens", "Jane Austen", "Mark Twain"],
        correctAnswer: "William Shakespeare",
    },
];

// Initialize quiz variables
let currentQuestionIndex = 0;
let score = 0;

// Define the time limit for each question in seconds
const timeLimitPerQuestion = 10;

let timer; // Variable to store the timer interval ID
let timeRemaining = timeLimitPerQuestion; // Initialize time remaining for the first question

// DOM elements
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const submitButton = document.getElementById("submit-btn");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart-btn");
const timerElement = document.getElementById("timer");

// Function to start the timer
function startTimer() {
    timer = setInterval(() => {
        if (timeRemaining <= 0) {
            // Time is up, submit the answer automatically
            submitAnswer();
            clearInterval(timer);
            
            nextQuestion();
            
            
        } else {
            // Update the timer display
            timerElement.textContent = `Time Remaining: ${timeRemaining} seconds`;
            timeRemaining--;
        }
    }, 1000); // Update every second
}

// Function to stop the timer
function stopTimer() {
    clearInterval(timer);
    timerElement.textContent = "";
}

// Function to load the current question
function loadQuestion() {
    
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = `Question ${currentQuestionIndex + 1}: ${currentQuestion.question}`;
    optionsElement.innerHTML = "";

    currentQuestion.options.forEach((option) => {
        const li = document.createElement("li");
        li.innerHTML = `<input type="radio" name="answer" value="${option}"> ${option}`;
        optionsElement.appendChild(li);
    });

    submitButton.disabled = false;

    // Start the timer when a new question is loaded
    startTimer();
    
}


// Function to handle the submission of answers
function submitAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (!selectedOption) return;

    const userAnswer = selectedOption.value;
    const currentQuestion = questions[currentQuestionIndex];

    // Check if the user's answer is correct
    if (userAnswer === currentQuestion.correctAnswer) {
        // Provide feedback for correct answer
        showAnswerFeedback(true);
        score++;
    } else {
        // Provide feedback for incorrect answer
        showAnswerFeedback(false, currentQuestion.correctAnswer);
    }

    submitButton.disabled = true;
    nextButton.style.display = "inline-block";

    // Disable other radio buttons
    const radioButtons = document.querySelectorAll('input[name="answer"]');
    radioButtons.forEach((radioButton) => {
        radioButton.disabled = true;
    });

    // Stop the timer when an answer is submitted
    stopTimer();
}

// Function to show answer feedback
function showAnswerFeedback(isCorrect, correctAnswer) {
    const feedbackElement = document.createElement("p");
    feedbackElement.classList.add(isCorrect ? "correct-answer" : "incorrect-answer");
    feedbackElement.textContent = isCorrect ? "Correct!" : `Incorrect. The correct answer is: ${correctAnswer}`;
    optionsElement.appendChild(feedbackElement);
}


// Function to move to the next question
function nextQuestion() {
    currentQuestionIndex++;
    timeRemaining=10;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
        submitButton.disabled = false;
        nextButton.style.display = "none";
    } else {
        // Quiz is completed
        showResult();
    }
}

// Function to display the final score
function showResult() {
    resultContainer.style.display = "block";
    questionElement.style.display = "none";
    optionsElement.style.display = "none";
    submitButton.style.display = "none";
    nextButton.style.display = "none";

    scoreElement.textContent = `Your score: ${score}/${questions.length}`;
}

// Function to restart the quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.style.display = "none";
    questionElement.style.display = "block";
    optionsElement.style.display = "block";
    submitButton.style.display = "block";
    loadQuestion();
}

// Event listeners
submitButton.addEventListener("click", () => {
    submitAnswer();
});

nextButton.addEventListener("click", () => {
    nextQuestion();
    submitButton.disabled = false; // Re-enable the Submit button when moving to the next question
});

restartButton.addEventListener("click", () => {
    restartQuiz();
});

// Initial load
loadQuestion();

