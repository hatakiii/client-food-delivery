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
    <div className=" p-4 flex flex-col gap-5 rounded-lg ">
      <h2 className="text-white font-semibold text-3xl">{category.name}</h2>
      <div className="flex flex-wrap gap-2">
        {foods.map((food: FoodType) => (
          <div
            key={food._id}
            className="w-99 h-85 rounded-2xl flex flex-col border-1 p-4 gap-5 bg-white"
          >
            <div className="w-91 h-52 ">
              <img
                src={food.imageUrl}
                alt=""
                className="w-full h-full object-fill rounded-xl "
              />
              <FoodDetail />
            </div>

            <div className="w-91 h-20 flex flex-col gap-2">
              <div className="w-full flex">
                <h1 className="flex-1 text-red-600 font-semibold text-2xl">
                  {food.name}
                </h1>
                <p className="font-semibold text-2xl ">${food.price}</p>
              </div>
              <div className="w-full text-xl leading-5 overflow-hidden text-ellipsis">
                {food.ingredients}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
