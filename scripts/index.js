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

function formEditSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeEditPopup();
}

const popupAddElement = document.querySelector(".popup__add");
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
const newCard = itemTemplateContent
  .querySelector(".elements__list-object")
  .cloneNode(true);
const cardImage = itemTemplateContent.querySelector(".elements__image");
const cardTitle = itemTemplateContent.querySelector(".elements__title");
const deleteButtonElement = document.querySelector(".elements__delete");
const likeButtonElement = document.querySelector(".elements__like");
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

const openAddPopup = function () {
  popupAddElement.classList.add("popup_opened");
};

const closeAddPopup = function () {
  popupAddElement.classList.remove("popup_opened");
};

function createPhotoCard(name, link) {
  const newCard = itemTemplateContent
    .querySelector(".elements__list-object")
    .cloneNode(true);
  const imageLink = newCard.querySelector(".elements__image");
  const imageName = newCard.querySelector(".elements__title");
  setEventListeners(newCard);
  imageName.textContent = name;
  imageLink.src = link;

  return newCard;
}

items.forEach(function (item) {
  const newCard = createPhotoCard(item.name, item.link);
  listElement.appendChild(newCard);
});

function formAddSubmitHandler(evt) {
  evt.preventDefault();
  const name = titleInput.value;
  const link = descriptionInput.value;
  const newCard = createPhotoCard(name, link);
  listElement.prepend(newCard);
  closeAddPopup();
}

function setEventListeners(newCard) {
  newCard
    .querySelector(".elements__delete")
    .addEventListener("click", handleDelete);
  newCard
    .querySelector(".elements__like")
    .addEventListener("click", handleLike);
}

function handleDelete(event) {
  const itemElement = event.target.closest(".elements__list-object");
  itemElement.remove();
}

function handleLike(event) {
  event.target.classList.toggle("elements__like_active");
}

profileEditButtonElement.addEventListener("click", openEditPopup);
popupCloseElement.addEventListener("click", closeEditPopup);
popupEditElement.addEventListener("click", closePopupByClickOnOverlay);
popupEditElement.addEventListener("submit", formEditSubmitHandler);
profileAddButtonElement.addEventListener("click", openAddPopup);
popupAddCloseElement.addEventListener("click", closeAddPopup);
popupAddElement.addEventListener("click", closePopupByClickOnOverlay);
popupAddElement.addEventListener("submit", formAddSubmitHandler);
deleteButtonElement.addEventListener("click", handleDelete);
likeButtonElement.addEventListener("click", handleLike);
