import {
  popupEditForm,
  profileEditButtonElement,
  nameInput,
  jobInput,
  userName,
  userAbout,
  popupAddSelector,
  popupAddForm,
  popupEditSelector,
  profileAddButtonElement,
  titleInput,
  descriptionInput,
  listElement,
  buttonSubmit,
  options,
} from "../utils/constants.js";
import { disableButton } from "../utils/utils.js";
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
  formSubmitHandler: (data) => {
    userInfo.setUserInfo(data);
    popupWithFormEdit.close();
  },
});

popupWithFormEdit.setEventListeners();

profileEditButtonElement.addEventListener("click", () => {
  const { name, description } = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = description;
  popupWithFormEdit.open();
});

profileAddButtonElement.addEventListener("click", () => {
  popupAddForm.reset();
  disableButton(buttonSubmit, "popup__button_disabled");
  popupWithFormAdd.open();
});
