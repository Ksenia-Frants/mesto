import Popup from "./Popup.js";

export default class PopupDelete extends Popup {
  constructor(popupSelector, { formSubmitHandler }) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._form = this._popup.querySelector(".popup__form");
    this._submit = this._submit.bind(this);
    this._data = null;
  }
  _submit(evt) {
    evt.preventDefault();
    this._formSubmitHandler(this._data);
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._submit);
  }
  setData(data) {
    this._data = data;
  }
}
