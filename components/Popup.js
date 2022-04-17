export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
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
  _handleOverlayClose(event) {
    if (event.key === "Escape") {
      this_popup.close();
    }
  }
  setEventListeners = () => {
    const closeElement = this._popup.querySelector(".popup__close");
    closeElement.addEventListener("click", () => this.close());
    document.addEventListener("click", this._handleOverlayClose);
  };
}

/*setEventListeners = () => {
  const closeElement = this._popup.querySelector(".popup__close");
  closeElement.addEventListener("click", () => {
    document.addEventListener("click", this._handleOverlayClose);
  });
};
}*/
