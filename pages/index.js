import {
  popupEditElement,
  popupEditForm,
  popupCloseElement,
  profileEditButtonElement,
  nameInput,
  jobInput,
  profileName,
  profileDescription,
  popupAddElement,
  popupAddForm,
  popupAddCloseElement,
  profileAddButtonElement,
  titleInput,
  descriptionInput,
  listElement,
  popupPhotoCloseElement,
  buttonSubmit,
  options,
  popupPhotoElement,
  imagePhotoPopup,
} from "../utils/constants.js";
import { closePopup, openPopup, disableButton } from "../utils/utils.js";
import Card from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { items } from "../scripts/cardsArray.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";

/*const cardList = new Section(
  {
    items: items,
    renderer: (cardItem) => {
      const card = new Card(
        {
          data: cardItem,
          handleCardClick: () => {
            popupWithImage.open(items);
          },
        },
        "#photo-card-template"
      );
      const cardElement = card.createCard();
      cardList.addItem(cardElement);
    },
  },
  listElement
);*/

const createNewCard = (data) => {
  const card = new Card(
    {
      data,
      handleCardClick: () => {
        popupWithImage.open(data);
      },
    },
    "#photo-card-template"
  );
  return card.createCard();
};

const cardList = new Section(
  {
    items: items,
    renderer: (data) => {
      cardList.addItem(createNewCard(data));
    },
  },
  listElement
);

const editValidator = new FormValidator(options, popupEditForm);
const addValidator = new FormValidator(options, popupAddForm);

editValidator.enableValidation();
addValidator.enableValidation();

const popupWithImage = new PopupWithImage(".popup_photo");
popupWithImage.setEventListeners();

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

/*const renderCard = (data, container) => {
  const card = new Card(data, "#photo-card-template");
  const cardElement = card.createCard();
  container.prepend(cardElement);
};*/

function handleFormAddSubmit(evt) {
  evt.preventDefault();
  /*renderCard(
    {
      name: titleInput.value,
      link: descriptionInput.value,
    },
    listElement
  );*/
  cardList.renderItems();
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
  disableButton(buttonSubmit, "popup__button_disabled");
  openPopup(popupAddElement);
});
popupAddCloseElement.addEventListener("click", function () {
  closePopup(popupAddElement);
});
popupAddElement.addEventListener("submit", handleFormAddSubmit);
popupPhotoCloseElement.addEventListener("click", function () {
  closePopup(popupPhotoElement);
});

document.addEventListener("click", closePopupByClickOnOverlay);

/*items.forEach((data) => {
  renderCard(data, listElement);
});*/
cardList.renderItems();
