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

export type Employee =  {
  id:               number;
  uuid:             number;
  firstName:        string;
  lastName:         string;
  company:          string;
  workDepartment:   string;
  userId:           number;
  employerId:       number;
  employerRefId:    number;
  workEmail:        string;
  position:         string;
  jobTitle:         string;
  onboarded:        boolean;
  status:           string;
  verified:         boolean;
  password:         string;
  createdDate:      Date;
  createdBy:        string;
  lastActivityBy:   string;
  lastActivityDate: Date;
}