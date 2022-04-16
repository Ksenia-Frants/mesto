export const popupEditElement = document.querySelector(".popup_edit");
export const popupEditForm = popupEditElement.querySelector(".popup__form");
export const popupCloseElement =
  popupEditElement.querySelector(".popup__close");
export const profileEditButtonElement = document.querySelector(
  ".profile__edit-button"
);
export const nameInput = popupEditElement.querySelector(
  ".popup__input_type_name"
);
export const jobInput = popupEditElement.querySelector(
  ".popup__input_type_description"
);
export const profileName = document.querySelector(".profile__name");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const popupAddElement = document.querySelector(".popup_add");
export const popupAddForm = popupAddElement.querySelector(".popup__form");
export const popupAddCloseElement =
  popupAddElement.querySelector(".popup__close");
export const profileAddButtonElement = document.querySelector(
  ".profile__add-button"
);
export const titleInput = popupAddElement.querySelector(
  ".popup__input_type_name"
);
export const descriptionInput = popupAddElement.querySelector(
  ".popup__input_type_description"
);
export const listElement = document.querySelector(".cards__list");
export const popupPhotoElement = document.querySelector(".popup_photo");
export const popupPhotoCloseElement =
  popupPhotoElement.querySelector(".popup__close");
export const buttonSubmit = popupAddElement.querySelector(".popup__button");
export const imagePhotoPopup = popupPhotoElement.querySelector(".popup__image");
export const popupCaption = popupPhotoElement.querySelector(".popup__caption");

export const options = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};