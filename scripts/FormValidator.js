export class FormValidator {
  constructor(settings, formElement) {
    this._formElement = formElement;
    this._settings = settings;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._settings.inputSelector)
    );
    this._submitButtonElement = this._formElement.querySelector(
      this._settings.submitButtonSelector
    );
  }
  _showError(inputElement, errorMessage) {
    const { errorClass } = this._settings;
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  }
  _hideError(inputElement) {
    const { errorClass } = this._settings;
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    errorElement.textContent = "";
    errorElement.classList.remove(errorClass);
  }
  _checkValidity(inputElement) {
    const isInputNotValid = !inputElement.validity.valid;
    if (isInputNotValid) {
      const errorMessage = inputElement.validationMessage;
      this._showError(inputElement, errorMessage);
    } else {
      this._hideError(inputElement);
    }
  }
  _toggleButtonState() {
    const { inactiveButtonClass } = this._settings;
    const hasInvalidInput = this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
    if (hasInvalidInput) {
      this._submitButtonElement.classList.add(inactiveButtonClass);
      this._submitButtonElement.setAttribute("disabled", true);
    } else {
      this._submitButtonElement.classList.remove(inactiveButtonClass);
      this._submitButtonElement.removeAttribute("disabled");
    }
  }
  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }
  enableValidation() {
    this._formElement.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    this._setEventListeners();
  }
}
