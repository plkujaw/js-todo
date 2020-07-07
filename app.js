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
addItem = (event) => {
  event.preventDefault();
  const todoItem = todoItemInput.value;
  const id = new Date().getTime().toString(); // getting unique ids
  if (todoItem !== "" && editFlag === false) {
    console.log("add item");
  } else if (todoItem !== "" && editFlag === true) {
    console.log("editing");
  } else {
    console.log("empty value");
  }
};

// ****** EVENT LISTENERS **********
// submit form
todoInputForm.addEventListener("submit", addItem);

// ****** LOCAL STORAGE **********

// ****** SETUP ITEMS **********
