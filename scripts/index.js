const popupEditElement = document.querySelector(".popup__edit");
const popupCloseElement = popupEditElement.querySelector(".popup__close");
const profileEditButtonElement = document.querySelector(
  ".profile__edit-button"
);
const nameInput = popupEditElement.querySelector(".popup__input_type_name");
const jobInput = popupEditElement.querySelector(
  ".popup__input_type_description"
);
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const openEditPopup = function () {
  popupEditElement.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
};

const closeEditPopup = function () {
  popupEditElement.classList.remove("popup_opened");
};

const closePopupByClickOnOverlay = function (event) {
  console.log(event.target, event.currentTarget);
  if (event.target !== event.currentTarget) {
    return;
  }
  closeEditPopup();
  closeAddPopup();
};

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeEditPopup();
}

const popupAddElement = document.querySelector(".popup__add");
const popupAddCloseElement = popupAddElement.querySelector(".popup__close");
const profileAddButtonElement = document.querySelector(".profile__add-button");
const titleInput = popupAddElement.querySelector(".popup__input_type_name");
const templateContent = document.querySelector(".template").content;
const listElement = document.querySelector("elements__list");

const openAddPopup = function () {
  popupAddElement.classList.add("popup_opened");
};

const closeAddPopup = function () {
  popupAddElement.classList.remove("popup_opened");
};

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

function renderItem(item) {
  const itemElement = templateContent.cloneNode(true);
  itemElement.querySelector(".elements__title").textContent = item;
  listElement.appendChild(itemElement);
}

function renderItems(initialCards) {
  initialCards.forEach(renderItem);
}

renderItems(initialCards);

profileEditButtonElement.addEventListener("click", openEditPopup);
popupCloseElement.addEventListener("click", closeEditPopup);
popupEditElement.addEventListener("click", closePopupByClickOnOverlay);
popupEditElement.addEventListener("submit", formSubmitHandler);
profileAddButtonElement.addEventListener("click", openAddPopup);
popupAddCloseElement.addEventListener("click", closeAddPopup);
popupAddElement.addEventListener("click", closePopupByClickOnOverlay);
