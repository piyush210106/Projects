const display = document.getElementById("display");

function append(input){
display.value += input;
}

function calc(){
    try{
        display.value = eval(display.value);
    }
    catch{
        display.value = "ERROR";
    }
}
function clear1(){
display.value = "";
}