import {
  imagePhotoPopup,
  popupCaption,
  openPopup,
  popupPhotoElement,
} from "./utils.js";

export class Card {
  constructor(data, cardSelector) {
    this._text = data.name;
    this._link = data.link;
    this._cardSelector = document
      .querySelector(cardSelector)
      .content.querySelector(".elements__list-object");
    this._toggleLike = this._toggleLike.bind(this);
    this._deleteCard = this._deleteCard.bind(this);
    this._openPhoto = this._openPhoto.bind(this);
  }
  _getTemplate() {
    const cardElement = this._cardSelector.cloneNode(true);
    return cardElement;
  }
  createCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".elements__image");
    this._cardTitle = this._element.querySelector(".elements__title");
    this._cardTitle.textContent = this._text;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._text;
    this._setEventListeners();
    return this._element;
  }
  _toggleLike(event) {
    event.target.classList.toggle("elements__like_active");
  }
  _deleteCard(event) {
    const itemElement = event.target.closest(".elements__list-object");
    itemElement.remove();
  }
  _openPhoto() {
    imagePhotoPopup.src = this._link;
    popupCaption.textContent = this._text;
    imagePhotoPopup.alt = this._text;
    openPopup(popupPhotoElement);
  }
  _setEventListeners() {
    this._element
      .querySelector(".elements__like")
      .addEventListener("click", this._toggleLike);
    this._element
      .querySelector(".elements__delete")
      .addEventListener("click", this._deleteCard);
    this._cardImage.addEventListener("click", this._openPhoto);
  }
}
