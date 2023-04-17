const startBtn = document.querySelector('.start_btn button');
const infoBox = document.querySelector('.info_box');
const exitBtn = document.querySelector('.buttons .exit');
const continueBtn = document.querySelector('.buttons .continue');
const quizBox = document.querySelector('.quiz_box');
const nextBtn = quizBox.querySelector('footer .next_btn');
const footerQuestionsCounter = quizBox.querySelector('.total_que');
const option_list = document.querySelector('.option_list');
const timeCounter = quizBox.querySelector('.timer_sec');
const resultBox = document.querySelector('.result_box');
const restartQuiz = document.querySelector('.restart');
const quitQuiz = document.querySelector('.quit');

let questionsCounter = 0;
let footerQuestionCounter = 1;
let counter;
let timeValue = 10;
let userScore = 0;

const startHandler = () => {
  infoBox.classList.add('activeInfo');
};

const exitHandler = () => {
  infoBox.classList.remove('activeInfo');
};

const continueHandler = () => {
  infoBox.classList.remove('activeInfo');
  quizBox.classList.add('activeQuiz');
  showQuestions(questionsCounter);
  footerQuestionsCountreHandler(1);
  clearInterval(counter);
  startTimer(timeValue);
};

nextQuestionHandler = () => {
  if (questionsCounter < questions.length - 1) {
    questionsCounter++;
    showQuestions(questionsCounter);
    footerQuestionsCountreHandler(questionsCounter + 1);
    clearInterval(counter);
    startTimer(timeValue);
    nextBtn.classList.remove('show');
  } else {
    clearInterval(counter);
    showResultBox();
  }
};

const showQuestions = (index) => {
  const questionsText = document.querySelector('.que_text');
  let questionTag = `<span>${questions[index].numb}. ${questions[index].question}</span>`;
  let option_tag =
    '<div class="option">' +
    questions[index].options[0] +
    '<span></span> </div>' +
    '<div class="option">' +
    questions[index].options[1] +
    '<span></span></div>' +
    '<div class="option">' +
    questions[index].options[2] +
    '<span></span> </div>' +
    '<div class="option">' +
    questions[index].options[3] +
    '<span></span></div>';
  questionsText.innerHTML = questionTag;
  option_list.innerHTML = option_tag;

  const option = option_list.querySelectorAll('.option');
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute('onclick', 'optionSelected(this)');
  }
};

const optionSelected = (answer) => {
  clearInterval(counter);
  let userAnswer = answer.textContent;
  let correctAnswer = questions[questionsCounter].answer;
  let allOptions = option_list.children.length;
  if (userAnswer === correctAnswer) {
    answer.classList.add('correct');
    userScore++;
    console.log('tak');
  } else {
    answer.classList.add('incorrect');
    console.log('nie');

    for (let i = 0; i < allOptions; i++) {
      if (option_list.children[i].textContent == correctAnswer) {
        option_list.children[i].setAttribute('class', 'option correct');
      }
    }
  }

  for (let i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add('disabled');
  }

  nextBtn.classList.add('show');
};

const footerQuestionsCountreHandler = (index) => {
  let totalQuestionsCountTag = `<span><p>${index}</p> <p> of </p><p>${questions.length}</p>  Questions</span>`;
  footerQuestionsCounter.innerHTML = totalQuestionsCountTag;
};

const startTimer = (time) => {
  counter = setInterval(timer, 1000);
  function timer() {
    timeCounter.textContent = time;
    time--;
    if (time < 0) {
      clearInterval(counter);
      timeCounter.textContent == '0';
    }
  }
};

const showResultBox = () => {
  infoBox.classList.remove('activeInfo');
  quizBox.classList.remove('activeQuiz');
  resultBox.classList.add('activeResult');
  const scoreText = resultBox.querySelector('.score_text');
  const scoreTag = `<span> You got <p>${userScore} out of ${questions.length}</p></span>`;
  scoreText.innerHTML = scoreTag;
};

const quitQuizHandler = () => {
  window.location.reload();
};

const restartQuizHandler = () => {
  console.log('restart');
  quizBox.classList.add('activeQuiz');
  resultBox.classList.remove('activeResult');
  timeValue = 10;
  questionsCounter = 0;
  userScore = 0;
  showQuestions(questionsCounter);
  footerQuestionsCountreHandler(1);
  clearInterval(counter);
  startTimer(timeValue);
  nextBtn.classList.remove('show');
};

startBtn.addEventListener('click', startHandler);
exitBtn.addEventListener('click', exitHandler);
continueBtn.addEventListener('click', continueHandler);
nextBtn.addEventListener('click', nextQuestionHandler);
quitQuiz.addEventListener('click', quitQuizHandler);
restartQuiz.addEventListener('click', restartQuizHandler);
