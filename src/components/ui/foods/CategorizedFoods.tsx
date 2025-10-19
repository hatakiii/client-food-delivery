"use client";
import { CategoryType, FoodType } from "@/lib/types";

export const CategorizedFoods = ({
  foods,
  category,
}: {
  foods: FoodType[];
  category: CategoryType;
}) => {
  return (
    <div className="  p-5 flex flex-col gap-4 rounded-lg ">
      <h2>{category.name}</h2>
      <div className="flex flex-wrap gap-2">
        {foods.map((food: FoodType) => (
          <div
            key={food._id}
            className="w-99 h-85 rounded-2xl flex flex-col border-1 p-4 gap-5"
          >
            <div className="w-60 h-32 ">
              <img
                src={food.imageUrl}
                alt=""
                className="w-full h-full object-fill rounded-xl "
              />
            </div>

            <div className="w-60 h-15 flex flex-col gap-2">
              <div className="w-full h-5 flex">
                <h1 className="flex-1 text-red-600">{food.name}</h1>
                <p>${food.price}</p>
              </div>
              <div className="w-full h-8 ">{food.ingredients}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
