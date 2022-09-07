// select element from html
const inputTask = document.querySelector('.input-new-task');
const btnAddTask = document.querySelector('.btn-add-task');
const tasks = document.querySelector('.tasks');

function toSaveTask(){
    const liTask = tasks.querySelectorAll('li');
    const listTasks = [];
    
   for (let task of liTask) {
        let textTask = task.innerText;
        console.log(textTask);
        textTask = textTask.replace('Delete','').trim();
        listTasks.push(textTask);
        console.log(textTask);
    }
    const taskJSON = JSON.stringify(listTasks);
    localStorage.setItem('tasks', taskJSON);
}

function createButton(li){
    li.innerText += ' ';
    const btnClean = document.createElement('button');
    btnClean.innerText = 'Delete';
    btnClean.setAttribute('class','clear');
    li.appendChild(btnClean);
}

function cleanImput(){
    inputTask.value = '';
    inputTask.focus();
}

function createHtml(){
   const li = document.createElement('li');
   return li; 
};

function insertHtml(html){
    tasks.appendChild(html);
};

function createTask(task){
    const li = createHtml();
    li.innerHTML = task;
    insertHtml(li);
    createButton(li);
    cleanImput();
    toSaveTask();
};

function addTaskSave(){
    const oldTasks = localStorage.getItem('tasks');
    const listOldTasks = JSON.parse(oldTasks);

    for (const task of listOldTasks) {
        createTask(task);
    }
}

inputTask.addEventListener('keypress', (event)=>{
    if(event.keyCode === 13){
        createTask(inputTask.value);
    }
});

btnAddTask.addEventListener('click',()=>{
    if(!inputTask.value) return; 
    createTask(inputTask.value);
});

document.addEventListener('click',(event)=>{
    const element = event.target;
    if(element.classList.contains('clear')){
        element.parentElement.remove();
        toSaveTask();
    }
});

addTaskSave();

