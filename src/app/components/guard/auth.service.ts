import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  props = ['accessTokenId', 'currentUserData'];
  propsPrefix = '$SM$';
  accessTokenId;
  currentUserData;
  

  constructor() {
    const self = this;
    for (let i = 0; i < this.props.length; i++) {
      self[this.props[i]] = this.load(this.props[i]);
    }
  }

  public save() {
    const self = this;
    for (let i = 0; i < this.props.length; i++) {
      this._save(sessionStorage, this.props[i], self[this.props[i]]);
    }
  }

  public setUser (userData) {
    this.accessTokenId = userData[0].token;
    this.currentUserData = JSON.stringify(userData[0].user);
  }

  // public clearUser() {
  public clearUser() {
    this.accessTokenId = null;
    this.currentUserData = null;
    sessionStorage.$SM$URL = null;
  }

  public clearStorage() {
    for (let i = 0; i < this.props.length; i++) {
      this._save(sessionStorage, this.props[i], null);
      this._save(localStorage, this.props[i], null);
    }
  }

  private _save(storage, name, value) {
    const key = this.propsPrefix + name;
    if (value == null) {
      value = '';
    }
    storage[key] = value;
  }

  load(name) {
    const key = this.propsPrefix + name;
    return localStorage[key] || sessionStorage[key] || null;
  }
}
