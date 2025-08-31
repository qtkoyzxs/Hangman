import promp from "./promp.js";
import data from "./data.js";

const word = data[Math.floor(Math.random() * data.length)];
const hangmanWord = "HANGMAN";
const maxWrong = hangmanWord.length;
let wrongGuesses = 0;
let guessedLetters = [];

function displayGuessedLetters() {
    return word.word
        .split("")
        .map(char => {
            if (guessedLetters.includes(char.toLowerCase())) {
                return char;
            } else {
                return "_";
            }
        })
        .join(" ");
}

function displayHangman() {
    return hangmanWord
        .split("")
        .map((char, idx) => {
            if (idx < wrongGuesses) {
                return char;
            } else {
                return "_";
            }
        })
        .join("");
}

async function runGame () {
    console.log(`Word: ${displayGuessedLetters()}`);
    console.log(`HANGMAN: ${displayHangman()}`);

    const answer = await promp(`${word.question} `);

    if (answer.length === 1) {
        const letter = answer.toLowerCase();
        if (word.word.toLowerCase().includes(letter)) {
            if (!guessedLetters.includes(letter)) {
                guessedLetters.push(letter);
                console.log("Correct letter!");
            } else {
                console.log("You already guessed that letter.");
            }
        } else {
            console.log(`Wrong letter!`);
            wrongGuesses++;
        }
    } else if (answer.toLowerCase() === word.word.toLowerCase()) {
        console.log("Congratulations! You've guessed the word correctly.");
        return;
    }

    const allGuessed = word.word
        .toLowerCase()
        .split("")
        .every(char => guessedLetters.includes(char));

    if (allGuessed) {
        console.log(`Congratulations! You've guessed the word: ${word.word}`);
        return;
    }

    if (wrongGuesses >= maxWrong) {
        console.log("Game Over! You've been hanged!");
        console.log(`The correct answer was: ${word.word}`);
        return;
    }

    return runGame();
}



runGame();