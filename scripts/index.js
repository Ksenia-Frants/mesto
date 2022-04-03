const items = [
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

const popups = document.querySelectorAll(".popup");
const popupEditElement = document.querySelector(".popup_edit");
const popupContainer = document.querySelector(".popup__container");
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
const popupAddCloseElement = popupAddElement.querySelector(".popup__close");
const profileAddButtonElement = document.querySelector(".profile__add-button");
const titleInput = popupAddElement.querySelector(".popup__input_type_name");
const descriptionInput = popupAddElement.querySelector(
  ".popup__input_type_description"
);
const listElement = document.querySelector(".elements__list");
const itemTemplateContent = document.querySelector(
  "#photo-card-template"
).content;
//const cardImage = itemTemplateContent.querySelector(".elements__image");
//const cardTitle = itemTemplateContent.querySelector(".elements__title");
//const popupPhotoElement = document.querySelector(".popup_photo");
const popupPhotoCloseElement = popupPhotoElement.querySelector(".popup__close");
//const imagePhotoPopup = popupPhotoElement.querySelector(".popup__image");
//const popupCaption = popupPhotoElement.querySelector(".popup__caption");
const buttonSubmit = popupAddElement.querySelector(".popup__button");
const addForm = popupAddElement.querySelector(".popup__form");

export const openPopup = function (popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByPressEsc);
};

const closePopup = function (popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByPressEsc);
};

const closePopupByClickOnOverlay = function (event) {
  if (event.target.classList.contains("popup_opened")) {
    const currentPopup = document.querySelector(".popup_opened");
    closePopup(currentPopup);
  }
};

const closePopupByPressEsc = function (event) {
  if (event.key === "Escape") {
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

function toggleLike(event) {
  event.target.classList.toggle("elements__like_active");
}

function deleteCard(event) {
  const itemElement = event.target.closest(".elements__list-object");
  itemElement.remove();
}

function createPhotoCard(name, link) {
  const newCard = itemTemplateContent
    .querySelector(".elements__list-object")
    .cloneNode(true);
  const imageLink = newCard.querySelector(".elements__image");
  const imageName = newCard.querySelector(".elements__title");
  imageName.textContent = name;
  imageLink.src = link;
  imageLink.alt = name;
  newCard
    .querySelector(".elements__like")
    .addEventListener("click", toggleLike);
  newCard
    .querySelector(".elements__delete")
    .addEventListener("click", deleteCard);
  imageLink.addEventListener("click", function () {
    imagePhotoPopup.src = link;
    popupCaption.textContent = name;
    imagePhotoPopup.alt = name;
    openPopup(popupPhotoElement);
  });
  return newCard;
}

items.forEach(function (item) {
  const newCard = createPhotoCard(item.name, item.link);
  listElement.appendChild(newCard);
});

function handleFormAddSubmit(evt) {
  evt.preventDefault();
  const name = titleInput.value;
  const link = descriptionInput.value;
  const newCard = createPhotoCard(name, link);
  buttonSubmit.classList.add("popup__button_disabled");
  buttonSubmit.disabled = true;
  listElement.prepend(newCard);
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
  addForm.reset();
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
