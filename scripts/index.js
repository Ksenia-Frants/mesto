const popupElement = document.querySelector(".popup");
const popupCloseElement = popupElement.querySelector(".popup__close");
const profileEditButtonElement = document.querySelector(
  ".profile__edit-button"
);
const nameInput = popupElement.querySelector(".popup__item_name");
const jobInput = popupElement.querySelector(".popup__item_description");

console.log(jobInput);

const togglePopupVisibility = function () {
  popupElement.classList.toggle("popup_opened");
};

const openPopup = function () {
  popupElement.classList.add("popup_opened");
};

const closePopup = function () {
  popupElement.classList.remove("popup_opened");
};

const closePopupByClickOnOverlay = function (event) {
  console.log(event.target, event.currentTarget);
  if (event.target !== event.currentTarget) {
    return;
  }
  closePopup();
};

function formSubmitHandler(evt) {
  evt.preventDefault();
  let profileName = document.querySelector(".profile__name");
  let profileDescription = document.querySelector(".profile__description");
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup();
}

profileEditButtonElement.addEventListener("click", openPopup);
popupCloseElement.addEventListener("click", closePopup);
popupElement.addEventListener("click", closePopupByClickOnOverlay);
popupElement.addEventListener("submit", formSubmitHandler);
