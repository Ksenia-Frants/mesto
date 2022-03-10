const showError = (popupElement, inputElement, errorMessage) => {
  const errorElement = popupElement.querySelector(`#${inputElement.id}-error`);

  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input-error_active");
};

const hideError = (popupElement, inputElement) => {
  const errorElement = popupElement.querySelector(`#${inputElement.id}-error`);

  errorElement.textContent = "";
  errorElement.classList.remove("popup__input-error_active");
};

const checkValidity = (popupElement, inputElement) => {
  console.log(inputElement.validity);
  const isInputNotValid = !inputElement.validity.valid;

  if (isInputNotValid) {
    const errorMessage = inputElement.validationMessage;
    showError(popupElement, inputElement, errorMessage);
  } else {
    hideError(popupElement, inputElement);
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
