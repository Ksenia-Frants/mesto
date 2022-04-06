import {
  closePopup,
  openPopup,
  popupPhotoElement,
  disableButton,
} from "./utils.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { items } from "./cardsArray.js";

const popupEditElement = document.querySelector(".popup_edit");
const popupEditForm = popupEditElement.querySelector(".popup__form");
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
const popupAddElement = document.querySelector(".popup_add");
const popupAddForm = popupAddElement.querySelector(".popup__form");
const popupAddCloseElement = popupAddElement.querySelector(".popup__close");
const profileAddButtonElement = document.querySelector(".profile__add-button");
const titleInput = popupAddElement.querySelector(".popup__input_type_name");
const descriptionInput = popupAddElement.querySelector(
  ".popup__input_type_description"
);
const listElement = document.querySelector(".cards__list");
const popupPhotoCloseElement = popupPhotoElement.querySelector(".popup__close");
const buttonSubmit = popupAddElement.querySelector(".popup__button");

const options = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const editValidator = new FormValidator(options, popupEditForm);
const addValidator = new FormValidator(options, popupAddForm);

editValidator.enableValidation();
addValidator.enableValidation();

const closePopupByClickOnOverlay = (event) => {
  if (event.target.classList.contains("popup_opened")) {
    const currentPopup = document.querySelector(".popup_opened");
    closePopup(currentPopup);
  }
};

function handleFormEditSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupEditElement);
}

const renderCard = (data, container) => {
  const card = new Card(data, "#photo-card-template");
  const cardElement = card.createCard();
  container.prepend(cardElement);
};

function handleFormAddSubmit(evt) {
  evt.preventDefault();
  renderCard(
    {
      name: titleInput.value,
      link: descriptionInput.value,
    },
    listElement
  );
  disableButton(buttonSubmit, "popup__button_disabled");
  closePopup(popupAddElement);
}

profileEditButtonElement.addEventListener("click", function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popupEditElement);
});
popupCloseElement.addEventListener("click", function () {
  closePopup(popupEditElement);
});
popupEditElement.addEventListener("submit", handleFormEditSubmit);
profileAddButtonElement.addEventListener("click", function () {
  popupAddForm.reset();
  openPopup(popupAddElement);
  addValidator.resetValidation();
});
popupAddCloseElement.addEventListener("click", function () {
  closePopup(popupAddElement);
});
popupAddElement.addEventListener("submit", handleFormAddSubmit);
popupPhotoCloseElement.addEventListener("click", function () {
  closePopup(popupPhotoElement);
});

document.addEventListener("click", closePopupByClickOnOverlay);

items.forEach((data) => {
  renderCard(data, listElement);
});
