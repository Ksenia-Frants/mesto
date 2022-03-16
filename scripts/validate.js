const showError = (formElement, inputElement, errorMessage, { errorClass }) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideError = (formElement, inputElement, { errorClass }) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  errorElement.textContent = "";
  errorElement.classList.remove(errorClass);
};
//Проверка на валидность
const checkValidity = (formElement, inputElement, rest) => {
  const isInputNotValid = !inputElement.validity.valid;

  if (isInputNotValid) {
    const errorMessage = inputElement.validationMessage;
    showError(formElement, inputElement, errorMessage, rest);
  } else {
    hideError(formElement, inputElement, rest);
  }
};

const toggleButtonState = (
  inputList,
  submitButtonElement,
  { inactiveButtonClass }
) => {
  const inputElements = Array.from(inputList);
  const hasInvalidInput = inputElements.some((inputElement) => {
    return !inputElement.validity.valid;
  });

  if (hasInvalidInput) {
    submitButtonElement.classList.add(inactiveButtonClass);
    submitButtonElement.setAttribute("disabled", true);
  } else {
    submitButtonElement.classList.remove(inactiveButtonClass);
    submitButtonElement.removeAttribute("disabled");
  }
};

//Устанавливает слушатели событий на список всех инпутов формы
const setEventListeners = (
  formElement,
  { inputSelector, submitButtonSelector, ...rest }
) => {
  const inputList = formElement.querySelectorAll(inputSelector);
  const submitButtonElement = formElement.querySelector(submitButtonSelector);
  const inputListIterator = (inputElement) => {
    const handleInput = () => {
      checkValidity(formElement, inputElement, rest);
      toggleButtonState(inputList, submitButtonElement, rest);
    };
    inputElement.addEventListener("input", handleInput);
  };
  toggleButtonState(inputList, submitButtonElement, rest);

  inputList.forEach(inputListIterator);
};

//Находим все формы и в каждой вызываем слушатель событий
const enableValidation = ({ formSelector, ...rest }) => {
  const formList = document.querySelectorAll(formSelector);
  const formListIterator = (formElement) => {
    const handleFormSubmit = (event) => {
      event.preventDefault();
    };
    formElement.addEventListener("submit", handleFormSubmit);

    setEventListeners(formElement, rest);
  };

  formList.forEach(formListIterator);
};

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
