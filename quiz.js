const questions = [
  { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
  { question: "What is the capital of France?", options: ["Paris", "London", "Rome", "Berlin"], answer: "Paris" },
  { question: "Which is a programming language?", options: ["Python", "Snake", "Cobra", "Viper"], answer: "Python" },
  { question: "What color are bananas?", options: ["Red", "Yellow", "Blue", "Purple"], answer: "Yellow" },
  { question: "Which planet is closest to the sun?", options: ["Venus", "Earth", "Mercury", "Mars"], answer: "Mercury" },
  { question: "What is the boiling point of water?", options: ["90°C", "100°C", "120°C", "80°C"], answer: "100°C" },
  { question: "What does CPU stand for?", options: ["Central Process Unit", "Central Processing Unit", "Computer Power Unit", "Computer Processing Use"], answer: "Central Processing Unit" },
  { question: "What is H2O?", options: ["Oxygen", "Hydrogen", "Water", "Salt"], answer: "Water" },
  { question: "How many days are in a week?", options: ["5", "6", "7", "8"], answer: "7" },
  { question: "Which number is even?", options: ["1", "3", "5", "8"], answer: "8" }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 10;

const questionEl = document.getElementById("question");
const questionNumberEl = document.getElementById("question-number");
const optionsEl = document.getElementById("options");
const progressBar = document.getElementById("progress-bar");
const feedbackEl = document.getElementById("feedback");
const scoreContainer = document.getElementById("score-container");
const scoreEl = document.getElementById("score");
const playAgainBtn = document.getElementById("play-again");
const timerBar = document.getElementById("timer-bar");

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  scoreContainer.style.display = "none";
  showQuestion();
}

function showQuestion() {
  clearInterval(timer);
  timeLeft = 10;
  updateTimerBar();

  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  questionNumberEl.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  optionsEl.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.className = "btn btn-outline-primary";
    btn.onclick = () => selectAnswer(option, btn);
    optionsEl.appendChild(btn);
  });

  updateProgress();
  startTimer();
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    updateTimerBar();
    if (timeLeft <= 0) {
      clearInterval(timer);
      showFeedback("Time's up!", false);
    }
  }, 1000);
}

function updateTimerBar() {
  const percent = (timeLeft / 10) * 100;
  timerBar.style.width = percent + "%";
  timerBar.className = timeLeft <= 3 ? "progress-bar bg-danger" : "progress-bar bg-success";
}

function selectAnswer(selected, button) {
  clearInterval(timer);
  const correct = selected === questions[currentQuestion].answer;
  if (correct) score++;

  button.classList.add(correct ? "correct" : "wrong");
  showFeedback(correct ? "Correct!" : "Wrong!", correct);
}

function showFeedback(message, correct) {
  feedbackEl.textContent = message;
  feedbackEl.style.color = correct ? "green" : "red";
  feedbackEl.style.opacity = 1;

  setTimeout(() => {
    feedbackEl.style.opacity = 0;
    nextQuestion();
  }, 1000);
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

function updateProgress() {
  progressBar.style.width = ((currentQuestion / questions.length) * 100) + "%";
  progressBar.textContent = `${currentQuestion} / ${questions.length}`;
}

function endQuiz() {
  questionEl.textContent = "";
  questionNumberEl.textContent = "";
  optionsEl.innerHTML = "";
  feedbackEl.style.opacity = 0;
  scoreContainer.style.display = "block";
  scoreEl.textContent = `Your score: ${score} / ${questions.length}`;
}

playAgainBtn.onclick = startQuiz;

// ✅ New: Wait for click on "Start Game"
document.getElementById("start-btn").onclick = () => {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("quiz-content").style.display = "block";
  startQuiz();
};
