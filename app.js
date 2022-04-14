// The box the user sees their numbers entered in
const dialogueBox = document.getElementById("dialoguebox");
// The number, operator and clear buttons
const calculatorButtons = document.querySelectorAll(".calc-button")
// The unordered list element for storing past calculations
const historyElem = document.getElementById("history-elem");

// Text to display on the screen
let display = "0";
// Has the user entered an operator?
let operatorPressed = false;
// Has the user entered another number after an operator?
let multipleInput = false;
// Can the user press equals?
let validCalculation = false;
// Has the user pressed equals?
let equalsPressed = false;
// The result to store in history
let result = 0;

function parseInput(buttonPressedID) {
    // Stores Element ID of the event as a string
    let buttonPressed = buttonPressedID.currentTarget.id.toString();
    // Calculators reset when pressing equals
    if (equalsPressed == true) {
        clear();
    }
    // Switch based on Element ID of event
    switch (buttonPressed) {
        case ("button-zero"): pressZero(); break;
        case ("button-one"): pressNumber("1"); break;
        case ("button-two"): pressNumber("2"); break;
        case ("button-three"): pressNumber("3"); break;
        case ("button-four"): pressNumber("4"); break;
        case ("button-five"): pressNumber("5"); break;
        case ("button-six"): pressNumber("6"); break;
        case ("button-seven"): pressNumber("7"); break;
        case ("button-eight"): pressNumber("8"); break;
        case ("button-nine"): pressNumber("9"); break;
        case ("button-add"): pressOperator("add"); break;
        case ("button-subtract"): pressOperator("subtract"); break;
        case ("button-multiply"): pressOperator("multiply"); break;
        case ("button-divide"): pressOperator("divide"); break;
        case ("button-clear"): clear(); break;
        case ("button-history-clear"): clearHistory(); break;
        case ("button-equals"): equals(); break;
        default: console.log("Didn't match any");
    }
}

function pressZero() {
    // If to prevent adding infinite 0s at the start
    if (Number(display) != 0) {
        display += "0";
    }
    // Allow equals to be pressed
    if (multipleInput == true) {
        validCalculation = true;
    }
    // Allows another operator to be added
    operatorPressed = false;
    // Update the display
    dialogueBox.textContent = display;
}

function pressNumber(digit) {
    // Calculators replace 0 with the first number
    if (display != "0") {
        display += digit;
    }
    else {
        display = digit;
    }
    // Allow equals to be pressed
    if (multipleInput == true) {
        validCalculation = true;
    }
    // Allows another operator to be added
    operatorPressed = false;
    // Update the display
    dialogueBox.textContent = display;
}

function pressOperator(operatorChoice) {
    // Check to prevent adding multiple operators in a row
    if (operatorPressed != true) {
        // Adds the symbol to be used in the calculation
        if (operatorChoice == "add") {
            display += " + "
        }
        if (operatorChoice == "subtract") {
            display += " - "
        }
        if (operatorChoice == "multiply") {
            display += " * "
        }
        if (operatorChoice == "divide") {
            display += " / "
        }
        // Has the user entered an operator?
        operatorPressed = true;
        // Additional operator means no longer valid calculation
        validCalculation = false;
        // Allows equals to be activated when another number is entered
        multipleInput = true;
        // Update the display
        dialogueBox.textContent = display;
    }
}

function clear() {
    // Reset all variables
    display = "0";
    result = 0;
    multipleInput = false;
    equalsPressed = false;
    operatorPressed = false;
    validCalculation = false;
    // Update the display
    dialogueBox.textContent = display;
}

function clearHistory() {
    // Clear the history element of children
    while (historyElem.firstChild) {
        historyElem.removeChild(historyElem.firstChild);
    }
}

function equals() {
    // Checks for a number either side of the operator
    if (validCalculation == true) {
        // If user enters a new number, display resets
        equalsPressed = true;
        // Eval parses a string as code
        result = eval(display);
        // History format: X + X = Y
        display += " = " + result.toString();
        // Calculators don't display the whole calculation
        dialogueBox.textContent = result.toString();
        // But our history will
        save(display);
    }
}

function save(result) {
    // Save the calculation string to history list
    const node = document.createElement("li");
    const textNode = document.createTextNode(result);
    node.appendChild(textNode);
    historyElem.appendChild(node);
}

// Event listeners pass the event to our parseInput function
calculatorButtons.forEach(buttonElement => {buttonElement.addEventListener("click", parseInput)});
