const questions = [
  { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
  { question: "What is the capital of France?", options: ["Paris", "London", "Rome", "Berlin"], answer: "Paris" },
  { question: "Which is a programming language?", options: ["Python", "Snake", "Cobra", "Viper"], answer: "Python" },
  { question: "What color is the sky?", options: ["Blue", "Green", "Red", "Yellow"], answer: "Blue" },
  { question: "Which planet is known as the Red Planet?", options: ["Earth", "Venus", "Mars", "Jupiter"], answer: "Mars" },
  { question: "How many continents are there?", options: ["5", "6", "7", "8"], answer: "7" },
  { question: "What is H2O?", options: ["Oxygen", "Hydrogen", "Water", "Carbon"], answer: "Water" },
  { question: "What is the largest ocean?", options: ["Atlantic", "Indian", "Pacific", "Arctic"], answer: "Pacific" },
  { question: "Who wrote Hamlet?", options: ["Dickens", "Shakespeare", "Austen", "Hemingway"], answer: "Shakespeare" },
  { question: "What is 10 / 2?", options: ["2", "5", "10", "20"], answer: "5" }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 10;

const startBtn = document.getElementById("start-btn");
const quizContainer = document.getElementById("quiz-container");
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
  startBtn.style.display = "none"; // hide start button
  quizContainer.style.display = "block"; // show quiz content
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
    btn.className = "btn btn-outline-primary m-1";
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
  quizContainer.style.display = "none";
  startBtn.style.display = "inline-block"; // show Start again for replay
}

startBtn.onclick = startQuiz;
playAgainBtn.onclick = startQuiz;
