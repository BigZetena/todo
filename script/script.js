const ul = document.querySelector("ul");
const input = document.querySelector("input");
const addButton = document.querySelector(".book__add");
const allDeleteButton = document.querySelector(".book__deleteAll");
const noteData = [];

function addNoteToData() {
  if (input.value.trim().length) {
    noteData.push(input.value);
    createNote();
  }
}

function createNote() {
  let noteId = noteData.length - 1;
  let checkboxId = noteId + "box";
  let deleteId = noteId + "delete";
  const noteItem = document.createElement("li");
  noteItem.className = "list__item";
  noteItem.id =
    noteItem.innerHTML = `<input type="checkbox" class="list__checkbox" id="${checkboxId}"/>
                         <p class="list__text" id="${noteId}">${noteData[noteId]}</p>
                         <button class="list__button" id="${deleteId}">❌</button>`;
  ul.append(noteItem);
  console.log(noteData);
  const listDeleteButton = document.getElementById(deleteId);
  listDeleteButton.addEventListener("click", function deleteNote() {
    ul.removeChild(noteItem);
    noteData.splice(noteId, 1);
  });
  const listCheck = document.getElementById(checkboxId);
  listCheck.addEventListener("click", function checkedNote() {
    const noteText = document.getElementById(noteId);
    if (listCheck.checked) {
      noteText.className = "list__text__checked list__text";
    } else {
      noteText.className = "list__text";
    }
    console.log("hui");
  });
}

function allDelete() {
  const liList = document.querySelector(".list__item");
  for (let k = noteData.length; k > 0; k - 1) {
    ul.removeChild(liList);
    noteData.splice(noteId, 1);
  }
}

allDeleteButton.addEventListener("click", allDelete);
addButton.addEventListener("click", addNoteToData);
