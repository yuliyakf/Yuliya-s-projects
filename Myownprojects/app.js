//Stopwatch

let output = document.getElementById('stopwatch');
document.getElementById('startbtn').addEventListener('click', start);
document.getElementById('stopbtn').addEventListener('click', stop);
document.getElementById('resetbtn').addEventListener('click', reset);
let mil = 0;
let sec = 0;
let min = 0;

function timer() {

   mil++;
   if (mil >= 100) {
      sec++
      mil = 0
   }
   if (sec >= 60) {
      min++
      sec = 0
   }
   if (min >= 60) {
      min, sec, mil = 0
   }

   let mili = mil < 10 ? '0' + mil : mil;
   let secon = sec < 10 ? '0' + sec : sec;
   let minut = min < 10 ? '0' + min : min;

   let timer = `${minut}:${secon}:${mili}`
   output.innerHTML = timer;
}

function start() {
   time = setInterval(timer, 10);
}

function stop() {
   clearInterval(time);
}

function reset() {
   min = sec = mil = 0;
   output.innerHTML = '00:00:00';
}

//Clock

function runClock() {
   let date = new Date();
   date.toLocaleString();
   let h = date.getHours();
   let m = date.getMinutes();
   let s = date.getSeconds();
   let session = 'AM';

   if (h === 0) {
      h = 12;
   }
   if (h > 12) {
      h = h - 12;
      session = 'PM';
   }

   h = (h < 10) ? '0' + h : h;
   m = (m < 10) ? '0' + m : m;
   s = (s < 10) ? '0' + s : s;

   let runTime = `${h}:${m}:${s} ${session}`;
   document.getElementById('clock').innerHTML = runTime;
   setTimeout(runClock, 1000);
}

runClock();

//calculator 1

class Calculator {
   constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement
      this.currentOperandTextElement = currentOperandTextElement
      this.clear()
   }

   clear() {
      this.currentOperand = ""
      this.previousOperand = ""
      this.operation = undefined
   }

   delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1)
   }

   appendNumber(number) {
      if (number === '.' && this.currentOperand.includes('.')) return
      this.currentOperand = this.currentOperand.toString() + number.toString()
   }

   chooseOperation(operation) {
      if (this.currentOperand === '') return
      if (this.previousOperand !== '') {
         this.compute()
      }
      this.operation = operation
      this.previousOperand = this.currentOperand
      this.currentOperand = ''
   }

   compute() {
      let computation
      const prev = parseFloat(this.previousOperand)
      const current = parseFloat(this.currentOperand)
      if (isNaN(prev) || isNaN(current)) return
      switch (this.operation) {
         case '+':
            computation = prev + current
            break
         case '-':
            computation = prev - current
            break
         case 'x':
            computation = prev * current
            break
         case '÷':
            computation = prev / current
            break
         default:
            return
      }
      this.currentOperand = computation
      this.operation = undefined
      this.previousOperand = ''
   }

   updateDisplay() {
      this.currentOperandTextElement.innerText = this.currentOperand
      this.previousOperandTextElement.innerText = this.previousOperand
   }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
   button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
   })
})

operationButtons.forEach(button => {
   button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
   })
})

equalsButton.addEventListener('click', button => {
   calculator.compute()
   calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
   calculator.clear()
   calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
   calculator.delete()
   calculator.updateDisplay()
})

//Color matching game

let numSquares = 6;
let colors = [];
let pickedColor;

let squares = document.querySelectorAll('.square')
let colorDisplay = document.querySelector('#color-display')
let messageDisplay = document.querySelector('#message')
let h3 = document.querySelector('h3')
let resetButton = document.querySelector('#reset2')
let modeButtons = document.querySelectorAll('.mode')
let easyButton = document.querySelector('.mode')

init();

function init(){
   colorDisplay.textContent = pickedColor;
   setupSquares();
   setupMode();
   reset1();
}

resetButton.addEventListener('click', function(){
   reset1();
});

function setupSquares(){
   for (let i = 0; i< squares.length; i++){
      squares[i].style.backgroundColor = colors[i];
      squares[i].addEventListener('click', function(){
         let clickedColor = this.style.backgroundColor;
         if(clickedColor === pickedColor){
            messageDisplay.textContent = "Correct";
            resetButton.textContent = "Play Again";
            changeColors(pickedColor);
         }
         else {
            this.style.backgroundColor = "#232323";
            messageDisplay.textContent = "try again";
         }
      });
   }
}

function setupMode(){
   for (let i = 0; i< modeButtons.length; i++) {
      modeButtons[i].addEventListener('click', function(){
         for (let i = 0; i < modeButtons.length; i++){
            modeButtons[i].classList.remove('selected');
         }
         this.classList.add('selected');
         if(this.textContent === "Easy"){
            numSquares = 3;
         } else{
            numSquares = 6;
         }
         reset1();
      });
   }
}

function reset1(){
   colors = genRandomColors(numSquares);
   pickedColor = chooseColor();
   colorDisplay.textContent = pickedColor;
   h3.style.backgroundColor = "#2c8e99";
   resetButton.textContent = "New Colors";
   messageDisplay.textContent = '';
   for (let i = 0; i< squares.length; i++){
      if(colors[i]){
         squares[i].style.display = "block";
         squares[i].style.backgroundColor = colors[i];
      } else {
         squares[i].style.display = 'none';
      }
   }
}

