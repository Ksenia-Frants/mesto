export default class Card {
  constructor({ data, handleCardClick }, cardSelector) {
    this._data = data;
    this._text = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._handleCardClick = handleCardClick;
    this._cardSelector = cardSelector;
  }
  //Нашли элемент карточки
  _getTemplate() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return this._cardElement;
  }
  //Создали карточку
  createCard() {
    //Нашли в элементе карточки изображение и название
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".card__image");
    this._cardTitle = this._element.querySelector(".card__title");

    //Заполнили элементы данными
    this._cardTitle.textContent = this._data.name;
    this._cardImage.src = this._data.link;
    this._cardImage.alt = this._data.name;

    //Нашли элементы лайка и удаления
    this._likeButton = this._element.querySelector(".card__like");
    this._deleteButton = this._element.querySelector(".card__delete");

    // //Счетчик лайков
    // this._likeNumber = this._element.querySelector(".card__like-number");
    // this._likeNumber.textContent = this._likes;

    this._setEventListeners();

    return this._element;
  }

  //Установили лайк
  _toggleLike = () => {
    this._likeButton.classList.toggle("card__like_active");
  };

  //Удалили карточку
  _deleteCard = () => {
    this._cardElement.remove();
  };

  //Установили слушатели
  _setEventListeners() {
    this._likeButton.addEventListener("click", this._toggleLike);
    this._deleteButton.addEventListener("click", this._deleteCard);
    this._cardImage.addEventListener("click", this._handleCardClick);
  }
}
