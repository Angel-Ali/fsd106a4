important = true;
formVisible = true;
serverUrl = "https://fsdiapi.azurewebsites.net/";
allMyTasks = [];

//when you click on the star it will console log hola!!
function toggleImportant(){
  console.log("hola!!") 

  if (important) {
    $("iImportant").removeClass("fas").addClass("far");
    important = false;
  } else{
    $("iImportant").removeClass("far").addClass("fas");
    important = true;
  }
}




// when you press the save button
function save() {
    console.log("Saved it!");
 
  let title =$('#txtTitle').val();
  let date =$('#selDate').val();
  let location =$('#txtLocation').val();
  let priority =$('#selPriority').val();
  let color =$('#selColor').val();
  let contact =$('#txtContact').val();
  let description =$('#txtDescription').val();
 

//create a new task object
  let task = new Task(title,important, date, location, priority, color, contact, description);
  $.ajax({
    type:"POST",
    url: serverUrl + "api/tasks/",
    data: JSON.stringify(task), //from object to string ..send to server
    contentType: "application/json",

    success: function(res){
console.log("Server says", res);
   
let t = JSON.parse(res); //from string to obj ..response from server
    displayTask(t);


   },  
   error: function (error) {
console.error("Error saving", error);
    },
  });

 }
  



 function displayTask(task) { 
let iClass ="";
if(task.important){
  iClass = "fas fa-star";
}
else {
  iClass = "far fa-star";
}

let btn = "";
if (!task.done){ //if not done
  btn = `<button onClick="doneTask('${task._id}')" class="btn btn-danger">Done</button>`;
  
}


  let syntax = `<div id="${task._id}"} class="task" style="border: 2px solid ${task.color}">
  <i class="${iClass}" style="color: ${task.color}"></i>
  <i class="${iClass}"></i>
  <div class="info">
    <h4>${task.title}</h4>
    <p>description:<br>${task.description}</p>
  </div>
  <label>location:<br>${task.location}</label><br>
  <label>phone:<br>${task.contactP}</label><br>
  <label>${task.priority}</label>
  <label>due:<br>${task.dueDate}</label>
  ${btn}
  </div>`;

  
//$(".pending-tasks").append(syntax);
if(task.done) {
   $(".done-tasks").append(syntax);
} else {
   $(".pending-tasks").append(syntax);
  }
 }

 
function doneTask(id) {
  console.log("Mark as done:", id);
  $("#" + id).remove();

//find the object  with that id
for(let i=0; i< allMyTasks.length; i++){
  let task = allMyTasks[i];
  console.log("found it", task);

  task.done = true;

//send the tasks on a PUT request to url: server + "api/task"
  $.ajax({
    type: "PUT",
    url: serverUrl + "api/tasks",
    data: JSON.stringify(task),
    contentType: "application/json",
    success: function(res){
      displayTask(task);
    },
    error: function(err){
      console.error("error updating tasks", err);
    }
  })
  }
}












  function fetchTasks(){
    $.ajax({
      type: "GET",
      url: serverUrl + "api/tasks",
      success: function (res) {
        let allTasks = JSON.parse(res);
        console.log(allTasks);
        //travel the array
       for(let i=0; i < allTasks.length; i++){
          let task = allTasks[i];
          if(task.name === "angel") {       //name is in taskjs
           allMyTasks.push(task);
            displayTask(task);
       }
     }
   },
      error: function(error){
        console.error("Error getting data", error);
      },
    });
  }

  function toggleForm(){
    if(formVisible) {
      formVisible = false;

$("#btnToggle").text("Show Details");
} else {
  formVisible = true;
  $("btnToggle").text("Hide Details");
}

$(".section-form").toggle(300);
  }

function clearAll() {
  $.ajax({
    type: "DELETE",
    url: serverUrl +"api/tasks/clear/angel",
    success: function(res) {
      console.errorlog(res);
      alert("YTour Tasks were cleared!");
    },
    error: function(err) {
      console.error("Error clearing tasks", err);
    }
  });
}



function init() {
    console.log("Calendar System");
   
    //load data
    fetchTasks();



    //hook events
$("#iImportant").click(toggleImportant);
$("#btnSave").click(save);
$("#btnToggle").click(toggleForm);

//when user clicks on star
}

window.onload = init;

