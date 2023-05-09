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

function saveTask(){
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

displayTask(task)

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
<div class ="wholeTask" style = "border-color:${task.color}">
<div class = "taskIcon" style ="font-size:20px; margin-left:7px"> ${getIcon(task.important)}</div>
<div class = "taskDisplay" style ="flex:1">
<h5>${task.title}</h5>
</div>
<div class = "taskDescription style ="flex:2">
<h6>${task.description}</h6>
</div>
<div class = "taskDisplay">
<h6>Budget: $${formatBudget(task.budget)}</h6>
</div>
<div class = "taskDisplay">
<h6>status: ${task.status}</h6>
</div>
<div class = "taskDisplay">
<h6>due date:${task.date}</h6>
</div>
</div>

`
; 

$("#pendingTask").append(syntax);

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





function init(){
    console.log("Task Manager");
    $("#iImportant").click(toggleImportant);
    $("#btnSave").click(saveTask);
    hideTaskForm();


}

window.onload=init; 

