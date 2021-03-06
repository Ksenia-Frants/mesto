export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeElement = this._popup.querySelector(".popup__close");
  }
  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }
  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }
  _handleEscClose = (event) => {
    if (event.key === "Escape") {
      this.close();
    }
  };
  setEventListeners() {
    this._closeElement.addEventListener("click", () => this.close());
    this._popup.addEventListener("click", (event) => {
      if (event.target.classList.contains("popup_opened")) {
        this.close();
      }
    });
  }
}
