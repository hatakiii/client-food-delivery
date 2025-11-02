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

export type StepProps = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  handleNextStep: () => void;
  handlePrevStep: () => void;
};

export interface CartItem {
  foodId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}
