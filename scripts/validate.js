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
  const isInputNotValid = !inputElement.validity.valid;

  if (isInputNotValid) {
    const errorMessage = inputElement.validationMessage;
    showError(popupElement, inputElement, errorMessage);
  } else {
    hideError(popupElement, inputElement);
  }
};

const toggleButtonState = (inputList, submitButtonElement) => {
  const inputElements = Array.from(inputList);
  const hasInvalidInput = inputElements.some((inputElement) => {
    return !inputElement.validity.valid;
  });

  if (hasInvalidInput) {
    submitButtonElement.classList.add("popup__button_inactive");
    submitButtonElement.setAttribute("disabled", true);
  } else {
    submitButtonElement.classList.remove("popup__button_inactive");
    submitButtonElement.removeAttribute("disabled");
  }
};

const setEventListeners = (popupElement) => {
  const inputList = popupElement.querySelectorAll(".popup__input");
  const submitButtonElement = popupElement.querySelector(".popup__button");
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkValidity(popupElement, inputElement);
      toggleButtonState(inputList, submitButtonElement);
    });
  });
  toggleButtonState(inputList, submitButtonElement);
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
