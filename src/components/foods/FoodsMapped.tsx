"use client";
import React from "react";
import { CategoryType, FoodType } from "@/lib/types";
import { CategorizedFoods } from "./CategorizedFoods";

export const FoodsMapped = () => {
  const [categories, setCategories] = React.useState<CategoryType[]>([]);
  const [foods, setFoods] = React.useState<FoodType[]>([]);

  const getCategories = async () => {
    const result = await fetch("http://localhost:4000/api/categories");
    const responseData = await result.json();
    const { data } = responseData;
    setCategories(data);
  };

  const getFoods = async () => {
    const result = await fetch("http://localhost:4000/api/food");
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
