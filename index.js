const header = document.querySelector(".header");
const c_yellow = document.querySelector(".c-yellow");
const c_green = document.querySelector(".c-green");
const c_pink = document.querySelector(".c-pink");
const c_purple = document.querySelector(".c-purple");
const c_blue = document.querySelector(".c-blue");
const c_gray = document.querySelector(".c-gray");
const c_dark = document.querySelector(".c-dark");
const bar = document.querySelector(".bar");
const nav = document.querySelector(".nav");
const modalControls = document.querySelector(".controls");
const modal = document.querySelector(".modal-new__note");
const modal_maximize = document.querySelector(".modal-maximize");
const modal_close = document.querySelector(".modal-close");
const add_note = document.querySelector(".add-note");
const container = document.querySelector(".cards-container");
const text = document.querySelector(".text");
const btnAdd = document.getElementById("btnAdd");
const btnSave = document.getElementById("btnSave");
const inpTitle = document.getElementById("inpTitle");

// document.documentElement.webkitRequestFullscreen()

const bg = localStorage.getItem("bg");
const guardarColor = ({ target }) => {
  const bgs = window.getComputedStyle(target).backgroundColor;
  localStorage.setItem("bg", bgs);
  header.style.backgroundColor = `${bgs}`;
  modalControls.style.backgroundColor = `${bgs}`;
  c = document.querySelectorAll(".card-note");
  for (let i = 0; i < c.length; i++) {
    c[i].style.backgroundColor = `${bgs}`;
    console.log(c);
  }
  nav.classList.remove('active')
};
const cambiarColor = () => {
  header.style.backgroundColor = `${bg}`;
  modalControls.style.backgroundColor = `${bg}`;
};

cambiarColor();

bar.addEventListener("click", () => {
  nav.classList.toggle("active");
});

c_yellow.addEventListener("click", guardarColor);
c_green.addEventListener("click", guardarColor);
c_pink.addEventListener("click", guardarColor);
c_purple.addEventListener("click", guardarColor);
c_blue.addEventListener("click", guardarColor);
c_gray.addEventListener("click", guardarColor);
c_dark.addEventListener("click", guardarColor);

add_note.addEventListener("click", () => {
  text.value = "";
  inpTitle.value = "";
  modal.classList.add("active");
  modal.parentNode.classList.add("active");
  btnAdd.style.display = "block";
  btnSave.style.display = "none";
});
modal_close.addEventListener("click", () => {
  modal.classList.remove("active");
  modal.classList.remove("maximize");
  modal.parentNode.classList.remove("active");

  text.value = "";
  inpTitle.value = "";
});

modal_maximize.addEventListener("click", () => {
  modal.classList.toggle("maximize");
});

const agregarCard = () => {
  const cards = mostrarCard() == null ? [] : mostrarCard();

  let id = cards.length > 0? cards[cards.length - 1].id + 1: 0
  const newCard = {
    id: id,
    title: inpTitle.value != "" ? inpTitle.value : "new note",
    text: text.value,
  };
  cards.push(newCard);
  localStorage.setItem("cards", JSON.stringify(cards));
  window.location.reload();
};

const mostrarCard = () => {
  const cards = localStorage.getItem("cards");
  return JSON.parse(cards);
};

let editId = 0;
const guardar = () => {
  let cards = mostrarCard();
  let id = editId;
  const index = cards.findIndex((card) => card.id === Number(id));
  console.log(index);
  cards[index].title = inpTitle.value;
  cards[index].text = text.value;
  localStorage.setItem("cards", JSON.stringify(cards));
  window.location.reload();
};

const eliminar = ({ target }) => {
  let cards = mostrarCard();
  if (target.classList.contains("fa-trash")) {
    let id = target.parentNode.parentNode.parentNode.id;
    console.log(id);
    let newArray = cards.filter((card) => card.id != id);
    localStorage.setItem("cards", JSON.stringify(newArray));
    window.location.reload();
  }
};

const editar = ({ target }) => {
  let cards = mostrarCard();
  if (target.classList.contains("fa-eye")) {
    let id = target.parentNode.parentNode.parentNode.id;
    modal.classList.add("active");
    /* ------------------------------------ - ----------------------------------- */

    let card = cards.filter((c) => c.id == id);

    inpTitle.value = card[0].title;
    text.value = card[0].text;
    /* ------------------------------------ - ----------------------------------- */
    btnAdd.style.display = "none";
    btnSave.style.display = "block";
    editId = id;
    modal.parentNode.classList.add("active");
  }
};

mostrarCard() == null
  ? ""
  : mostrarCard().map((card) => {
      container.innerHTML += `<div  id="${card.id}" class="card-note">
  <div class="title">${card.title}</div>
  <div class="controlers">
    <span class="delete">
      <i class="fas fa-eye"></i>
    </span>
    <span class="see">
      <i class="fas fa-trash"></i>
    </span>
  </div>
</div>`;
    });

c = document.querySelectorAll(".card-note");
for (let i = 0; i < c.length; i++) {
  c[i].addEventListener("click", eliminar);
  c[i].addEventListener("click", editar);
  c[i].style.backgroundColor = `${bg}`;
}

btnAdd.addEventListener("click", agregarCard);
btnSave.addEventListener("click", guardar);
