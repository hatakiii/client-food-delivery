"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { CiShoppingCart } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";
import { CartItem } from "@/lib/types";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

let backendUrl = "";

const env = process.env.NODE_ENV;
if (env == "development") {
  backendUrl = "http://localhost:4000";
} else if (env == "production") {
  backendUrl = "https://backend-food-delivery-two.vercel.app";
}

export const UserCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [orderHistory, setOrderHistory] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  useEffect(() => {
    const savedCart: CartItem[] = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );
    setCartItems(savedCart);
    fetchUserOrders();
  }, []);

  const handleRemoveItem = (foodId: string) => {
    const updated = cartItems.filter((item) => item.foodId !== foodId);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const handleQuantityChange = (foodId: string, delta: number) => {
    const updated = cartItems.map((item) =>
      item.foodId === foodId
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const fetchUserOrders = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    try {
      setLoadingOrders(true);
      const res = await fetch(`${backendUrl}/api/order?userId=${userId}`);
      const data = await res.json();
      if (res.ok) setOrderHistory(data.data || []);
      else console.error("Failed to fetch orders:", data.message);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoadingOrders(false);
    }
  };
  const router = useRouter();

  const handleCheckout = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("⚠️ Please log in first!");
        router.push("/login");

        return;
      }

      if (!deliveryAddress) {
        alert("⚠️ Please add your delivery address before checkout!");
        return;
      }

      if (cartItems.length === 0) {
        alert("⚠️ Your cart is empty!");
        return;
      }

      const paymentConfirmed = confirm(
        `Your total is $${(totalPrice + 0.99).toFixed(
          2
        )}. Do you want to proceed with payment?`
      );
      if (!paymentConfirmed) {
        alert("❌ Payment cancelled");
        return;
      }

      const orderData = {
        userId,
        items: cartItems.map((item) => ({
          foodId: item.foodId,
          quantity: item.quantity,
        })),
        totalPrice: totalPrice + 0.99,
        deliveryAddress,
      };

      const res = await fetch(`${backendUrl}/api/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Checkout failed");

      alert(`✅ Order placed successfully! Order ID: ${data.order._id}`);

      setCartItems([]);
      localStorage.removeItem("cart");
      fetchUserOrders();
    } catch (err) {
      console.error("Checkout error:", err);
      alert("❌ Checkout failed. Please try again.");
    }
  };

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="w-9 h-9 flex items-center justify-center rounded-full">
            <CiShoppingCart className="w-4 h-4" />
          </Button>
        </SheetTrigger>

        <SheetContent className="flex flex-col p-8 overflow-y-auto bg-[#71717a] w-[535px] h-screen overflow-scroll">
          <SheetHeader className="p-0 w-full h-9 ">
            <SheetTitle>Order details</SheetTitle>
          </SheetHeader>

          <Tabs defaultValue="card" className="w-[471px] h-full gap-6">
            <TabsList className="w-full h-11 bg-white">
              <TabsTrigger value="card">Card</TabsTrigger>
              <TabsTrigger value="order">Order</TabsTrigger>
            </TabsList>

            {/* Card */}
            <TabsContent
              value="card"
              className="flex flex-col flex-1 h-full gap-6"
            >
              <Card className="flex-1 w-[471px] max-h-[532px] relative">
                <CardHeader className="p-4">
                  <CardTitle>My cart</CardTitle>
                  <div className="w-[439px] flex flex-col gap-4 max-h-72 overflow-y-scroll overflow-hidden ">
                    {cartItems.length === 0 ? (
                      <p className="text-gray-400">Your cart is empty</p>
                    ) : (
                      cartItems.map((item) => (
                        <div key={item.foodId}>
                          <div className="w-[305px] h-30 flex gap-[10px]">
                            <Image
                              src={item.imageUrl}
                              alt={item.name}
                              width={124}
                              height={120}
                            />
                            <div className="w-[305px] h-30 flex flex-col gap-6">
                              <div className="w-[305px] h-15 flex flex-col relative">
                                <div className="w-[259px] h-7">
                                  <p className="text-red-500 text-base font-bold leading-7">
                                    {item.name}
                                  </p>
                                </div>
                                <div className="w-[259px] h-8">
                                  <h1 className="text-foreground text-xs font-normal leading-4">
                                    ${item.price.toFixed(2)} each
                                  </h1>
                                </div>
                                <button
                                  className="absolute top-0 right-0 w-9 h-9 rounded-full border-1 border-[#EF4444] flex items-center justify-center"
                                  onClick={() => handleRemoveItem(item.foodId)}
                                >
                                  <IoIosClose className="text-[#EF4444]" />
                                </button>
                              </div>
                              <div className="w-[305px] h-9 flex items-center justify-between">
                                <div className="w-[105px] h-9 flex items-center justify-between">
                                  <div
                                    className="w-9 h-9 flex items-center justify-center text-xl cursor-pointer"
                                    onClick={() =>
                                      handleQuantityChange(item.foodId, -1)
                                    }
                                  >
                                    -
                                  </div>
                                  <div className="text-[#09090B] font-semibold text-lg/7">
                                    {item.quantity}
                                  </div>
                                  <div
                                    className="w-9 h-9 flex items-center justify-center text-xl cursor-pointer"
                                    onClick={() =>
                                      handleQuantityChange(item.foodId, 1)
                                    }
                                  >
                                    +
                                  </div>
                                </div>
                                <div className="w-[93px] h-7 text-right text-[#09090B] font-semibold text-lg/7">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </div>
                              </div>
                            </div>
                          </div>
                          <Separator className="w-full border border-dashed border-[rgba(9,9,11,0.5)] bg-transparent" />
                        </div>
                      ))
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex gap-6 w-[439px] h-[116px] bottom-4 right-4 px-4">
                  <div className="flex flex-col gap-3 w-full h-full">
                    <Label
                      htmlFor="tabs-demo-name"
                      className="text-[#71717A] text-xl/7 font-semibold"
                    >
                      Delivery Location
                    </Label>
                    <Input
                      id="tabs-demo-name"
                      className="w-full h-15 flex flex-col items-start"
                      placeholder="Please share your complete address"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment info</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex">
                      <p className="flex-1">Items</p>
                      <h1>${totalPrice.toFixed(2)}</h1>
                    </div>
                    <div className="flex">
                      <p className="flex-1">Shipping</p>
                      <h1>$0.99</h1>
                    </div>
                    <Separator className="w-full" />
                    <div className="flex">
                      <p className="flex-1">Total</p>
                      <h1>${(totalPrice + 0.99).toFixed(2)}</h1>
                    </div>
                    <Button className="w-full" onClick={() => handleCheckout()}>
                      Checkout
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Order */}
            <TabsContent value="order">
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  {loadingOrders ? (
                    <p>Loading orders...</p>
                  ) : orderHistory.length === 0 ? (
                    <p className="text-gray-500">No past orders yet.</p>
                  ) : (
                    orderHistory.map((order) => (
                      <div
                        key={order._id}
                        className="border p-3 rounded-md bg-white"
                      >
                        <div className="flex justify-between">
                          <p className="font-semibold">Order #{order._id}</p>
                          <p className="text-sm text-gray-500">
                            {order.status}
                          </p>
                        </div>
                        <p className="text-sm text-gray-400">
                          {new Date(order.createdAt).toLocaleString()}
                        </p>
                        <div className="mt-2">
                          {order.foodOrderItems.map((item: any) => (
                            <div
                              key={item.food._id}
                              className="flex justify-between"
                            >
                              <p>
                                {item.food.name} x {item.quantity}
                              </p>
                              <p>
                                ${(item.food.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          ))}
                        </div>
                        <div className="mt-2 flex justify-between font-semibold">
                          <p>Total</p>
                          <p>${order.totalPrice.toFixed(2)}</p>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </SheetContent>
      </Sheet>
    </div>
  );
};
