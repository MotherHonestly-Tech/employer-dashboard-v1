export class User {
  constructor(
    public uuid: number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public employerRefId: number,
    private _token: Token,
    private _tokenExpirationDate: Date
  ) {}

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }

    return this._token;
  }
}

export interface Token {
  accessToken: string;
  refreshToken: string;
}

export type Employee = {
  uuid: number;
  firstName: string;
  lastName: string;
  workEmail: string;
  role: string;
  employerRefId: number;
}