const input = document.getElementById("input");
const time = document.getElementById("date");
const block1 = document.getElementById("block1");
const hidden1 = document.getElementById("hidden1");
const content = document.getElementById("content");
task = [];
date = [];

function add(){

    if(input.value && time.value){
            
    task.push(input.value);
    date.push(time.value);

    const div = document.createElement('div');
    const work = document.createElement('p');
    const lastdate = document.createElement('p');
    const del = document.createElement("button");

    div.className = "container";

    work.textContent = `${input.value}`;
    div.appendChild(work);
    work.className = "work";

    lastdate.textContent = `${time.value}`;
    div.appendChild(lastdate);
    lastdate.className = "lastdate";

    del.textContent = "DELETE";
    div.appendChild(del);
    del.className = "delete";

    del.addEventListener('click', () => {
        div.remove();
    });

    input.value = "";
    time.value = "";
    content.insertBefore(div, hidden1);

    }
    else{

        alert("Please input complete information!!!");
        
    }
}