function changeColors(color){
   for (let i = 0; i < squares.length; i++){
      squares[i].style.backgroundColor = color;
      h3.style.backgroundColor = color;
   }
}

function chooseColor(){
   let random = Math.floor(Math.random()*colors.length);
   return colors[random];
}

function genRandomColors(num){
   let arr = [];
   for (let i = 0; i<num; i++){
      arr.push(makeColor());
   }
   return arr;
}

function makeColor(){
   let r = Math.floor(Math.random() * 256);
   let g = Math.floor(Math.random() * 256);
   let b = Math.floor(Math.random() * 256);
   return "rgb(" + r + ", " + g + ", " + b + ")";
}

//color flipper
const colors1 = ['green', 'red', 'blue','yellow'];

const btn = document.getElementById('btn');
const btn1 = document.getElementById('btn1');
const color = document.querySelector('.color');
const colorChange = document.querySelector('.colorChange');
const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];

btn.addEventListener('click', () =>{
   const randomNumber = random();
   colorChange.style.backgroundColor = colors1[randomNumber];
   color.textContent = colors1[randomNumber];
})

function random(){
   return Math.floor(Math.random() * colors1.length)
}
btn1.addEventListener('click', () => {
   let hexColor ='#';
   for( let i = 0; i < 6; i++){
      const hexRandom = hexRandomNumber();
      hexColor += hex[hexRandom];
      
   }
   colorChange.style.backgroundColor = hexColor;
   color.textContent = hexColor;
})

function hexRandomNumber(){
   return Math.floor(Math.random() * hex.length);
}

//counter
// let count = 0;

// const decrease = document.getElementById('decrease');
// const reset3 = document.getElementById('reset3');
// const increase = document.getElementById('increase');
// const value = document.getElementById('value');

// decrease.addEventListener('click', () =>{
// value.textContent= --count;
// //value.style.color ="red";
// changeColor();
// });

// reset3.addEventListener('click', ()=>{
// value.textContent = count = 0;
// //value.style.color = 'black';
// changeColor();
// });

// increase.addEventListener('click', () => {
// value.textContent = ++count;
// //value.style.color = "green";
// changeColor();
// });

// function changeColor(){
//    if(count < 0){
//       value.style.color = 'red'
//    }else if(count > 0){
//       value.style.color ='green'
//    }else{
//       value.style.color = "black"
//    }
// }

//Counter option 2
let count = 0;

const btns = document.querySelectorAll('.btn2');
const value = document.getElementById('value');

btns.forEach(function(btn2){
   btn2.addEventListener('click', function(e){
      const styles = e.currentTarget.classList;
      if(styles.contains("decrease1")){
         count--;
      }else if(styles.contains("increase1")){
         count++;
      }else {
         count = 0;
      }
      if(count<0){
         value.style.color = "red"
      }else if(count > 0){
         value.style.color = 'green'
      } else{
         value.style.color = 'black'
      }
      value.textContent = count;
   
   })
})

// Reviews

const reviews =[
   {
      id: 1,
      name: "Susan Smith",
      job: "WEB DEVELOPER",
      img: "images/person-1.jpeg",
      text: "netus et malesuada fames ac turpis egestas sed tempus urna et pharetra pharetra massa massa ultricies mi quis hendrerit dolor"
   },
   {
      id: 2,
      name: "Bob Smith",
      job: "DATA ANALYTICS",
      img: "images/person-2.jpeg",
      text: "netus et malesuada fames ac turpis egestas sed tempus urna et pharetra pharetra massa massa ultricies mi quis hendrerit dolor"
   },
   {
      id: 3,
      name: "Danie Smith",
      job: "ENGINEER",
      img: "images/person-3.jpeg",
      text: "netus et malesuada fames ac turpis egestas sed tempus urna et pharetra pharetra massa massa ultricies mi quis hendrerit dolor"
   },
   {
      id: 4,
      name: "Barb Smith",
      job: "SALES MANAGER",
      img: "images/person-4.jpeg",
      text: "netus et malesuada fames ac turpis egestas sed tempus urna et pharetra pharetra massa massa ultricies mi quis hendrerit dolor"
   }
]

const img = document.getElementById('person-img');
const author = document.getElementById('author');
const job= document.getElementById('job');
const info = document.getElementById('info');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const randomBtn = document.querySelector('.random-btn');

let currentItem = 0; //setting start item at the 1st item in array

//load initial item
window.addEventListener('DOMContentLoaded', function(){
   showPerson();
});

//show person based on item
function showPerson(){
const item = reviews[currentItem];
   img.src = item.img;
   author.textContent = item.name;
   job.textContent = item.job;
   info.textContent = item.text;
}


nextBtn.addEventListener('click', function(){
   currentItem++;
   if (currentItem > reviews.length - 1){
      currentItem = 0;
   }
   showPerson();
})

prevBtn.addEventListener('click', function(){
   currentItem--;
   if (currentItem < 0){
      currentItem = reviews.length - 1;
   }
   showPerson();
})
randomBtn.addEventListener('click',function(){
   currentItem = Math.floor(Math.random() * reviews.length);
   showPerson();
})






































































