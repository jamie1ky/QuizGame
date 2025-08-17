const questions = [
  { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
  { question: "What is the capital of France?", options: ["Paris", "London", "Rome", "Berlin"], answer: "Paris" },
  { question: "Which is a programming language?", options: ["Python", "Snake", "Cobra", "Viper"], answer: "Python" }
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
  
  // animate button
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

// start quiz automatically
startQuiz();
