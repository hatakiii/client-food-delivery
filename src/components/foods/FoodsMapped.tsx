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
    getCategories();
    getFoods();
  }, []);

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
