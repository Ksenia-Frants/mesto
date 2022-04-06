export const closePopup = function (popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByPressEsc);
};

export const closePopupByPressEsc = function (event) {
  if (event.key === "Escape") {
    const currentPopup = document.querySelector(".popup_opened");
    closePopup(currentPopup);
  }
};

export const disableButton = function (button, disableClass) {
  button.classList.add(disableClass);
  button.disabled = true;
};

export const openPopup = function (popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByPressEsc);
};

export const popupPhotoElement = document.querySelector(".popup_photo");
export const imagePhotoPopup = popupPhotoElement.querySelector(".popup__image");
export const popupCaption = popupPhotoElement.querySelector(".popup__caption");
