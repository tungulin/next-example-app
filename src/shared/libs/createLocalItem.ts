export class CreateLocalItem<T extends any> {
  private _key: string;

  constructor(key: string) {
    this._key = key;
  }

  get(): T | null {
    const value = localStorage.getItem(this._key);

    if (value !== null) {
      return JSON.parse(value);
    }

    return value;
  }

  set(value: T) {
    localStorage.setItem(this._key, JSON.stringify(value));
  }
}
