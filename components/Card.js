import { openPopup } from "../utils/utils.js";

import {
  imagePhotoPopup,
  popupCaption,
  popupPhotoElement,
} from "../utils/constants.js";

export class Card {
  constructor(data, cardSelector) {
    this._text = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }
  _getTemplate() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return this._cardElement;
  }
  createCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".card__image");
    this._cardTitle = this._element.querySelector(".card__title");
    this._cardTitle.textContent = this._text;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._text;
    this._likeButton = this._element.querySelector(".card__like");
    this._deleteButton = this._element.querySelector(".card__delete");
    this._setEventListeners();
    return this._element;
  }
  _toggleLike = () => {
    this._likeButton.classList.toggle("card__like_active");
  };
  _deleteCard = () => {
    this._cardElement.remove();
  };
  _openPhoto = () => {
    imagePhotoPopup.src = this._link;
    popupCaption.textContent = this._text;
    imagePhotoPopup.alt = this._text;
    openPopup(popupPhotoElement);
  };
  _setEventListeners() {
    this._likeButton.addEventListener("click", this._toggleLike);
    this._deleteButton.addEventListener("click", this._deleteCard);
    this._cardImage.addEventListener("click", this._openPhoto);
  }
}
