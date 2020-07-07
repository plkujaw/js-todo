// ****** SELECT ITEMS **********
const alert = document.querySelector(".alert");
const todoInputForm = document.querySelector(".todo-form");
const todoItemInput = document.getElementById("todo");
const submitBtn = document.querySelector(".submit-btn");
const todoContainer = document.querySelector(".todo-container");
const todoList = document.querySelector(".todo-list");
const clearBtn = document.querySelector(".clear-btn");

// edit option
let editItem;
let editFlag = false; // by default we are not editing
let editId = "";


// ****** FUNCTIONS **********
// define functions with fat arrow BEFORE using them

// display appropriate alert
displayAlert = (text, action) => { // action corresponding to css class
  alert.textContent = `${text}`;
  alert.classList.add(`alert-${action}`);
  // remove alert
  setTimeout(function() {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 2000);
}

// set back to default
setBackToDefault = () => {
  todoItemInput.value = "";
  editFlag = false;
  editId = "";
  submitBtn.textContent = "submit";
}

// clear all items
clearItems = () => {
  const todoItems = todoList.querySelectorAll(".todo-item");

  if (todoItems.length > 0) {
    todoItems.forEach((item) => {
      todoList.removeChild(item);
    });
  }
  todoContainer.classList.remove("show-container");
  displayAlert("list cleared", "danger");
  setBackToDefault();
  // localStorage.removeItem("list");
}

// delete item
deleteItem = () => {
  console.log("item deleted");
}

// edit item
editItem = () => {
  console.log("edit item");
}

// ****** LOCAL STORAGE FUNCTIONS **********
addToLocalStorage = (id, item) => {
  console.log('added to local storage');
}


// ****** APP FUNCTIONALITY **********
// add item to the list
addItem = (event) => {
  event.preventDefault();
  const todoItem = todoItemInput.value;
  const id = new Date().getTime().toString(); // getting unique ids
  if (todoItem && !editFlag) { // !editFlag => editFlag is false
    const newTodoItem = document.createElement("article");
    // add class
    newTodoItem.classList.add("todo-item");
    // add id
    const attr = document.createAttribute("data-id");
    attr.value = id;
    newTodoItem.setAttributeNode(attr);
    newTodoItem.innerHTML = `<p class="title">${todoItem}</p>
                <div class="btn-container">
                  <button type="button" class="edit-btn">
                  <i class="fas fa-edit"></i></button>
                  <button type="button" class="delete-btn">
                  <i class="fas fa-trash"></i></button>
                </div>`;
                
    const deleteBtn = newTodoItem.querySelector(".delete-btn");
    const editBtn = newTodoItem.querySelector(".edit-btn");

    deleteBtn.addEventListener("click", deleteItem);
    editBtn.addEventListener("click", editItem);

    // append child - add new item to the list
    todoList.appendChild(newTodoItem);

    // show list
    todoContainer.classList.add("show-container");

    // add to local storage
    addToLocalStorage(id, todoItem);

    //display alert
    displayAlert("item added", "success");

    // set back to default
    setBackToDefault();
  } else if (todoItem && editFlag) { // editFlag => editFlag is true
    console.log("editing");
  } else {
    displayAlert("please enter value", "danger");
  }
};

// ****** EVENT LISTENERS **********
// submit form
todoInputForm.addEventListener("submit", addItem);

// clear items
clearBtn.addEventListener("click", clearItems);

// edit item

// remove item


// ****** SETUP ITEMS **********
