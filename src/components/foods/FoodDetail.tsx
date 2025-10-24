//FoodDetail.tsx
"use client";

import { useState } from "react";
import { FoodType } from "@/lib/types";
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
let backendUrl = "";

const env = process.env.NODE_ENV;
if (env == "development") {
  backendUrl = "http://localhost:4000";
} else if (env == "production") {
  backendUrl = "https://backend-food-delivery-two.vercel.app";
}
export const FoodDetail = ({ food }: FoodDetailProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        alert("⚠️ Please log in first!");
        return;
      }

      const res = await fetch(`${backendUrl}/api/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          items: [{ foodId: food._id, quantity }],
          totalPrice: food.price * quantity,
        }),
      });

      if (!res.ok) throw new Error("Failed to add to cart");

      alert(`✅ ${food.name} added to cart!`);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add to cart");
    }
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
          {/* Image */}
          <img
            src={food.imageUrl}
            alt={food.name}
            className="rounded-xl w-full md:w-1/2 h-80 object-cover"
          />

          {/* Details */}
          <div className="flex flex-col justify-between w-full md:w-1/2">
            <div>
              <p className="text-gray-500 mb-1">Total price</p>
              <p className="text-2xl font-semibold">
                ${(food.price * quantity).toFixed(2)}
              </p>
            </div>

            {/* Quantity Controls */}
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

            {/* Add to Cart Button */}
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
