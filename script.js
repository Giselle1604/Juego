const questions = [

    { question: "¿Cúal es el proposito de la sentencia if?", options: ["Condicional", "Bucle", "Funcion", "Variable"], answer: "Condicional" },
    { question: "¿Que tipo de dato es TRUE o FALSE?", options: ["Numerico", "Texto", "Booleano", "Array"], answer: "Booleano" },
    { question: "¿Cúal es el operador de asignacion en programacion?", options: ["=", "==", "+", "!="], answer: "=" },
    { question: "¿Que es un bucle FOR?", options: ["que se repite una vez", "que se repite varias veces", "que se repite infinitamente", "que no se repite"], answer: "que se repite varias veces" },
    { question: "¿Qué es una funcion de programacion?", options: ["un bloque de codigo que se ejecuta una vez", "un bloque de codigo que se ejecuta varias veces", "un bloque de codigo que se ejecuta infinitamente", "un bloque de codigo que no se ejecuta"], answer: "un bloque de codigo que se ejecuta varias veces" },
    { question: "¿que es un metodo en programacion?", options: ["una variable que almacena un solo valor", "un bloque de codigo que se ejecuta varias veces", "una funcion que pertence a un objeto", "un bucle que se repita varias veces"], answer: "una funcion que pertence a un objeto" },
    { question: "¿Cuál de estos es un lenguaje de programación?", options: ["HTML", "CSS", "JavaScript", "xml"], answer: "JavaScript" },
    { question: "¿Qué es CSS?", options: ["Un lenguaje de programación", "Un sistema de bases de datos", "Una hoja de estilo", "Un lenguaje de marcado"], answer: "Una hoja de estilo" },
    { question: "¿El numero 1010 en binario se representa en decimal como?", options: ["8", "12", "16", "ninguna de las anteriores"], answer: "ninguna de las anteriores" },
    { question: "¿Qué es un Diagrama de flujo de Datos?", options: ["Es la representacion simbolica de un algoritmo", "Es una serie de pasos para dar solución a un problema", "Es el orden de los pasos para un sisitema de informacion", "Es el estudio de las ordenes creadas por un programador"], answer: "Es la representacion simbolica de un algoritmo" }

];

let currentQuestion = 0;
let correctAnswers = 0;

const playSound = new Audio('sonidos/ganar.mp3');
const correctSound = new Audio('sonidos/mario-bros-1-up.mp3');
const incorrectSound = new Audio('sonidos/perder.mp3')
const ganar = new Audio('sonidos/super-mario-castle-bros.mp3');
const perder = new Audio('sonidos/mario-bros game over.mp3');

document.getElementById('inicioBtn').addEventListener('click', function() {
    playSound.play();

    document.getElementById('inicio').style.display = 'none';
        document.querySelector('.container').style.display = 'block';
        currentQuestion = 0;
        correctAnswers = 0;
        loadQuestion();

})

function loadQuestion() {
    if (currentQuestion < questions.length) {
        const q = questions[currentQuestion];
        document.getElementById('question').innerText = q.question;
        const optionsDiv = document.getElementById('options');
        optionsDiv.innerHTML = '';
        q.options.forEach(option => {
            const button = document.createElement('button');
            button.innerText = option;
            button.onclick = () => checkAnswer(option);
            optionsDiv.appendChild(button);
        });
        updateProgressBar();
    } else {
        showResult();
    }
}

function checkAnswer(option) {
    const correct = questions[currentQuestion].answer;
    if (option === correct) {
        correctAnswers++;
        correctSound.play();
    } else {
        incorrectSound.play();
    }
    currentQuestion++;
    loadQuestion();
}

function updateProgressBar() {
    const progress = ((currentQuestion / questions.length) * 100) + '%';
    document.getElementById('progress-bar-fill').style.width = progress;
}

function showResult() {
    const percentage = (correctAnswers / questions.length) * 100;
    
    let resultText;
    let imagePath = '';

    if (percentage >=80){
        resultText = `¡Excelente, lo has hecho muy bien!!   Puntuacion:  ${percentage.toFixed(2)}%`;
        imagePath = 'img/100.gif';
        ganar.play();

    } else if (percentage >=50){
        resultText = `¡Vamos bien, puedes mejorar!!   Puntuacion:  ${percentage.toFixed(2)}%`;
        imagePath = 'img/game-over.gif';
        perder.play();
    }
    else{
        resultText = `¡A ESTUDIAR FLOJO!!!!!   Puntuacion:  ${percentage.toFixed(2)}%`;
        imagePath= 'img/game-over.gif';
        perder.play();
    }
   const resultTextElement = document.getElementById('result-text');
   resultTextElement.innerText = resultText;
   resultTextElement.style.display = 'block';

    const resultImageDiv = document.getElementById('result-image');
    resultImageDiv.innerHTML = '';

    const resultImage = document.createElement('img');
    resultImage.src = imagePath;
    resultImage.alt = 'resultado';
    resultImage.style.display = 'block';
    resultImage.style.margin = '20px auto';
    resultImage.style.maxWidth ='100%';
    resultImage.style.height = 'auto';
    resultImage.style.objectFit = 'contain';
    resultImageDiv.appendChild(resultImage);

    document.getElementById('result').style.display ='block';
    document.getElementById('question-container').style.display = 'none';
}

window.onload = loadQuestion;
