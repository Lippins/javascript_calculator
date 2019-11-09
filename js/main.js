const numbers = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".symbols");
const clear = document.querySelector(".clear");
const result = document.querySelector(".result");
const displayScreen = document.querySelector("#display_Screen");
const backspace = document.querySelector(".backspace");
let resultInDisplay = false;

const keybindings = [
    {calculator_options: "numbers", key: "num_keys"},
    {calculator_options: "decimal", key: "."},
    {calculator_options: "add", key: "+"},
    {calculator_options: "substract", key: "-"},
    {calculator_options: "divide", key: "/"},
    {calculator_options: "multiply", key: "*"},
    {calculator_options: "clear", key: "c"},
    {calculator_options: "delete", key: "delete_key"},
    {calculator_options: "square_root", key: "r"},
    {calculator_options: "to_powerOf", key: "^"},
    {calculator_options: "result", key: "enter_key"}
];


clear.addEventListener("click",()=>{
   displayScreen.innerHTML = "";
   resultInDisplay = false;
})

backspace.addEventListener("click", ()=>{
    displayScreen.innerHTML = displayScreen.innerHTML.slice(0, displayScreen.innerHTML.length -1);
})

numbers.forEach(number =>{
    number.addEventListener("click", () =>{
        if(displayScreen.innerHTML.length < 14){
            if (resultInDisplay === false){
            displayScreen.innerHTML += number.innerHTML;
            } else if (resultInDisplay === true && (displayScreen.innerHTML.slice(-1) == "÷" ||
            displayScreen.innerHTML.slice(-1) == "-" ||
            displayScreen.innerHTML.slice(-1) == "×" ||
            displayScreen.innerHTML.slice(-1) == "+" ||
            displayScreen.innerHTML.slice(-1) == "^" ||
            displayScreen.innerHTML.slice(-1) == "√" )){
                displayScreen.innerHTML += number.innerHTML;
                resultInDisplay = false;

            } else if(displayScreen.innerHTML == "Syntax ERROR"){
                displayScreen.innerHTML ="";
                resultInDisplay = false;
                displayScreen.innerHTML += number.innerHTML;

            } else{
                displayScreen.innerHTML ="";
                resultInDisplay = false;
                displayScreen.innerHTML += number.innerHTML;
            }
        }
    })
})

operators.forEach(operator =>{
    operator.addEventListener("click", ()=>{
       if (displayScreen.innerHTML.length >= 1){     //if there is no digit don't initialise an operator
            if (displayScreen.innerHTML.slice(-1) == "÷" || //eliminate consecutive operators
            displayScreen.innerHTML.slice(-1) == "-" ||
            displayScreen.innerHTML.slice(-1) == "×" ||
            displayScreen.innerHTML.slice(-1) == "+" ||
            displayScreen.innerHTML.slice(-1) == "^" ||
            displayScreen.innerHTML.slice(-1) == "√" ){
                displayScreen.innerHTML = displayScreen.innerHTML.substring(0, displayScreen.innerHTML.length -1) + operator.innerHTML;
                resultInDisplay = false;

            } else if(displayScreen.innerHTML == "Syntax ERROR"){
                displayScreen.innerHTML ="";
                resultInDisplay = false;
                displayScreen.innerHTML += operator.innerHTML;

            } else{
                displayScreen.innerHTML+= operator.innerHTML;
            }
        }
    })
})

result.addEventListener("click", ()=>{
    let expression = displayScreen.innerHTML;
    let expressionNumbers = expression.split(/\+|\-|\×|\÷|\^|\√/g);
    let expressionOperators = expression.replace(/[0-9]|\./g, "").split("");

    let power = expressionOperators.indexOf("^");
    for (power; power != -1; power = expressionOperators.indexOf("^")){
        expressionNumbers.splice(power, 2, Math.pow(expressionNumbers[power],expressionNumbers[power + 1]));
        expressionOperators.splice(power, 1);
    }

    let sqRoot = expressionOperators.indexOf("√");
    for (sqRoot; sqRoot != -1; sqRoot = expressionOperators.indexOf("√")){
        expressionNumbers.splice(sqRoot +1 , 1, Math.sqrt(expressionNumbers[sqRoot+1]));
        expressionOperators.splice(sqRoot, 1, "×");
    }

    let divide = expressionOperators.indexOf("÷");
    for(divide; divide != -1 ; divide = expressionOperators.indexOf("÷")){
        expressionNumbers.splice(divide, 2, expressionNumbers[divide] /expressionNumbers[divide +1 ]);
        expressionOperators.splice(divide, 1);
    }

    let times = expressionOperators.indexOf("×");
    for(times; times != -1; times = expressionOperators.indexOf("×")){
        expressionNumbers.splice(times, 2, expressionNumbers[times] * expressionNumbers[times + 1]);
        expressionOperators.splice(times, 1);
    }

    let plus = expressionOperators.indexOf("+");
    for (plus; plus != -1 ; plus = expressionOperators.indexOf("+")){
        expressionNumbers.splice(plus, 2, parseFloat(expressionNumbers[plus]) + parseFloat(expressionNumbers[plus + 1]));
        expressionOperators.splice(plus, 1);
    }

    let minus = expressionOperators.indexOf("-");
    for (minus; minus != -1; minus = expressionOperators.indexOf("-")){
        expressionNumbers.splice(minus, 2, expressionNumbers[minus]- expressionNumbers[minus + 1]);
        expressionOperators.splice(minus, 1);
    }

    displayScreen.innerHTML = expressionNumbers[0];
    if (isNaN(displayScreen.innerHTML)) displayScreen.innerHTML = "Syntax ERROR";

    if (displayScreen.innerHTML.length > 12 && displayScreen.innerHTML.indexOf(".") > 0){
        displayScreen.innerHTML = displayScreen.innerHTML.substring(0, 9);
    } else if (displayScreen.innerHTML.length > 12 && displayScreen.innerHTML.indexOf(".") < 0){
        displayScreen.innerHTML = "Out Of Range!";
    }

    resultInDisplay = true;
})

document.addEventListener("keypress", function(e){ //keyboard button bindings
    let keycode = e.which || e.keycode;
    let valueEntered = String.fromCharCode(keycode);
    console.log(valueEntered,keycode);
    if (valueEntered == "1") document.getElementById("1").click();
    if (valueEntered == "2") document.getElementById("2").click();
    if (valueEntered == "3") document.getElementById("3").click();
    if (valueEntered == "4") document.getElementById("4").click();
    if (valueEntered == "5") document.getElementById("5").click();
    if (valueEntered == "6") document.getElementById("6").click();
    if (valueEntered == "7") document.getElementById("7").click();
    if (valueEntered == "8") document.getElementById("8").click();
    if (valueEntered == "9") document.getElementById("9").click();
    if (valueEntered == "0") document.getElementById("0").click();
    if (valueEntered == "+") document.getElementById("plus").click();
    if (valueEntered == "-") document.getElementById("minus").click();
    if (valueEntered == "*") document.getElementById("times").click();
    if (valueEntered == "/") document.getElementById("divide").click();
    if (valueEntered == "^") document.getElementById("power").click();
    if (valueEntered == ".") document.getElementById("dot").click();
    if (keycode == "13") document.getElementById("result").click();
    if (keycode == "127") document.getElementById("del").click();
    if (keycode == "99") document.getElementById("clr").click();
    if (keycode == "114") document.getElementById("root").click();
})

console.table(keybindings);
