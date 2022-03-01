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
  closePhotoPopup();
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
const cardImage = itemTemplateContent.querySelector(".elements__image");
const cardTitle = itemTemplateContent.querySelector(".elements__title");
const popupPhotoElement = document.querySelector(".popup__photo");
const popupPhotoCloseElement = popupPhotoElement.querySelector(".popup__close");
const imagePhotoPopup = popupPhotoElement.querySelector(".popup__image");

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
  imageName.textContent = name;
  imageLink.src = link;
  newCard
    .querySelector(".elements__like")
    .addEventListener("click", function (event) {
      event.target.classList.toggle("elements__like_active");
    });
  newCard
    .querySelector(".elements__delete")
    .addEventListener("click", function (event) {
      const itemElement = event.target.closest(".elements__list-object");
      itemElement.remove();
    });
  imageLink.addEventListener("click", function (event) {
    openPhotoPopup();
    imagePhotoPopup.src = link;
    popupPhotoElement.querySelector(".popup__caption").textContent = name;
  });
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

const openPhotoPopup = function () {
  popupPhotoElement.classList.add("popup_opened");
};

const closePhotoPopup = function () {
  popupPhotoElement.classList.remove("popup_opened");
};

profileEditButtonElement.addEventListener("click", openEditPopup);
popupCloseElement.addEventListener("click", closeEditPopup);
popupEditElement.addEventListener("click", closePopupByClickOnOverlay);
popupEditElement.addEventListener("submit", formEditSubmitHandler);
profileAddButtonElement.addEventListener("click", openAddPopup);
popupAddCloseElement.addEventListener("click", closeAddPopup);
popupAddElement.addEventListener("click", closePopupByClickOnOverlay);
popupAddElement.addEventListener("submit", formAddSubmitHandler);
popupPhotoCloseElement.addEventListener("click", closePhotoPopup);
popupPhotoElement.addEventListener("click", closePopupByClickOnOverlay);
