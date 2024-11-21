function clock(){
    const now = new Date();
    const hour = now.getHours().toString().padStart(2,0);
    const minute = now.getMinutes().toString().padStart(2,0);
    const second = now.getSeconds().toString().padStart(2,0);
    document.getElementById("clock").textContent = `${hour}:${minute}:${second}`;
}
clock();
setInterval(clock, 1000);