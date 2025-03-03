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


// ****** LOCAL STORAGE FUNCTIONS **********
getLocalStorage = () => {
  return localStorage.getItem("todoList") ? JSON.parse(localStorage.getItem("todoList")) : [];
}

addToLocalStorage = (id, newItem) => {
  const todoItem = { id: id, todo: newItem };

  // checking if todoList exists in local storage; if yes, get it from local storage, if not, create an empty array
  let todoList = getLocalStorage();
  console.log(todoList);
  todoList.push(todoItem);
  // update local storage
  localStorage.setItem("todoList", JSON.stringify(todoList));
}

removeFromLocalStorage = (id) => {
  let todoList = getLocalStorage();
  // actually returning the items which have not been deleted (with different id than the one which has been passed as the function argument)
  todoList = todoList.filter(function(todoItem) {
    if (todoItem.id !== id) {
      return todoItem;
    }
  });
  // update local storage
  localStorage.setItem("todoList", JSON.stringify(todoList));
}

editLocalStorage = (id, editedItem) => {
  let todoList = getLocalStorage();
  todoList = todoList.map(function(todoItem) {
    if (todoItem.id === id) {
      todoItem.todo = editedItem;
    }
    return todoItem;
  });
  // update local storage
  localStorage.setItem("todoList", JSON.stringify(todoList));
}


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
  const todoItems = document.querySelectorAll(".todo-item");

  if (todoItems.length > 0) {
    todoItems.forEach((item) => {
      todoList.removeChild(item);
    });
  }
  todoContainer.classList.remove("show-container");
  displayAlert("list cleared", "danger");
  setBackToDefault();
  localStorage.removeItem("todoList");
}

// delete item
deleteItem = (event) => {
  const item = event.currentTarget.parentElement.parentElement;
  const id = item.dataset.id;
  todoList.removeChild(item);
  if (todoList.children.length === 1) { // some bug, should be 0
    todoContainer.classList.remove("show-container");
  }
  displayAlert("item removed", "danger");
  setBackToDefault();
  removeFromLocalStorage(id);
}

// edit item
editItem = (event) => {
  const item = event.currentTarget.parentElement.parentElement;

  // set item to edit - looking for a <p class="title"> element
  editItem = event.currentTarget.parentElement.previousElementSibling;

  // set form value to the same value as editing item's title
  todoItemInput.value = editItem.innerHTML;
  editFlag = true;
  editId = item.dataset.id;
  submitBtn.textContent = "edit";
}

// create list
createList = (id, todoItem) => {
   // !editFlag => editFlag is false
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

    // targeting delete/edit buttons after they have been created with the item
    const deleteBtn = newTodoItem.querySelector(".delete-btn");
    const editBtn = newTodoItem.querySelector(".edit-btn");

    deleteBtn.addEventListener("click", deleteItem);
    editBtn.addEventListener("click", editItem);

    // append child - add new item to the list
    todoList.appendChild(newTodoItem);

}


// show items

showItems = () => {
  let todoList = getLocalStorage();
  if (todoList.length > 0) {
    todoList.forEach((todoItem) => {
      createList(todoItem.id, todoItem.todo);
    });
  todoContainer.classList.add("show-container");
  }
}


// ****** APP FUNCTIONALITY **********
// add item to the list
addItem = (event) => {
  event.preventDefault();
  const todoItem = todoItemInput.value;
  const id = new Date().getTime().toString(); // getting unique ids

  // add new item / create list
  if (todoItem && !editFlag) {
    createList(id, todoItem)

    // show list
    todoContainer.classList.add("show-container");

    // add to local storage
    addToLocalStorage(id, todoItem);

    //display alert
    displayAlert("item added", "success");

    // set back to default
    setBackToDefault();
  } else if (todoItem && editFlag) { // editFlag => editFlag is true
    // edit item
    editItem.innerHTML = todoItem;
    displayAlert("value changed", "success");
    // edit local storage
    editLocalStorage(editId, todoItem);
    setBackToDefault();
  } else {
    displayAlert("please enter value", "danger");
  }

};

// ****** EVENT LISTENERS **********
// submit form
todoInputForm.addEventListener("submit", addItem);

// clear items
clearBtn.addEventListener("click", clearItems);

// load items
window.addEventListener("DOMContentLoaded", showItems);
