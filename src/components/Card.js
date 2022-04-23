import { openPopup } from "../utils/utils.js";

import {
  imagePhotoPopup,
  popupCaption,
  popupPhotoElement,
} from "../utils/constants.js";

export default class Card {
  constructor({ data, handleCardClick }, cardSelector) {
    this._data = data;
    this._text = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
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
    this._cardTitle.textContent = this._data.name;
    this._cardImage.src = this._data.link;
    this._cardImage.alt = this._data.name;
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
  _setEventListeners() {
    this._likeButton.addEventListener("click", this._toggleLike);
    this._deleteButton.addEventListener("click", this._deleteCard);
    this._cardImage.addEventListener("click", () =>
      this._handleCardClick({
        name: this._text,
        src: this._link,
      })
    );
  }
}
