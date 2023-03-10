const ul = document.querySelector("ul");
const form = document.querySelector(".book__header");
const input = document.querySelector("input");
const addButton = document.querySelector(".book__add");
const allDeleteButton = document.querySelector(".book__deleteAll");
const checkedDeleteButton = document.querySelector(".book__deleteReady");
const bookFooter = document.querySelector(".book__footer");
let noteData = [];

function hideFooter() {
  noteData.length == 0
    ? (bookFooter.style.display = "none")
    : (bookFooter.style.display = "");
}

hideFooter();

function addNoteToData() {
  if (input.value.trim().length) {
    noteData = [
      ...noteData,
      {
        note: input.value,
        id: new Date().toISOString(),
        checked: false,
      },
    ];
    createNote(noteData);
    drawTodos(noteData);
    input.value = "";
    input.focus();
  }
}

function createNote(obj) {
  const noteItem = document.createElement("li");
  noteItem.className = "list__item";

  const listCheck = document.createElement("input");
  listCheck.type = "checkbox";
  listCheck.className = "list__checkbox";
  if (obj.checked) listCheck.checked = true;
  noteItem.append(listCheck);

  const listText = document.createElement("p");
  listText.className = "list__text";
  listText.textContent = obj.note;
  noteItem.append(listText);

  const listDeleteButton = document.createElement("button");
  listDeleteButton.className = ".list__button";
  listDeleteButton.textContent = "X";
  noteItem.append(listDeleteButton);

  listDeleteButton.addEventListener("click", deleteNote);

  function deleteNote() {
    noteData = noteData.filter((item) => item.id !== obj.id);
    drawTodos(noteData);
  }

  listCheck.addEventListener("click", checkedNote);

  function checkedNote() {
    noteData.forEach((item) =>
      item.id == obj.id
        ? (item.checked = !item.checked)
        : (item.checked = item.checked)
    );
  }

  return noteItem;
}

function drawTodos(data) {
  ul.innerHTML = "";
  data.forEach((item) => {
    ul.append(createNote(item));
  });
  hideFooter();
}

function deleteAll() {
  noteData = [];
  drawTodos(noteData);
}

function deleteChecked() {
  noteData = noteData.filter((item) => item.checked == false);
  drawTodos(noteData);
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  addNoteToData();
});

allDeleteButton.addEventListener("click", deleteAll);

checkedDeleteButton.addEventListener("click", deleteChecked);
