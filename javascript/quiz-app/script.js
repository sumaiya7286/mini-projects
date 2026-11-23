const questions = [
    {
      question: "Which is the largest animal in the world?",
      answers:[
        {text: "Shark", correct: false},
        {text: "Blue Whale", correct: true},
        {text: "Giraffe", correct: false},
        {text: "Elephant", correct: false},
      ]
    },
    {
      question: "Which is the largest building in the world?",
      answers:[
        {text: "Burj Khalifa", correct: true},
        {text: "Kutub Minar", correct: false},
        {text: "India Gate", correct: false},
        {text: "Statue of liberty", correct: false},
      ]
    },
    {
      question: "Which is the national animal of India?",
      answers:[
        {text: "Tiger", correct: false},
        {text: "Lion", correct: true},
        {text: "Giraffe", correct: false},
        {text: "Elephant", correct: false},
      ]
    },
]


const questionElement = document.getElementById("question")
const answerButton = document.getElementById("answer-buttons")
const nextButton = document.getElementById("nextBtn")


let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next"
    showQuestion()
}

function showQuestion(){
    resetstate()
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question

    currentQuestion.answers.forEach(answer=>{
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");

    if(answer.correct){
        button.dataset.correct = answer.correct
    }

    button.addEventListener("click", selectAnswer);

    answerButton.appendChild(button);
    })
    }


    function resetstate(){
        nextButton.style.display = "none";
        while(answerButton.firstChild){
         answerButton.removeChild(answerButton.firstChild)
        }

    }

    function selectAnswer(e){
        const selectedBtn = e.target;

        const isCorrect = selectedBtn.dataset.correct === "true";

        if(isCorrect){
            selectedBtn.classList.add("correct");
            score++;
        }else{
              selectedBtn.classList.add("incorrect");
        }

        
    Array.from(answerButton.children).forEach(button =>{
         if (button.dataset.correct === "true") {

            button.classList.add("correct");
         }
         button.disabled = true;
    })

    nextButton.style.display = "block";

    }

    function showScore(){
        resetstate();

        questionElement.innerHTML = `You scored ${score} out of ${questions.length}! `;
         nextButton.innerHTML = "Play Again";
            nextButton.style.display = "block";
    }

    function handleNextButton(){
         currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {

        showQuestion();

    }

    else {

        showScore();

    }
    }


nextButton.addEventListener("click", () => {

    if (currentQuestionIndex < questions.length) {

        handleNextButton();

    }

    else {

        startQuiz();

    }

});
startQuiz();