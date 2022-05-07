export default class Api {
  constructor(data) {
    this._url = data.url;
    this._token = data.token;
  }
  // Обработчик статуса
  _errorHandler(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  // Запрос информации о пользователе
  getUser() {
    return fetch(`${this._url}users/me`, {
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._errorHandler(res));
  }
  // Запрос карточек с сервера
  getinitialCards() {
    return fetch(`${this._url}cards`, {
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._errorHandler(res));
  }
  // Редактирование профиля
  editProfile(name, about) {
    return fetch(`${this._url}users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => this._errorHandler(res));
  }
  // Добавление карточки
  addCard(name, link) {
    return fetch(`${this._url}cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => this._errorHandler(res));
  }
  // Лайк карточке
  addLike(id) {
    return fetch(`${this._url}cards/${id}/likes`, {
      method: "PUT",
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._errorHandler(res));
  }
  // Удаление лайка
  deleteLike(id) {
    return fetch(`${this._url}cards/${id}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._errorHandler(res));
  }

  deleteCard(id) {
    return fetch(`${this._url}cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._errorHandler(res));
  }
  editAvatar() {
    return fetch(`${this._url}users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
      },
      body: JSON.stringify({
        avatar,
      }),
    }).then((res) => this._errorHandler(res));
  }
}
