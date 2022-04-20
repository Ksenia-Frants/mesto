export default class UserInfo {
  constructor({ nameSelector, descriptionSelector }) {
    this._name = document.querySelector(nameSelector);
    this._description = document.querySelector(descriptionSelector);
  }
  getUserInfo() {
    const user = {
      name: this._name.textContent,
      description: this._description.textContent,
    };
    return user;
  }
  setUserInfo(user) {
    this._name.textContent = user.name;
    this._description.textContent = user.description;
  }
}
