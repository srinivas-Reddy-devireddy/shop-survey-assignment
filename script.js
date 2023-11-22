const questions = [
  {
    id: 1,
    text: "How satisfied are you with our products?",
    type: "rating",
    max: 5,
  },
  {
    id: 2,
    text: "How fair are the prices compared to similar retailers?",
    type: "rating",
    max: 5,
  },
  {
    id: 3,
    text: "How satisfied are you with the value for money of your purchase?",
    type: "rating",
    max: 5,
  },
  {
    id: 4,
    text: "On a scale of 1-10, how would you recommend us to your friends and family?",
    type: "rating",
    max: 10,
  },
  { id: 5, text: "What could we do to improve our service?", type: "text" },
];

let currentQuestion = 0;
let answers = [];




function startSurvey() {
  document.getElementById("welcome-screen").style.display = "none";

  showQuestion();
}

function showQuestion() {
  const questionScreen = document.getElementById("question-screen");
  const questionText = document.getElementById("question-text");
  const answerOptions = document.getElementById("answer-options");
  const textlength = document.getElementById("text/length");

  if (currentQuestion < questions.length) {
    const question = questions[currentQuestion];
    questionText.innerText = `${currentQuestion + 1}. ${question.text}`;
    textlength.innerText = `${currentQuestion + 1}/${questions.length}`;
    if (question.type === "rating") {
      answerOptions.innerHTML = generateRatingOptions(question.max);
    } else {
      answerOptions.innerHTML =
        '<textarea id="text-answer" rows="4" cols="50"></textarea>';
    }

    questionScreen.style.display = "block";
  } else {
    document.getElementById("confirmation-screen").style.display = "block";
  }
}

function generateRatingOptions(max) {
  let optionsHTML = "";
  for (let i = 1; i <= max; i++) {
    optionsHTML += `<label ><input type="radio" name="rating" value="${i}">${i}</label>`;
  }
  return optionsHTML;
}



function submitSurvey() {
  saveSurveyData();
  document.getElementById("question-screen").style.display = "none";
  document.getElementById("confirmation-screen").style.display = "none";
  document.getElementById("thank-you-screen").style.display = "block";
  confirm('press a button OK or Cancel')
  setTimeout(() => {
    resetSurvey();
  }, 5000); // Show welcome screen after 5 seconds
}

function cancelSubmit() {
  document.getElementById("question-screen").style.display = "none";
  document.getElementById("confirmation-screen").style.display = "none";
  resetSurvey(); // Continue the survey
}
document.getElementById("confirmation-screen").style.display = "none";
document.getElementById("thank-you-screen").style.display = "none";
function resetSurvey() {
  ``;
  currentQuestion = 0;
  answers = [];
  document.getElementById("thank-you-screen").style.display = "none";
  document.getElementById("welcome-screen").style.display = "block";
}

function saveSurveyData() {
  const sessionId = generateSessionId();
  const data = { sessionId, answers, status: "COMPLETED" };
  // Save data to local storage
  localStorage.setItem(sessionId, JSON.stringify(data));
}

function generateSessionId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

function nextQuestion() {
  const answer = getAnswer();
  answers.push({ questionId: questions[currentQuestion].id, answer });
  currentQuestion++;
  showQuestion();
}

function prevQuestion() {
  if (currentQuestion > 0) {
    const answer = getAnswer();
    answers.push({ questionId: questions[currentQuestion].id, answer });
    currentQuestion--;
    showQuestion();
  }
}



function getAnswer() {
  if (questions[currentQuestion].type === "rating") {
    const selectedRating = document.querySelector(
      'input[name="rating"]:checked'
    );
    return selectedRating ? parseInt(selectedRating.value) : null;
  } else {
    return document.getElementById("text-answer").value;
  }
}
