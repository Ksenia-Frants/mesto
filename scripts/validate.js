const showError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input-error_active");
};

const hideError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  errorElement.textContent = "";
  errorElement.classList.remove("popup__input-error_active");
};

const checkValidity = (formElement, inputElement) => {
  const isInputNotValid = !inputElement.validity.valid;

  if (isInputNotValid) {
    const errorMessage = inputElement.validationMessage;
    showError(formElement, inputElement, errorMessage);
  } else {
    hideError(formElement, inputElement);
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

const setEventListeners = (formElement) => {
  const inputList = formElement.querySelectorAll(".popup__input");
  const submitButtonElement = formElement.querySelector(".popup__button");
  const inputListIterator = (inputElement) => {
    const handleInput = (event) => {
      checkValidity(formElement, inputElement);
      toggleButtonState(inputList, submitButtonElement);
    };
    inputElement.addEventListener("input", handleInput);
  };
  toggleButtonState(inputList, submitButtonElement);

  inputList.forEach(inputListIterator);
};

const enableValidation = () => {
  const formList = document.querySelectorAll(".popup__form");
  const formListIterator = (formElement) => {
    const handleFormSubmit = (event) => {
      event.preventDefault();
    };
    formElement.addEventListener("submit", handleFormSubmit);

    setEventListeners(formElement);
  };

  formList.forEach(formListIterator);
};

enableValidation();
