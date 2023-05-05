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

    hideTaskForm();


}

window.onload=init; 

