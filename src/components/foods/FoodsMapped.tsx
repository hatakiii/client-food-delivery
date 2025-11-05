"use client";
import React from "react";
import { CategoryType, FoodType } from "@/lib/types";
import { CategorizedFoods } from "./CategorizedFoods";

let backendUrl = "";

const env = process.env.NODE_ENV;
if (env == "development") {
  backendUrl = "http://localhost:4000";
} else if (env == "production") {
  backendUrl = "https://backend-food-delivery-two.vercel.app";
}

export const FoodsMapped = () => {
  const [categories, setCategories] = React.useState<CategoryType[]>([]);
  const [foods, setFoods] = React.useState<FoodType[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  const getCategories = async () => {
    const result = await fetch(`${backendUrl}/api/categories`);
    const responseData = await result.json();
    const { data } = responseData;
    setCategories(data);
  };

  const getFoods = async () => {
    const result = await fetch(`${backendUrl}/api/food`);
    const responseData = await result.json();
    setFoods(responseData.data);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      await Promise.all([getCategories(), getFoods()]);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#404040] p-22 flex flex-col gap-12">
        {[1, 2, 3].map((c) => (
          <div key={c} className="flex flex-col gap-5">
            <div className="w-52 h-8 bg-gray-600 rounded-md animate-pulse" />
            <div className="flex flex-wrap gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-99 h-85 rounded-2xl bg-gray-300 animate-pulse"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-[#404040] p-22">
      {categories.map((category) => {
        return (
          <CategorizedFoods
            key={category._id}
            foods={foods.filter((food) => food.categoryId._id == category._id)}
            category={category}
          />
        );
      })}
    </div>
  );
};
