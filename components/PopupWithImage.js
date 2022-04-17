import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(".popup__image");
    this._popupCaption = this._popup.querySelector(".popup__caption");
  }
  open(data) {
    this._popupImage.src = data.link;
    this._popupCaption.textContent = data.name;
    this._popupCaption.alt = data.name;
    super.open();
  }
}
