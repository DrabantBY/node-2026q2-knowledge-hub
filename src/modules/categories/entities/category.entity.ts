export class Category {
  id: string;
  name: string;
  description: string;

  constructor(data: Partial<Category>) {
    Object.assign(this, data);
  }
}
