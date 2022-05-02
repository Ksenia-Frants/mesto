export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }
  getUser() {
    return fetch("https://nomoreparties.co/v1/cohort-40/users/me", {
      method: "GET",
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  getinitialCards() {
    return fetch("https://mesto.nomoreparties.co/v1/cohort-40/cards", {
      method: "GET",
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
