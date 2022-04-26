import {
  popupEditForm,
  profileEditButtonElement,
  userName,
  userAbout,
  popupAddSelector,
  popupAddForm,
  popupEditSelector,
  profileAddButtonElement,
  titleInput,
  descriptionInput,
  listElement,
  options,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { items } from "../scripts/cardsArray.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";

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
  formSubmitHandler: (data) => cardList.addItem(data),
});

popupWithFormAdd.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: userName,
  descriptionSelector: userAbout,
});

const popupWithFormEdit = new PopupWithForm(popupEditSelector, {
  formSubmitHandler: (data) => {
    userInfo.setUserInfo(data);
    popupWithFormEdit.close();
  },
});

popupWithFormEdit.setEventListeners();

profileEditButtonElement.addEventListener("click", () => {
  const data = userInfo.getUserInfo();
  popupWithFormEdit.setInputValues(data);
  editValidator.resetValidation();
  popupWithFormEdit.open();
});

profileAddButtonElement.addEventListener("click", () => {
  addValidator.disableButton();
  addValidator.resetValidation();
  popupWithFormAdd.open();
});
