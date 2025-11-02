"use client";

import { useState, useEffect } from "react";
import { CartItem, FoodType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface FoodDetailProps {
  food: FoodType;
}

export const FoodDetail = ({ food }: FoodDetailProps) => {
  const [quantity, setQuantity] = useState(1);
  const [, setCartChanged] = useState(false); // just to trigger re-render

  const handleAddToCart = () => {
    if (!food._id) {
      alert("❌ Cannot add item: invalid food ID");
      return;
    }

    const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

    const existingIndex = cart.findIndex((item) => item.foodId === food._id);

    if (existingIndex >= 0) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({
        foodId: food._id,
        name: food.name,
        price: food.price,
        quantity,
        imageUrl: food.imageUrl,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`✅ ${food.name} added to cart!`);

    // Trigger re-render in this component and notify other components
    setCartChanged((prev) => !prev);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-11 h-11 rounded-full text-red-500 border border-red-400"
        >
          +
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl p-6 bg-white rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            {food.name}
          </DialogTitle>
          <DialogDescription className="text-gray-500">
            {food.ingredients || "Delicious and freshly prepared!"}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col md:flex-row gap-6 mt-4">
          <img
            src={food.imageUrl}
            alt={food.name}
            className="rounded-xl w-full md:w-1/2 h-80 object-cover"
          />

          <div className="flex flex-col justify-between w-full md:w-1/2">
            <div>
              <p className="text-gray-500 mb-1">Total price</p>
              <p className="text-2xl font-semibold">
                ${(food.price * quantity).toFixed(2)}
              </p>
            </div>

            <div className="flex items-center gap-4 mt-6">
              <Button
                variant="outline"
                className="w-10 h-10 rounded-full"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                –
              </Button>
              <span className="text-lg font-semibold">{quantity}</span>
              <Button
                variant="outline"
                className="w-10 h-10 rounded-full"
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </Button>
            </div>

            <Button
              onClick={handleAddToCart}
              className="mt-6 bg-red-500 hover:bg-red-600 text-white rounded-full h-11"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
