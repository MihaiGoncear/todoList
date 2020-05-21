let inputText = document.getElementById('input-text');
let addButton = document.getElementById('add-button');
let todoList = document.getElementById('todo-list');
let counter = document.getElementById('counter');
let listItem = document.getElementById('todo-list-item');

let myStorage = getTodosFromLocalStorage();
myStorage === null ? myStorage = [] : myStorage;
setTodosToLocalStorage(myStorage);

function getTodosFromLocalStorage() {
    return JSON.parse(localStorage.getItem('todos'));
}

function setTodosToLocalStorage(todos){
    localStorage.setItem('todos', JSON.stringify(todos))
}

addButton.addEventListener('click', addNewTextElement);
todoList.addEventListener('click', listButtons);
inputText.addEventListener('keyup', countInput);

for (let i = 0; i < myStorage.length; i++){
    addNewTextElement(myStorage[i].text, myStorage[i].status)
};

function addNewTextElement(text, status = false) {

    if (!inputText.value && !text) return;

    const newLi = document.createElement('li');
    const newRemoveButton = document.createElement('button');
    const newCheckbox = document.createElement('input');
    const newSpan = document.createElement('span');

    newLi.classList.add('todo-list-item');
    newLi.setAttribute('id', 'todo-list-item')
    newSpan.classList.add('todo-result');

    if(inputText.value){
        newSpan.innerText = inputText.value;
    } else {
        newSpan.innerText = text;
    }

    newRemoveButton.classList.add('remove');
    newRemoveButton.innerText = 'x';
    newRemoveButton.dataset.action = 'remove';

    newCheckbox.classList.add('status');
    newCheckbox.type ='checkbox';
    newCheckbox.dataset.action = 'checked';
    newCheckbox.checked = status;

    console.log(newLi)
    newLi.append(newCheckbox);
    newLi.append(newSpan);
    newLi.append(newRemoveButton);
    
    let myStorage = getTodosFromLocalStorage();
    myStorage.push({
        id: myStorage.length,
        text: inputText.value,
        status: status,
    });
    setTodosToLocalStorage(myStorage);

    inputText.value = '';
    counter.innerText = 'Characters counting: 0' 
    todoList.append(newLi);
}

function setIdByDataset(){
    let dataIdSet = document.getElementsByClassName('todo-list-item');
    Array.from(dataIdSet).forEach(function(ele, i) {
        ele.setAttribute("data-id", (i));
      });
}
setIdByDataset()

function listButtons(event){
    let listDataId = listItem.getAttribute("data-id")
    if(event.target.dataset.action === 'remove'){
        event.target.closest('li').remove();
        for(let i = 0; i <= myStorage.length; i++){
            if(listDataId === myStorage[i].id){
                localStorage.removeItem
            }
        }
    }
    if(event.target.dataset.action === 'checked'){
        event.target.closest('li').classList.toggle('complete')
    }
};

function countInput(){
    let inputNum = inputText.value.length;
    if (inputNum >= 1){
        counter.innerText = 'Characters counting: ' + inputNum;
    } else {
        counter.innerText = `Characters counting: 0`;
    };
};

