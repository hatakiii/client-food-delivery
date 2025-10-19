export type FoodType = {
  _id?: string;
  name: string;
  price: number;
  ingredients: string;
  imageUrl: string;
  categoryId: CategoryType;
};

export type CategoryType = {
  name: string;
  _id: string;
};
