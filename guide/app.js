const readline = require("readline");

//1. create interface

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//generate random numbers
const num1 = Math.floor(Math.random() * 10 + 1);
const num2 = Math.floor(Math.random() * 10 + 1);
const result = num1 - num2;

//receive question
rl.question(`What is the result of ${num1} - ${num2} \n`, userInput => {
  if (userInput.trim() === result) {
    //close the application
    //emit
    rl.close();
  }
});

//listen to the event
rl.on("close", () => {
  console.log("Yeaaa got it");
});
