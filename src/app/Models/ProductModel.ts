export class ProductModel {
  constructor(
    public id: number,
    public site_id: number,
    public product_category_id: number,
    public name: string,
    public description: string,
    public image: string
  ) {
  }
}
