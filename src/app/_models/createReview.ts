
export class CreateReview {
  public product: number;
  public rate: number;
  public text: string;
  public created_at: number = Date.now();

  constructor(
    product: number = 0,
    rate: number = 0,
    text: string = ''
  ){
    this.product = product;
    this.rate = rate;
    this.text = text;
  }
}
