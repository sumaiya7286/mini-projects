let addbtn = document.querySelector("#add")
let text = document.querySelector("#input-box")
let lists = document.querySelector("#list")

let tasks = JSON.parse(localStorage.getItem("tasks")) || []

function addTask(){
   if(text.value.trim() === "") return

     let noTask = document.getElementById("no-task");
    if (noTask) noTask.remove();

    
    let task = text.value.trim()
    tasks.push(task)

    localStorage.setItem("tasks", JSON.stringify(tasks));

     createTaskElement(task);

      text.value = ""

}

function createTaskElement(task){
    
    let li = document.createElement('li')

    let taskText = document.createElement('span');
    let delBtn = document.createElement('button')
    let editBtn = document.createElement('button')

    taskText.textContent = task;

   delBtn.classList.add("delete-btn");
   editBtn.classList.add("edit-btn");

    delBtn.textContent = "Delete";
    editBtn.textContent = "Edit";

li.append(taskText, editBtn, delBtn);

   lists.append(li)

    delBtn.addEventListener('click',()=>{
    li.remove()

     tasks = tasks.filter(t => t !== task);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    if(lists.children.length === 0){
          let noTask = document.createElement('li');
        noTask.id = "no-task";
        noTask.textContent = "No task found";

        lists.append(noTask);
    }
    })

    editBtn.addEventListener('click',()=>{
        //
    })
    
}

function loadTasks() {

    if (tasks.length === 0) {
        let noTask = document.createElement("li");
        noTask.id = "no-task";
         noTask.textContent = "No task found";
        lists.append(noTask);
        return;
    }

    tasks.forEach(task => {
        createTaskElement(task);
    });
}

addbtn.addEventListener('click',()=>{
addTask()
})

loadTasks()
