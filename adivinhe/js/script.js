// ...
const inputs = document.querySelector(".inputs"),
hintTag = document.querySelector(".hint span"),
guessLeft = document.querySelector(".guess-left span"),
wrongLetter = document.querySelector(".wrong-letter span"),
resetBtn = document.querySelector(".reset-btn"),
typingInput = document.querySelector(".typing-input");

let word, maxGuesses, incorrectLetters = [], correctLetters = [];


function randomWord() {
    let ranItem = wordList[Math.floor(Math.random() * wordList.length)];
    word = ranItem.word.toLowerCase(); // Converte a palavra para minúsculas
    maxGuesses = word.length >= 5 ? 8 : 6;
    correctLetters = [];
    incorrectLetters = [];
    hintTag.innerText = ranItem.hint;
    guessLeft.innerText = maxGuesses;
    wrongLetter.innerText = incorrectLetters;

    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += `<input type="text" disabled>`;
        inputs.innerHTML = html;
    }
}
randomWord();

function initGame(e) {
    let key = e.target.value.toLowerCase(); // Converte a entrada para minúsculas
    if (key.match(/^[a-z]+$/) && !incorrectLetters.includes(` ${key}`) && !correctLetters.includes(key)) {
        let found = false; // Adiciona uma variável para acompanhar se a letra foi encontrada
        for (let i = 0; i < word.length; i++) {
            if (word[i] === key) {
                correctLetters.push(key);
                inputs.querySelectorAll("input")[i].value = key;
                found = true; // Marca que a letra foi encontrada
            }
        }
        if (!found) {
            maxGuesses--;
            incorrectLetters.push(` ${key}`);
        }
        guessLeft.innerText = maxGuesses;
        wrongLetter.innerText = incorrectLetters;
    }
    typingInput.value = "";

    setTimeout(() => {
        if (correctLetters.length === word.length) {
            alert(`parabéns! Você acertou a palavra ${word.toUpperCase()}`);
            return randomWord();
        } else if (maxGuesses < 1) {
            alert("Fim das tentativas :( ");
            for (let i = 0; i < word.length; i++) {
                inputs.querySelectorAll("input")[i].value = word[i];
            }
        }
    }, 100);
}

resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame);
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());


