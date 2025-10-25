"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { FiMinus, FiPlus } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface FoodItem {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
}

interface FoodOrder {
  _id: string;
  totalPrice: number;
  status: string; // ✅ add status to distinguish Pending vs Delivered
  foodOrderItems: {
    _id: string;
    quantity: number;
    food: FoodItem;
  }[];
}

let backendUrl = "";

const env = process.env.NODE_ENV;
if (env === "development") {
  backendUrl = "http://localhost:4000";
} else if (env === "production") {
  backendUrl = "https://backend-food-delivery-two.vercel.app";
}

export const UserCart = () => {
  const [active, setActive] = useState<"cart" | "order">("cart");
  const [pendingOrders, setPendingOrders] = useState<FoodOrder[]>([]);
  const [deliveredOrders, setDeliveredOrders] = useState<FoodOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // ✅ Fetch all orders and split by status
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${backendUrl}/api/order`);
      const data = await res.json();

      const allOrders: FoodOrder[] = data.data || [];
      const pending = allOrders.filter((order) => order.status === "PENDING");
      const delivered = allOrders.filter(
        (order) => order.status === "DELIVERED"
      );

      setPendingOrders(pending);
      setDeliveredOrders(delivered);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete a single pending order
  const handleDeleteOrder = async (orderId: string) => {
    try {
      const res = await fetch(`${backendUrl}/api/order/${orderId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete order");
      setPendingOrders((prev) => prev.filter((o) => o._id !== orderId));
    } catch (err) {
      console.error(err);
      alert("❌ Failed to delete order");
    }
  };

  // ✅ Checkout handler
  const handleCheckout = async () => {
    try {
      const userId = localStorage.getItem("userId");
      console.log("Checkout payload:", { userId });

      if (!userId) {
        alert("⚠️ Please log in first!");
        return;
      }

      const res = await fetch(`${backendUrl}/api/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      const data = await res.json();

      if (res.status === 404) {
        alert("🛒 No pending orders to checkout.");
        return;
      }

      if (!res.ok) {
        throw new Error(data.message || "Checkout failed");
      }

      alert(`✅ ${data.message}`);
      await fetchOrders(); // refresh both lists after checkout
      setActive("order"); // ✅ switch view to Order History
    } catch (err) {
      console.error("Checkout error:", err);
      alert("❌ Checkout failed. Please try again.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="w-9 h-9 flex items-center justify-center rounded-full">
            <CiShoppingCart className="w-4 h-4" />
          </Button>
        </SheetTrigger>

        <SheetContent className="flex flex-col p-8 overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Order details</SheetTitle>
          </SheetHeader>

          {/* Toggle Bar */}
          <div className="relative w-full h-11 bg-gray-200 rounded-full flex items-center justify-between my-6">
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={cn(
                "absolute top-1 bottom-1 w-1/2 rounded-full",
                active === "cart" ? "left-1 bg-red-500" : "left-1/2 bg-red-500"
              )}
            />

            <button
              onClick={() => setActive("cart")}
              className={cn(
                "z-10 flex-1 text-center font-medium transition-colors",
                active === "cart" ? "text-white" : "text-gray-700"
              )}
            >
              Cart
            </button>

            <button
              onClick={() => setActive("order")}
              className={cn(
                "z-10 flex-1 text-center font-medium transition-colors",
                active === "order" ? "text-white" : "text-gray-700"
              )}
            >
              Orders
            </button>
          </div>

          {/* Main Content */}
          <Card className="w-full">
            <CardContent className="text-center space-y-6">
              {active === "cart" ? (
                <>
                  <p className="text-lg font-semibold text-red-500">
                    🛒 Your Cart (Pending Orders)
                  </p>
                  {loading ? (
                    <p>Loading...</p>
                  ) : pendingOrders.length === 0 ? (
                    <p className="text-gray-500">No items in cart yet.</p>
                  ) : (
                    pendingOrders.map((order) => (
                      <div key={order._id} className="text-left space-y-4">
                        {order.foodOrderItems.map((item) => (
                          <div
                            key={item._id}
                            className="flex gap-2.5 items-start"
                          >
                            <div className="w-31 h-30 relative overflow-hidden rounded-md">
                              <Image
                                src={item.food.imageUrl}
                                alt={item.food.name}
                                width={124}
                                height={120}
                                className="object-cover w-full h-full"
                                unoptimized
                              />
                            </div>

                            <div className="flex flex-col flex-1 gap-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="font-semibold">
                                    {item.food.name}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    ${item.food.price} × {item.quantity}
                                  </div>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDeleteOrder(order._id)}
                                >
                                  <IoCloseOutline
                                    size={16}
                                    className="text-red-500"
                                  />
                                </Button>
                              </div>

                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="size-9"
                                  >
                                    <FiMinus size={16} />
                                  </Button>
                                  <span>{item.quantity}</span>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="size-9"
                                  >
                                    <FiPlus size={16} />
                                  </Button>
                                </div>
                                <div className="font-semibold text-gray-700">
                                  $
                                  {(item.food.price * item.quantity).toFixed(2)}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}

                        <Separator className="my-4 border border-dashed border-[rgba(9,9,11,0.5)] bg-transparent" />
                        <div className="flex justify-between">
                          <span>Total:</span>
                          <span className="font-semibold">
                            ${order.totalPrice.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))
                  )}

                  {/* Checkout Button */}
                  {pendingOrders.length > 0 && (
                    <Button
                      variant="destructive"
                      className="w-full rounded-full bg-red-500 mt-4"
                      onClick={handleCheckout}
                    >
                      Checkout
                    </Button>
                  )}
                </>
              ) : (
                <>
                  <p className="text-lg font-semibold text-red-500">
                    📦 Order History
                  </p>
                  {loading ? (
                    <p>Loading...</p>
                  ) : deliveredOrders.length === 0 ? (
                    <p className="text-gray-500">No delivered orders yet.</p>
                  ) : (
                    deliveredOrders.map((order) => (
                      <div key={order._id} className="text-left space-y-4">
                        {order.foodOrderItems.map((item) => (
                          <div
                            key={item._id}
                            className="flex gap-2.5 items-start"
                          >
                            <div className="w-31 h-30 relative overflow-hidden rounded-md">
                              <Image
                                src={item.food.imageUrl}
                                alt={item.food.name}
                                width={124}
                                height={120}
                                className="object-cover w-full h-full"
                                unoptimized
                              />
                            </div>

                            <div className="flex flex-col flex-1 gap-2">
                              <div className="font-semibold">
                                {item.food.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                ${item.food.price} × {item.quantity}
                              </div>
                              <div className="text-sm text-green-600 font-medium">
                                ✅ Delivered
                              </div>
                            </div>
                          </div>
                        ))}
                        <Separator className="my-3 border border-dashed border-[rgba(9,9,11,0.5)] bg-transparent" />
                        <div className="flex justify-between text-sm">
                          <span>Total:</span>
                          <span className="font-semibold">
                            ${order.totalPrice.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </SheetContent>
      </Sheet>
    </div>
  );
};
