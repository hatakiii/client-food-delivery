"use client";
import { CategoryType, FoodType } from "@/lib/types";
import { FoodDetail } from "./FoodDetail";

export const CategorizedFoods = ({
  foods,
  category,
}: {
  foods: FoodType[];
  category: CategoryType;
}) => {
  return (
    <div className="p-4 flex flex-col gap-5 rounded-lg">
      <h2 className="text-white font-semibold text-3xl">{category.name}</h2>

      <div className="flex flex-wrap gap-4">
        {foods.map((food) => (
          <div
            key={food._id}
            className="w-99 h-85 rounded-2xl flex flex-col border p-4 gap-4 bg-white shadow-md hover:shadow-lg transition"
          >
            {/* Image & Add Button */}
            <div className="relative w-full h-52">
              <img
                src={food.imageUrl}
                alt={food.name}
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute bottom-4 right-4">
                <FoodDetail food={food} />
              </div>
            </div>

            {/* Text Info */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <h1 className="text-red-600 font-semibold text-xl">
                  {food.name}
                </h1>
                <p className="font-semibold text-lg">${food.price}</p>
              </div>
              <p className="text-gray-600 text-sm line-clamp-2">
                {food.ingredients}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
