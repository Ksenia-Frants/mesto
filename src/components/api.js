export default class Api {
  constructor(data) {
    this._url = data.url;
    this._token = data.token;
  }
  _errorHandler(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  getUser() {
    return fetch(`${this._url}users/me`, {
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._errorHandler(res));
  }

  getinitialCards() {
    return fetch(`${this._url}cards`, {
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._errorHandler(res));
  }

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
  addCard(data) {
    return fetch(`${this._url}cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._errorHandler(res));
  }
  addLike() {}
}
