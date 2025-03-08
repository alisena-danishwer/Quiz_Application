const questions = [
    {
        question: "What is the capital city of France?",
        answers: [
            { text: "A) Lyon", correct: false },
            { text: "B) Marseille", correct: false },
            { text: "C) Paris", correct: true },
            { text: "D) Nice", correct: false }
        ]
    },
    {
        question: "What currency is used in France?",
        answers: [
            { text: "A) Eure (Є)", correct: true},
            { text: "B) Pound (£)", correct: false },
            { text: "C) Dollar($)", correct: false },
            { text: "D) Franc ", correct: false }
        ]
    },
    {
        question: "Who wrote Masnavi Ma'navi?",
        answers: [
            { text: "A) Saadi Shirazi", correct: false },
            { text: "B) Hafez", correct: false },
            { text: "C) Jalal al-Din Muhammad Balkhi (Rumi)", correct: true },
            { text: "D) Scott Fitzgerald", correct: false }
        ]
    },
     {
        question: "Who is the founder of Apple company?",
        answers: [
            { text: "A) Steve Jobs", correct: false },
            { text: "B) Steve Wozniak", correct: false },
            { text: "C) Ronald Wayne", correct: true },
            { text: "D) All", correct: true }
        ]
    },
    {
        question: " Who is the prime minister of Malaysia? ",
        answers:[
            {text: "A) Anwar Ibrahim", correct: true},
            {text: "B) Abdullah Abdullah", correct: false},
            {text: "C) Lewsi Tin Kong", correct: false},
            {text: "D)Jawid Khalili", correct: false}

        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionContainer = document.getElementById('question');
const questionNumber = document.getElementById('question-number');
const feedback = document.getElementById('feedback');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const submitButton = document.getElementById('submit-btn'); // Submit button reference
const resultSection = document.getElementById('result-section');
const finalScore = document.getElementById('final-score');
const restartButton = document.getElementById('restart-btn');

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultSection.style.display = 'none';
    nextButton.style.display = 'none';
    submitButton.style.display = 'none';
    feedback.innerText = '';
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionNumber.innerText = `Question ${currentQuestionIndex + 1}`;
    questionContainer.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });

    // Show "Next" button for questions 1 and 2, "Submit" for the last question
    if (currentQuestionIndex < questions.length - 1) {
        nextButton.style.display = 'block';
        submitButton.style.display = 'none';
    } else {
        nextButton.style.display = 'none';
        submitButton.style.display = 'block';
    }
}

function resetState() {
    nextButton.style.display = 'none'; // Hide next button initially
    submitButton.style.display = 'none'; // Hide submit button initially
    feedback.innerText = '';
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";
    if (correct) {
        feedback.innerText = "Correct!";
        score++;
    } else {
        feedback.innerText = `Incorrect! The correct answer is: ${getCorrectAnswer()}`;
    }
    setStatusClass(selectedButton, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === "true");
        button.disabled = true;
    });
}

function getCorrectAnswer() {
    return questions[currentQuestionIndex].answers.find(answer => answer.correct).text;
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function showResult() {
    // Hide question-related elements and buttons
    questionNumber.innerText = '';
    questionContainer.innerText = '';
    answerButtonsElement.innerHTML = '';
    nextButton.style.display = 'none'; // Hide the next button on result page
    submitButton.style.display = 'none'; // Hide the submit button on result page

    // Show the result section with the final score
    finalScore.innerText = `Your final score: ${score} out of ${questions.length}`;
    resultSection.style.display = 'block';
}

// Event listener for the "Next" button to go to the next question
nextButton.addEventListener('click', () => {
    feedback.innerText = '';  // Clear the feedback message
    currentQuestionIndex++;
    showQuestion();
});

// Event listener for the "Submit" button to show the result on the last question
submitButton.addEventListener('click', showResult);

// Event listener for the "Restart" button to restart the quiz
restartButton.addEventListener('click', startQuiz);

// Start the quiz
startQuiz();
