"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { FiMinus, FiPlus } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import { UserLocation } from "@/app/_components/UserLocation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "lucide-react";

interface FoodItem {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
}

interface FoodOrder {
  _id: string;
  totalPrice: number;
  status: string;
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
  const [pendingOrders, setPendingOrders] = useState<FoodOrder[]>([]);
  const [deliveredOrders, setDeliveredOrders] = useState<FoodOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [deliveryAddress, setDeliveryAddress] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      const res = await fetch(`${backendUrl}/api/order?userId=${userId}`);
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

  const handleCheckout = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("⚠️ Please log in first!");
        return;
      }

      if (!deliveryAddress) {
        alert("⚠️ Please add your delivery address before checkout!");
        return;
      }

      const res = await fetch(`${backendUrl}/api/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, deliveryAddress }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Checkout failed");

      alert(`✅ ${data.message}`);
      await fetchOrders();
    } catch (err) {
      console.error("Checkout error:", err);
      alert("❌ Checkout failed. Please try again.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="w-134 h-full">
      <Sheet>
        <SheetTrigger asChild>
          <Button className="w-9 h-9 flex items-center justify-center rounded-full">
            <CiShoppingCart className="w-4 h-4" />
          </Button>
        </SheetTrigger>

        <SheetContent className="flex flex-col p-8 overflow-y-auto bg-[#71717a] ">
          <SheetHeader>
            <SheetTitle>Order details</SheetTitle>
          </SheetHeader>
          <div>
            <div className="flex w-full max-w-sm flex-col gap-6">
              <Tabs defaultValue="card">
                <TabsList className="w-full h-11 bg-white">
                  <TabsTrigger value="card">Card</TabsTrigger>
                  <TabsTrigger value="order">Order</TabsTrigger>
                </TabsList>
                <TabsContent value="card" className="flex flex-col">
                  <Card className="flex-1">
                    <CardHeader>
                      <CardTitle>My cart</CardTitle>
                      <div className="w-full h-30 flex">
                        <Image
                          src={"/login.jpg"}
                          alt=""
                          width={124}
                          height={120}
                        />
                        <div className="w-[305px] h-full">
                          <p>Sunshine Stackers</p>
                          <h1>
                            Fluffy pancakes stacked with fruits, cream, syrup,
                            and powdered sugar.
                          </h1>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="tabs-demo-name">
                          Delivery Location
                        </Label>
                        <Input
                          id="tabs-demo-name"
                          placeholder="Please share your complete address"
                        />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Payment info</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex">
                        <p className="flex-1">Items</p>
                        <h1>$25.98</h1>
                      </div>
                      <div className="flex">
                        <p className="flex-1">Shipping</p>
                        <h1>$0.99</h1>
                      </div>
                      <Separator className="w-full" />
                      <div className="flex">
                        <p className="flex-1">Total</p>
                        <h1>$25.97</h1>
                      </div>
                      <Button className="w-full">Checkout</Button>
                    </CardContent>
                  </Card>
                </TabsContent>
                {/* Order */}
                <TabsContent value="order">
                  <Card>
                    <CardHeader>
                      <CardTitle>Order History</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex">
                        <div className="flex flex-1">
                          <p>$26.97</p>
                          <div>(#20156)</div>
                        </div>
                        <div>Pending</div>
                      </div>
                      <div className="flex">
                        <p className="flex-1">Sunshine Stackers</p>
                        <h1>x1</h1>
                      </div>
                      <div className="flex">
                        <p className="flex-1">2024/12/20</p>
                        <h1></h1>
                      </div>
                      <div className="flex">
                        <p className="flex-1">
                          2024/12/СБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd
                          negdsen emneleg | 100 айлын гүүрэн гарцны хойд талд 4д
                          ногоонСБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdsen
                          emneleg | 100 айлын гүүрэн гарцны хойд талд 4д
                          ногоон20
                        </p>
                        <h1></h1>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
