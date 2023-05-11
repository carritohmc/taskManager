let isImportant=false;
let hidden=false;

function toggleImportant(){
    const iconImportant="fa-solid fa-fire icon-important";
    const iconNotImportant="fa-solid fa-circle-radiation";
    
    if (isImportant) {

        $("#iImportant").removeClass(iconImportant).addClass(iconNotImportant);
        isImportant=false;
        
    } else {
    
        $("#iImportant").removeClass(iconNotImportant).addClass(iconImportant);
        isImportant=true;
    }
    
}

async function saveTask(){
const title= $("#txtTitle").val();
const description= $("#txtDescription").val();
const budget= $("#txtBudget").val();
const status= $("#selStatus").val();
const color= $("#txtColor").val();
const date= $("#selDate").val();

let isValid=true;

if (!title || !description || !date) {
    isValid=false;
    $("#panelError").show(500);

    setTimeout(()=>$("#panelError").hide(500),6000);
}

if (!isValid) return;

let task= new Task (isImportant, title, description,budget, status, color, date);
// save to server
let response= await fetch("https://fsdiapi.azurewebsites.net/api/tasks/", {
    method: "POST",
    headers: {
        "Content-type":"application/json"
    },
    body: JSON.stringify(task),
})


if(response.status===200) {
    console.log(await response.json());
    displayTask(task)
} else {
    alert("Error: task was not saved");
    console.error(await response.json());
}

}

function displayAlert(){


}


function formatBudget(budget) {

    if(budget== "") {
        return "0.00"
    }
    else {
        return parseFloat(budget).toFixed(2);
    }

}

function displayTask(task) {
const syntax = `
<div id =${task._id} class ="wholeTask" style = "border-color:${task.color}">
<div  class = "taskIcon" style ="font-size:20px; margin-left:7px"> ${getIcon(task.important)}</div>
<div class = "taskDisplay" style ="flex:1">
<h5>${task.title}</h5>
</div>
<div  class = "taskDescription style ="flex:2">
<h6>${task.description}</h6>
</div>
<div  class = "taskDisplay">
<h6>Budget: $${formatBudget(task.budget)}</h6>
</div>
<div  class = "taskDisplay">
<h6>status: ${task.status}</h6>
</div>
<div  class = "taskDisplay">
<h6>due date:${task.date}</h6>
</div>
<i onclick="deleteTask('${task._id}')"class="fa-regular fa-trash-can"></i>

</div>

`
; 

$("#pendingTask").append(syntax);

}

async function deleteTask(id){
    console.log(id);
    const response= await fetch(`https://fsdiapi.azurewebsites.net/api/tasks/${id}/`, {
        method:"DELETE"
    });
    if (response.ok) {
        console.log("deleted");
        $("#"+id).remove();
    } else {
        alert("Error: Task was not deleted")
    }

}


function getIcon(important) {
    if (important){
        return "<i class='fa-solid fa-fire icon-important'> </i>";
    } else {
        return "<i class= 'fa-solid fa-circle-radiation'></i>"
    }
}

function hideTaskForm(){
$('#btnAddNew').click(function(){

    if (hidden==false) {
        console.log("first function");
        $('#form').hide(1000);
        hidden=true;
    } else {
        hidden=false;
        $('#form').show(1000);
        console.log("second function")
    }
    console.log(hidden)
})
}

async function loadTasks(){

    const response= await fetch("https://fsdiapi.azurewebsites.net/api/tasks/");
    if (response.ok) {
        const allTasks= await response.json();
        for (let i=0; i<allTasks.length; i++){
             const task = allTasks[i];
             if (task.name=="Felix") {

                 displayTask(task);
             }
        }
    } else {
        alert("Error: tasks were not loaded");
    } 
    
    
}


async function testRequest(){

    const response= await fetch("https://fsdiapi.azurewebsites.net/");

}



function init(){
    console.log("Task Manager");
    $("#iImportant").click(toggleImportant);
    $("#btnSave").click(saveTask);
    hideTaskForm();
    //load task function
    loadTasks();

}

window.onload=init; 

// https://fsdiapi.azurewebsites.net/