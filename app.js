// Define UI Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


// load all event listners
loadEventListeners();

// load all event listeners
function loadEventListeners() {
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks)
    // add task event
    form.addEventListener('submit', addTask)
    // remove task event
    taskList.addEventListener('click', removeTask);
    // clear task event
    clearBtn.addEventListener('click', clearTask);
    // filter task event
    filter.addEventListener('keyup', filterTask)
}

// get task from ls
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = []
    }
    else {
        tasks =  JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(
        function(task){
            const li = document.createElement('li');
            // add class
            li.className = 'collection-item'
            // create text node and append to li
            li.appendChild(document.createTextNode(task));
            // create new link
            const link = document.createElement('a');
            // add class
            link.className = 'delete-item secondary-content';
            // add icon html
            link.innerHTML = '<i class = "fa fa-remove"</i>';
            // append the link to li
            li.appendChild(link);

            // append li to ul
            taskList.appendChild(li);
        }
    )
}

// filter task
function filterTask(e){
    const text = e.target.value.toLowerCase();
    
    document.querySelectorAll('.collection-item').forEach(
        function(task) {
            const item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text) != -1) {
                task.style.display = 'block'
            }
            else {
                task.style.display = 'none'
            }
        }
    );
}

// clear task
function clearTask(e) {
   // taskList.innerHTML = '';

    // faster
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    // clear from ls
    clearTaskFromLocaStorage();
}

// clear from ls
function clearTaskFromLocaStorage(){
    localStorage.clear();
}
// revome task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();

            // remove from ls
            removeTaskFromLocalStorage(e.target.parentElement.parentElement)
        }
        
    }
}

// remove from ls
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = []
    }
    else {
        tasks =  JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(
        function(task, index){
            if(taskItem.textContent === task){
                tasks.splice(index, 1);
            }
        }
    )

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// add task
function addTask(e) {
    if(taskInput.value === '') {
        alert('Add a task');
    }
    else{
        // create li element
        const li = document.createElement('li');
        // add class
        li.className = 'collection-item'
        // create text node and append to li
        li.appendChild(document.createTextNode(taskInput.value));
        // create new link
        const link = document.createElement('a');
        // add class
        link.className = 'delete-item secondary-content';
        // add icon html
        link.innerHTML = '<i class = "fa fa-remove"</i>';
        // append the link to li
        li.appendChild(link);

        // append li to ul
        taskList.appendChild(li);

        // store task in local storage
        storeTaskInLocalStorage(taskInput.value);

        // clear input value
        taskInput.value = '';
    }

    e.preventDefault(); // prevent default behavior i.e form submit
}
 
// store task in LS
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = []
    }
    else {
        tasks =  JSON.parse(localStorage.getItem('tasks'))
    }
    
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks))
}