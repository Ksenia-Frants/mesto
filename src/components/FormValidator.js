export class FormValidator {
  constructor(settings, formElement) {
    this._formElement = formElement;
    this._settings = settings;
    this._submitButtonElement = this._formElement.querySelector(
      this._settings.submitButtonSelector
    );
  }
  disableButton() {
    this._submitButtonElement.classList.add(this._settings.inactiveButtonClass);
    this._submitButtonElement.disabled = true;
  }
  _showError = (inputElement, errorMessage) => {
    const { inputErrorClass, errorClass } = this._settings;
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  };
  _hideError = (inputElement) => {
    const { inputErrorClass, errorClass } = this._settings;
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(errorClass);
  };
  _checkValidity = (inputElement) => {
    const isInputNotValid = !inputElement.validity.valid;
    if (isInputNotValid) {
      const errorMessage = inputElement.validationMessage;
      this._showError(inputElement, errorMessage);
    } else {
      this._hideError(inputElement);
    }
  };
  _toggleButtonState = () => {
    const { inactiveButtonClass } = this._settings;
    const hasInvalidInput = this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
    if (hasInvalidInput) {
      this.disableButton();
    } else {
      this._submitButtonElement.classList.remove(inactiveButtonClass);
      this._submitButtonElement.removeAttribute("disabled");
    }
  };
  _setEventListeners = () => {
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._settings.inputSelector)
    );
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };
  enableValidation = () => {
    this._formElement.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    this._setEventListeners();
  };
  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideError(inputElement);
    });
  }
}
