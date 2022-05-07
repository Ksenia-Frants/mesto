import {
  popupEditForm,
  profileEditButtonElement,
  userName,
  userAbout,
  popupAddSelector,
  popupAddForm,
  popupEditSelector,
  profileAddButtonElement,
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
import Api from "../components/api.js";

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-40/",
  token: "ef576f44-6eda-4fa2-963c-752429bbf3fe",
});

let userId, addCardLike, deleteCardLike;

const initialData = [api.getUser(), api.getinitialCards()];

const editValidator = new FormValidator(options, popupEditForm);
const addValidator = new FormValidator(options, popupAddForm);

editValidator.enableValidation();
addValidator.enableValidation();

const popupWithImage = new PopupWithImage(".popup_photo");

popupWithImage.setEventListeners();

// const popupWithFormAdd = new PopupWithForm(popupAddSelector, {
//   formSubmitHandler: (data) => cardList.addItem(data),
// });

// const cardList = new Section(
//   {
//     items: items,
//     renderer: (data) => {
//       cardList.addItem(createNewCard(data));
//     },
//   },
//   listElement
// );

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
    items: [],
    renderer: (data) => {
      cardList.addItem(createNewCard(data));
    },
  },
  listElement
);

// cardList.renderItems(items);

const userInfo = new UserInfo({
  nameSelector: userName,
  descriptionSelector: userAbout,
});

const popupWithFormAdd = new PopupWithForm(popupAddSelector, {
  formSubmitHandler: (data) => {
    api.addCard(data.name, data.link).then((res) => {
      const item = createNewCard({
        name: res.name,
        link: res.link,
        likes: res.likes,
      });
      cardList.addItem(item);
    });
  },
});

popupWithFormAdd.setEventListeners();

const popupWithFormEdit = new PopupWithForm(popupEditSelector, {
  formSubmitHandler: (data) => {
    const { name, description } = data;
    api.editProfile(name, description).then(() => {
      userInfo.setUserInfo(data);
    });
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
  addValidator.resetValidation();
  popupWithFormAdd.open();
});

Promise.all(initialData)
  .then(([user, cards]) => {
    userInfo.setUserInfo(user);
    cardList.renderItems(cards);
  })
  .catch((err) => alert(err));
