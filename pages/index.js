import {
  popupEditElement,
  popupEditForm,
  popupCloseElement,
  profileEditButtonElement,
  nameInput,
  jobInput,
  userName,
  userAbout,
  profileName,
  profileDescription,
  popupAddSelector,
  popupAddElement,
  popupAddForm,
  popupEditSelector,
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
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

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

cardList.renderItems();

const editValidator = new FormValidator(options, popupEditForm);
const addValidator = new FormValidator(options, popupAddForm);

editValidator.enableValidation();
addValidator.enableValidation();

const popupWithImage = new PopupWithImage(".popup_photo");

popupWithImage.setEventListeners();

const popupWithFormAdd = new PopupWithForm(popupAddSelector, {
  formSubmitHandler: () => {
    const item = createNewCard({
      name: titleInput.value,
      link: descriptionInput.value,
    });
    cardList.addItem(item);
  },
});
popupWithFormAdd.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: userName,
  descriptionSelector: userAbout,
});

const popupWithFormEdit = new PopupWithForm(popupEditSelector, {
  formSubmitHandler: () => {
    userInfo.setUserInfo();
  },
});

popupWithFormEdit.setEventListeners();

/*const closePopupByClickOnOverlay = (event) => {
  if (event.target.classList.contains("popup_opened")) {
    const currentPopup = document.querySelector(".popup_opened");
    closePopup(currentPopup);
  }
};*/

/*function handleFormEditSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupEditElement);
}*/

/*const renderCard = (data, container) => {
  const card = new Card(data, "#photo-card-template");
  const cardElement = card.createCard();
  container.prepend(cardElement);
};*/

/*function handleFormAddSubmit(evt) {
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
}*/

profileEditButtonElement.addEventListener("click", () => {
  const { name, description } = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = description;
  popupWithFormEdit.open();
  /*nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popupEditElement);*/
});
/*popupCloseElement.addEventListener("click", function () {
  closePopup(popupEditElement);
});*/
//popupEditElement.addEventListener("submit", handleFormEditSubmit);
profileAddButtonElement.addEventListener("click", () => {
  popupAddForm.reset();
  disableButton(buttonSubmit, "popup__button_disabled");
  popupWithFormAdd.open();
  //openPopup(popupAddElement);*/
});
/*popupAddCloseElement.addEventListener("click", function () {
  closePopup(popupAddElement);
});*/
//popupAddElement.addEventListener("submit", handleFormAddSubmit);
/*popupPhotoCloseElement.addEventListener("click", function () {
  closePopup(popupPhotoElement);
});*/

//document.addEventListener("click", closePopupByClickOnOverlay);

/*items.forEach((data) => {
  renderCard(data, listElement);
});*/
