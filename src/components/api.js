export default class Api {
  constructor(data) {
    this._url = data.url;
    this._headers = data.headers;
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
      headers: this._headers,
    }).then((res) => this._errorHandler(res));
  }
  // Запрос карточек с сервера
  getinitialCards() {
    return fetch(`${this._url}cards`, {
      headers: this._headers,
    }).then((res) => this._errorHandler(res));
  }
  // Редактирование профиля
  editProfile(name, about) {
    return fetch(`${this._url}users/me`, {
      method: "PATCH",
      headers: this._headers,
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
      headers: this._headers,
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
      headers: this._headers,
    }).then((res) => this._errorHandler(res));
  }
  // Удаление лайка
  deleteLike(id) {
    return fetch(`${this._url}cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._errorHandler(res));
  }

  deleteCard(id) {
    return fetch(`${this._url}cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._errorHandler(res));
  }
  editAvatar(avatar) {
    return fetch(`${this._url}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar["link-avatar"],
      }),
    }).then((res) => this._errorHandler(res));
  }
}
