// init
const todoList = document.querySelector('#todo')
const doneList = document.querySelector('#done')
const addBtn = document.querySelector('#addBtn')
const clearBtn = document.querySelector('#deleteBtn')
const inputItem = document.querySelector('#newTodo')
const todoCount = document.querySelector('#todo_cnt')
const doneCount = document.querySelector('#done_cnt')
const todos = ['Hit the gym', 'Read a book', 'Buy eggs', 'Organize office', 'Pay bills']
const dones = []
renderTodo();
renderDones();

// ----- function -----
//1. renderView 
function renderTodo() {
  todoList.innerHTML = "";
  if (todos.length > 0) {
    todos.forEach(item => {
      let newItem = document.createElement('li')
      newItem.innerHTML = `<label for="todo">${item}</label>
      <i class="delete fa fa-trash"></i>`
      todoList.appendChild(newItem)
    })
  }
  todoCount.innerHTML = todos.length
}
function renderDones() {
  doneList.innerHTML = "";
  if (dones.length > 0) {
    dones.forEach(item => {
      let newItem = document.createElement('li')
      newItem.innerHTML = `
      <label for="todo">${item}</label>
      <i class="undo fa fa-undo"></i>
    `
      newItem.classList.toggle('checked')
      doneList.appendChild(newItem)
    })
  }
  doneCount.innerHTML = dones.length

}

//2. Data control
function addData() {
  let input = inputItem.value.trim();
  if (!todos.includes(input)) {
    todos.push(input)
  }
  inputItem.value = ""
  renderTodo();
}
function clearData() {
  todos.splice(0, todos.length);
  renderTodo();
}
function deleteData(item, list) {
  let index = list.indexOf(item)
  if (index != -1) {
    list.splice(index, 1)
  }
}
function doneData(item) {
  deleteData(item, todos)
  dones.push(item)
  //console.log(dones)
}
function undoData(item) {
  deleteData(item, dones)
  todos.push(item)
}

//3. Program control
function todosDoing(event) {
  if (event.target.classList.contains('delete')) {
    let li = event.target.parentElement
    let text = li.querySelector('label').textContent
    deleteData(text, todos)
  }
  else if (event.target.tagName === "LABEL") {
    let text = event.target.textContent
    doneData(text)
  }
  renderTodo();
  renderDones();
}
function doneDoing(event) {
  if (event.target.tagName === "LABEL") {
    let text = event.target.textContent
    deleteData(text, dones)
  } else if (event.target.classList.contains('undo')) {
    let li = event.target.parentElement
    let text = li.querySelector('label').textContent
    undoData(text);
  }
  renderTodo();
  renderDones();
}

// ----- Event listener ----- 
addBtn.addEventListener('click', addData)
clearBtn.addEventListener('click', clearData)
todoList.addEventListener('click', todosDoing)
doneList.addEventListener('click', doneDoing)

//keyup:avoid the long click at enter
document.addEventListener('keyup', function (event) {
  let inputItem = document.querySelector('#newTodo').value
  if (event.keyCode === 13) {
    addItem(inputItem)
    document.querySelector('#newTodo').value = "";
  }

})