import Card from "./Card.js";

export default class Section {
  constructor({ items, popup }, containerSelector) {
    this._initialArray = items;
    this._popup = popup;
    this._container = document.querySelector(containerSelector);
  }

  _renderer(data) {
    const card = new Card(
      {
        data,
        handleCardClick: () => {
          this._popup.open(data);
        },
      },
      "#photo-card-template"
    );
    return card.createCard();
  }

  addItem(item) {
    const card = this._renderer(item);
    this._container.prepend(card);
  }

  renderItems() {
    this._initialArray.forEach((item) => this.addItem(item));
  }
}
