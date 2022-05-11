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
  popupDelete,
  avatar,
  avatarButton,
  popupAvatar,
  popupAvatarSelector,
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
import PopupDelete from "../components/PopupDelete.js";

let userId;

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-40/",
  headers: {
    authorization: "ef576f44-6eda-4fa2-963c-752429bbf3fe",
    "Content-Type": "application/json",
  },
});

const initialData = [api.getUser(), api.getinitialCards()];

Promise.all(initialData)
  .then(([user, cards]) => {
    userInfo.setUserInfo(user);
    userInfo.setUserAvatar(user);
    userId = user._id;
    cardList.renderItems(cards.reverse(), user._id);
  })
  .catch((err) => alert(err));

const editValidator = new FormValidator(options, popupEditForm);
const addValidator = new FormValidator(options, popupAddForm);
const avatarValidator = new FormValidator(options, popupAvatar);

editValidator.enableValidation();
addValidator.enableValidation();
avatarValidator.enableValidation();

const popupWithImage = new PopupWithImage(".popup_photo");

popupWithImage.setEventListeners();

const handleDeleteCard = (data) => {
  cardDeletePopup.setData(data);
  cardDeletePopup.open();
};

const createNewCard = (data, userId) => {
  const card = new Card(
    {
      data,
      userId,
      handleCardClick: () => {
        popupWithImage.open(data);
      },
      handleDeleteCard,
      handleLikeCard: (id) => {
        if (card.setLike()) {
          api
            .deleteLike(id)
            .then((res) => {
              card.toggleLike(res.likes);
            })
            .catch((err) => console.log(err));
        } else {
          api
            .addLike(id)
            .then((res) => {
              card.toggleLike(res.likes);
            })
            .catch((err) => console.log(err));
        }
      },
    },
    "#photo-card-template"
  );
  return card.createCard();
};

const cardList = new Section(
  {
    items: [],
    renderer: (data, userId) => {
      cardList.addItem(createNewCard(data, userId));
    },
  },
  listElement
);

const cardDeletePopup = new PopupDelete(popupDelete, {
  formSubmitHandler: (data) => {
    api
      .deleteCard(data.cardId)
      .then(() => {
        data.card.remove();
        cardDeletePopup.close();
      })
      .catch((err) => console.log(err));
  },
});
cardDeletePopup.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: userName,
  descriptionSelector: userAbout,
  profileAvatar: avatar,
});

const avatarEdit = new PopupWithForm(popupAvatarSelector, {
  formSubmitHandler: (data) => {
    avatarEdit.loadInfo(true);
    api
      .editAvatar(data)
      .then((res) => {
        userInfo.setUserAvatar(res);
        avatarEdit.close();
      })
      .catch((err) => console.log(err))
      .finally(() => avatarEdit.loadInfo(false));
  },
});
avatarEdit.setEventListeners();

const popupWithFormAdd = new PopupWithForm(popupAddSelector, {
  formSubmitHandler: (data) => {
    popupWithFormAdd.loadInfo(true);
    api
      .addCard(data.name, data.link)
      .then((res) => {
        const item = createNewCard(res, userId);
        cardList.addItem(item);
        popupWithFormAdd.close();
      })
      .catch((err) => console.log(err))
      .finally(() => popupWithFormAdd.loadInfo(false));
  },
});

popupWithFormAdd.setEventListeners();

const popupWithFormEdit = new PopupWithForm(popupEditSelector, {
  formSubmitHandler: (data) => {
    popupWithFormEdit.loadInfo(true);
    const { name, about } = data;
    api
      .editProfile(name, about)
      .then(() => {
        userInfo.setUserInfo(data);
        popupWithFormEdit.close();
      })
      .catch((err) => console.log(err))
      .finally(() => popupWithFormEdit.loadInfo(false));
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

avatarButton.addEventListener("click", () => {
  avatarValidator.resetValidation();
  avatarEdit.open();
});
