export class User {
  public id: number = 0;
  public email: string;
  public first_name: string;
  public last_name: string;
  public username: string;
  public token: string;

  constructor(
    id: number = 0,
    email: string = '',
    first_name: string = '',
    last_name: string = '',
    username: string = '',
    token: string = ''
  ){
    this.id = id;
    this.email = email;
    this.first_name = first_name;
    this.last_name = last_name;
    this.username = username;
    this.token = token;
  }
}
