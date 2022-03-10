const checkValidity = (popupElement, inputElement) => {
  console.log(inputElement.validity);
  const isInputNotValid = !inputElement.validity.valid;

  if (isInputNotValid) {
    showError();
  } else {
    hideError();
  }
};

const setEventListeners = (popupElement) => {
  const inputList = popupElement.querySelectorAll(".popup__input");
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", (event) => {
      console.log(event.target.name, event.target.value);

      checkValidity(popupElement, inputElement);
    });
  });
};

const enableValidation = () => {
  const formsList = document.querySelectorAll(".popup");
  formsList.forEach((popupElement) => {
    popupElement.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    setEventListeners(popupElement);
  });
};

enableValidation();
