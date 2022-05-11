export default class Card {
  constructor(
    { data, userId, handleCardClick, handleDeleteCard, handleLikeCard },
    cardSelector
  ) {
    this._data = data;
    this._id = data.id;
    this._text = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._cardId = data._id;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeCard = handleLikeCard;
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

    //Счетчик лайков
    this._likeNumber = this._element.querySelector(".card__like-number");
    this._likeNumber.textContent = this._likes.length;

    // this._setLike()

    this._setEventListeners();
    this.toggleLike(this._likes);

    return this._element;
  }

  setLike() {
    this._cardLiked = this._likes.some((user) => user._id === this._userId);
    return this._cardLiked;
  }
  //Установили лайк
  toggleLike(newLikes) {
    this._likes = newLikes;
    this._likeNumber.textContent = this._likes.length;
    if (this.setLike()) {
      this._likeButton.classList.add("card__like_active");
    } else {
      this._likeButton.classList.remove("card__like_active");
    }
  }

  //Удалили карточку
  _deleteCardHandler() {
    const data = {
      card: this._element,
      cardId: this._cardId,
    };
    this._handleDeleteCard(data);
  }

  //Установили слушатели: лайк, удаление, зум фото
  _setEventListeners() {
    this._likeButton.addEventListener("click", () =>
      this._handleLikeCard(this._cardId)
    );
    if (this._userId === this._ownerId) {
      // добавить класс отображения иконки
      // повесить слушатель удаления карточки на иконку
      this._deleteButton.classList.add("card__delete_active");
      this._deleteButton.addEventListener("click", () => {
        this._deleteCardHandler();
      });
    }
    this._cardImage.addEventListener("click", this._handleCardClick);
  }
}
