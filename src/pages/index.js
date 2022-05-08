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

let handleLikeCard, handleDeleteLikeCard;

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-40/",
  token: "ef576f44-6eda-4fa2-963c-752429bbf3fe",
});

const initialData = [api.getUser(), api.getinitialCards()];

const editValidator = new FormValidator(options, popupEditForm);
const addValidator = new FormValidator(options, popupAddForm);
// const avatarValidator = new FormValidator(options, popupAvatar);

editValidator.enableValidation();
addValidator.enableValidation();
// avatarValidator.enableValidation();

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
      handleLikeCard: (data) => {
        return api.addLike(data);
      },
      handleDeleteLikeCard: (data) => {
        return api.deleteLike(data);
      },
    },
    "#photo-card-template"
  );
  return card.createCard(data);
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

// cardList.renderItems(items);

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

// const avatarEdit = new PopupWithForm(popupAvatar, {
//   formSubmitHandler: (data) => {
//     api
//       .editAvatar(data)
//       .then((res) => {
//         userInfo.setUserAvatar(res);
//         avatarEdit.close();
//       })
//       .catch((err) => console.log(err));
//   },
// });

const popupWithFormAdd = new PopupWithForm(popupAddSelector, {
  formSubmitHandler: (data) => {
    api.addCard(data.name, data.link).then((res) => {
      console.log(res);
      const item = createNewCard(res);
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

// avatarButton.addEventListener("click", () => {
//   avatarEdit.open();
// });

Promise.all(initialData)
  .then(([user, cards]) => {
    userInfo.setUserInfo(user);
    // userInfo.setUserAvatar(user);
    cardList.renderItems(cards.reverse(), user._id);
    // userId = user._id;
  })
  .catch((err) => alert(err));
