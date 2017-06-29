import { User } from './user';

export class Review {
  public id: number;
  public product: number;
  public rate: number;
  public text: string;
  public created_at: number;
  public created_by:User;

  constructor(
    id: number = 0,
    product: number = 0,
    rate: number = 0,
    text: string = '',
    created_at: number = Date.now(),
    created_by: User = new User()
  ){
    this.id = id;
    this.product = product;
    this.rate = rate;
    this.text = text;
    this.created_at = created_at;
    this.created_by = created_by;
  }
}
