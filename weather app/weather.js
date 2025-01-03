const input = document.getElementById("input");
const city = document.getElementById("city");
const temp = document.getElementById("temp");
const humidity = document.getElementById("humidity");
const emoji = document.getElementById("emoji");
const type = document.getElementById("type");
const apikey = "659f8a7095d3890bf5ffb72b9bdc1e55";
const button = document.getElementById("button");

button.addEventListener("click", (event) => {
  city.textContent = input.value;
  weather(input.value);
});



async function weather(city){
const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`);
if(!response.ok){
    console.error("error");
}
else{
   const data = await response.json();
   console.log(data);
}
}
function weaemoji(){

} 