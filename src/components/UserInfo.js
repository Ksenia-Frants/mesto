export default class UserInfo {
  constructor({ nameSelector, descriptionSelector, profileAvatar }) {
    this._name = document.querySelector(nameSelector);
    this._description = document.querySelector(descriptionSelector);
    this._profileAvatar = document.querySelector(profileAvatar);
  }
  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._description.textContent,
    };
  }
  setUserInfo(user) {
    this._name.textContent = user.name;
    this._description.textContent = user.about;
  }
  setUserAvatar(data) {
    this._profileAvatar.src = data.avatar;
  }
}
