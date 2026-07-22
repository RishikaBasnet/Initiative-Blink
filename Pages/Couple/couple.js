// QUESTIONS

const questions = [
  {
    "question": "Do you prefer daytime or nighttime?",
    "answer1": "Daytime",
    "answer1Total": "1",
    "answer2": "Either",
    "answer2Total": "2",
    "answer3": "Nighttime",
    "answer3Total": "3"
  },
  {
    "question": "Which environment do you prefer?",
    "answer1": "Outdoors",
    "answer1Total": "1",
    "answer2": "Inside, but outside home",
    "answer2Total": "2",
    "answer3": "At home",
    "answer3Total": "3"
  },
  {
    "question":
      "Which of these appeal to you?",
    "answer1": "Exploration",
    "answer1Total": "1",
    "answer2": "Creativity",
    "answer2Total": "2",
    "answer3": "Relaxation",
    "answer3Total": "3"
  },
  {
    "question": "Preferred surroundings",
    "answer1": "Loud, wild",
    "answer1Total": "1",
    "answer2": "Casual",
    "answer2Total": "2",
    "answer3": "Quiet, peaceful",
    "answer3Total": "3"
  }
]


let currentQuestion = 0;
let score = [];
let selectedAnswersData = [];
const totalQuestions =questions.length;

const container = document.querySelector('.quiz-container');
const questionEl = document.querySelector('.question');
const option1 = document.querySelector('.option1');
const option2 = document.querySelector('.option2');
const option3 = document.querySelector('.option3');
const nextButton = document.querySelector('.next');
const previousButton = document.querySelector('.previous');
const restartButton = document.querySelector('.restart');
const result = document.querySelector('.result');

//Function to generate question 
function generateQuestions (index) {
    //Select each question by passing it a particular index
    const question = questions[index];
    const option1Total = questions[index].answer1Total;
    const option2Total = questions[index].answer2Total;
    const option3Total = questions[index].answer3Total;
    //Populate html elements 
    questionEl.innerHTML = `${index + 1}. ${question.question}`
    option1.setAttribute('data-total', `${option1Total}`);
    option2.setAttribute('data-total', `${option2Total}`);
    option3.setAttribute('data-total', `${option3Total}`);
    option1.innerHTML = `${question.answer1}`
    option2.innerHTML = `${question.answer2}`
    option3.innerHTML = `${question.answer3}`
}


function loadNextQuestion () {
    const selectedOption = document.querySelector('input[type="radio"]:checked');
    //Check if there is a radio input checked
    if(!selectedOption) {
        alert('Please select your answer!');
        return;
    }
    //Get value of selected radio
    const answerScore = Number(selectedOption.nextElementSibling.getAttribute('data-total'));

    ////Add the answer score to the score array
    score.push(answerScore);

    selectedAnswersData.push()
    

    const totalScore = score.reduce((total, currentNum) => total + currentNum);

    //Finally we incement the current question number ( to be used as the index for each array)
    currentQuestion++;

        //once finished clear checked
        selectedOption.checked = false;
    //If quiz is on the final question
    if(currentQuestion == totalQuestions - 1) {
        nextButton.textContent = 'Finish';
    }
    //If the quiz is finished then we hide the questions container and show the results 
    if(currentQuestion == totalQuestions) {
        container.style.display = 'none';
        result.innerHTML =
         `<h1 class="final-score">Your score: ${totalScore}</h1>
         <div class="Your activity">
            <h1>Your activity:</h1>
            <p>4-6: Hiking, skydiving, partying</p>
            <p>7-9: Pottery, painting, park picnic </p>
            <p>10-12: Stay-at-home movie, aquarium, museum </p>
        </div>
        <button class="restart">Restart Quiz</button>
         `;
        return;
    }
    generateQuestions(currentQuestion);
}

//Function to load previous question
function loadPreviousQuestion() {
    //Decrement quentions index
    currentQuestion--;
    //remove last array value;
    score.pop();
    //Generate the question
    generateQuestions(currentQuestion);
}

//Fuction to reset and restart the quiz;
function restartQuiz(e) {
    if(e.target.matches('button')) {
    //reset array index and score
    currentQuestion = 0;
    score = [];
    //Reload quiz to the start
    location.reload();
    }

}


generateQuestions(currentQuestion);
nextButton.addEventListener('click', loadNextQuestion);
previousButton.addEventListener('click',loadPreviousQuestion);
result.addEventListener('click',restartQuiz);
