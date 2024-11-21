const watch = document.getElementById("para");
let timer = null;
let start = 0;
let elasped = 0;
let running = false;

function start1(){
if(!running){
    start = Date.now() - elasped;
    timer = setInterval(update, 10);
    running = true;
}
}
function stop1(){
if(running){
    clearInterval(timer);
    running = false;

}
}
function reset(){
clearInterval(timer);
running = false;
elasped = 0;
watch.textContent = `00:00:00:00`;
}
function update(){
    let current = Date.now();
    elasped = current - start;
    let hour = Math.floor(elasped / (1000 * 60 * 60));
    let minute =Math.floor( elasped / (1000 * 60) % 60);
    let second = Math.floor(elasped / (1000) % 60);
    let mili = Math.floor(elasped % 1000 /10); 

    hour = String(hour).padStart(2, 0);
    minute = String(minute).padStart(2, 0);
    second = String(second).padStart(2, 0);
    mili = String(mili).padStart(2, 0);
  
    watch.textContent = `${hour}:${minute}:${second}:${mili}`;

}