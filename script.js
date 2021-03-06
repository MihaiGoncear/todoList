let inputText = document.getElementById('input-text');
let addButton = document.getElementById('add-button');
let todoList = document.getElementById('todo-list');
let counter = document.getElementById('counter');

let myStorage = getTodosFromLocalStorage();
myStorage === null ? myStorage = [] : myStorage;
setTodosToLocalStorage(myStorage);

function getTodosFromLocalStorage() {
    return JSON.parse(localStorage.getItem('todos'));
};

function setTodosToLocalStorage(todos) {
    localStorage.setItem('todos', JSON.stringify(todos))
};

addButton.addEventListener('click', handleAddTodoItem);
todoList.addEventListener('click', handleRemoveAndStatusButton);
inputText.addEventListener('keyup', countInput);

for (let i = 0; i < myStorage.length; i++) {
    renderTodoItem(myStorage[i].text, myStorage[i].status, myStorage[i].id)
};

function handleAddTodoItem() {
    let dateId = new Date();
    if (!inputText.value) return;
    let myStorage = getTodosFromLocalStorage();
    let id = dateId.toISOString();

    myStorage.push({
        id: id,
        text: inputText.value,
        status: false,
    });

    setTodosToLocalStorage(myStorage);
    renderTodoItem(inputText.value, false, id);
    inputText.value = '';
    counter.innerText = 'Characters counting: 0';
}

function renderTodoItem(text, status, id) {

    const newLi = document.createElement('li');
    newLi.classList.add('todo-list-item');
    status ? newLi.classList.toggle('complete') : null

    const newRemoveButton = document.createElement('button');
    newRemoveButton.classList.add('remove');
    newRemoveButton.innerText = 'x';
    newRemoveButton.dataset.action = 'remove';

    const newCheckbox = document.createElement('input');
    newCheckbox.type = 'checkbox';
    newCheckbox.setAttribute('data-action', 'checked');
    newCheckbox.checked = status;

    const newSpan = document.createElement('span');
    newSpan.classList.add('todo-result');
    newSpan.innerText = text;

    todoList.append(newLi);

    newLi.append(newCheckbox);
    newLi.append(newSpan);
    newLi.append(newRemoveButton);
    newLi.setAttribute('data-todoid', id);
}

function handleRemoveAndStatusButton(event) {
    let button = event.target.getAttribute('data-action');
    let myStorage = getTodosFromLocalStorage();
    const itemId = event.target.closest('li').dataset.todoid;

    if (button === 'remove') {
       removeButton(itemId, myStorage);
       event.target.closest('li').remove();
    }
    if (button === 'checked'){
        statusButton(itemId, myStorage)
        event.target.closest('li').classList.toggle('complete');
    }
}

function removeButton(itemId, myStorage){
    let newStorageArray = [];
    for (let i = 0; i < myStorage.length; i++) {
        if (itemId !== myStorage[i].id) {
            newStorageArray.push(myStorage[i]);
        }
    }
    setTodosToLocalStorage(newStorageArray);
    
};

function statusButton(itemId, myStorage) {
    let newStorageArray = [];
    for (let i = 0; i < myStorage.length; i++) {
        if (itemId === myStorage[i].id) {
            myStorage[i].status = !myStorage[i].status;
        }
        newStorageArray.push(myStorage[i]);
    }
    setTodosToLocalStorage(newStorageArray);      
};

function countInput() {
    let inputNum = inputText.value.length;
    if (inputNum >= 1) {
        counter.innerText = 'Characters counting: ' + inputNum;
    } else {
        counter.innerText = `Characters counting: 0`;
    };
};

