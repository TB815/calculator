let firstOperand = "";
let secondOperand = "";
let currentOperation = null;
let shouldReset = false;

const numberBtns = document.querySelectorAll("[dataNumber]");
const operatorBtns = document.querySelectorAll("[operationData]");
const equalBtn = document.getElementById("equalsBtn");
const clearBtn = document.getElementById("clearBtn");
const deleteBtn = document.getElementById("deleteBtn");
const decimalBtn = document.getElementById("decimalBtn");
const prevOperationScreen = document.getElementById("prevOperationScreen");
const currentOperationScreen = document.getElementById(
  "currentOperationScreen"
);

// --------------- FUNCTIONS ------------------------
const evaluate = () => {
  if (currentOperation === null || shouldReset) return;
  if (currentOperation === "÷" && currentOperationScreen.textContent === "0") {
    alert("Cannot divide by 0!");
    return;
  }

  secondOperand = currentOperationScreen.textContent;
  currentOperationScreen.textContent = roundNum(
    operate(currentOperation, firstOperand, secondOperand)
  );
  prevOperationScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`;
  currentOperation = null;
};

const clear = () => {
  currentOperationScreen.textContent = "0";
  prevOperationScreen.textContent = "";
  firstOperand = "";
  secondOperand = "";
  currentOperation = null;
};

const deleteNum = () => {
  //   if (currentOperationScreen.textContent !== "") return;
  currentOperationScreen.textContent = currentOperationScreen.textContent
    .toString()
    .slice(0, -1);
};

const appendDecimal = () => {
  if (shouldReset) resetScreen();

  if (currentOperationScreen.textContent === "") {
    currentOperationScreen.textContent = "0";
  }

  if (currentOperationScreen.textContent.includes(".")) return;
  currentOperationScreen.textContent += ".";
};

equalBtn.addEventListener("click", evaluate);
clearBtn.addEventListener("click", clear);
deleteBtn.addEventListener("click", deleteNum);
decimalBtn.addEventListener("click", appendDecimal);

const appendNumber = (number) => {
  if (currentOperationScreen.textContent === "0" || shouldReset) {
    resetScreen();
  }

  currentOperationScreen.textContent += number;
};

const setOperation = (operator) => {
  if (currentOperation !== null) evaluate();

  firstOperand = currentOperationScreen.textContent;
  currentOperation = operator;
  prevOperationScreen.textContent = `${firstOperand} ${currentOperation}`;
  shouldReset = true;
};

const resetScreen = () => {
  currentOperationScreen.textContent = "";
  shouldReset = false;
};

const roundNum = (num) => {
  return Math.round(num * 1000) / 1000;
};

// ------------ EVENT LISTENERS FOR BUTTONS ------------
numberBtns.forEach((button) =>
  button.addEventListener("click", () => appendNumber(button.textContent))
);

operatorBtns.forEach((button) =>
  button.addEventListener("click", () => setOperation(button.textContent))
);

// ------------ BASIC MATH FUNCTIONS ----------------

const add = (a, b) => {
  return a + b;
};

const subtract = (a, b) => {
  return a - b;
};

const divide = (a, b) => {
  return a / b;
};

const multiply = (a, b) => {
  return a * b;
};

// ------------ OPERATE ------------------------

const operate = (operator, a, b) => {
  a = Number(a);
  b = Number(b);

  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "÷":
      if (b === 0) return null;
      return divide(a, b);
    default:
      return null;
  }
};
