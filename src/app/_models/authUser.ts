
export class AuthUser {

  constructor(
    public password: string = '',
    public username: string = ''
  ){
    this.password = password;
    this.username = username;
  }
}
