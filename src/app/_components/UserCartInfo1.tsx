// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// import { Separator } from "@/components/ui/separator";
// import { cn } from "@/lib/utils";
// import Image from "next/image";
// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";
// import { CiShoppingCart } from "react-icons/ci";
// import { FiMinus, FiPlus } from "react-icons/fi";
// import { IoCloseOutline } from "react-icons/io5";
// import { UserLocation } from "@/app/_components/UserLocation";
// import { IoIosClose } from "react-icons/io";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { Badge } from "lucide-react";
// import { UserCartInfo } from "./UserCartInfo";
// import { UserCartHistory } from "./UserCartHistory";

// interface FoodItem {
//   _id: string;
//   name: string;
//   price: number;
//   imageUrl: string;
// }

// interface FoodOrder {
//   _id: string;
//   totalPrice: number;
//   status: string;
//   foodOrderItems: {
//     _id: string;
//     quantity: number;
//     food: FoodItem;
//   }[];
// }

// let backendUrl = "";

// const env = process.env.NODE_ENV;
// if (env === "development") {
//   backendUrl = "http://localhost:4000";
// } else if (env === "production") {
//   backendUrl = "https://backend-food-delivery-two.vercel.app";
// }

// export const UserCartInfo1 = () => {
//   const [pendingOrders, setPendingOrders] = useState<FoodOrder[]>([]);
//   const [deliveredOrders, setDeliveredOrders] = useState<FoodOrder[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [deliveryAddress, setDeliveryAddress] = useState("");
//   const [active, setActive] = useState<boolean>(false);

//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       const userId = localStorage.getItem("userId");
//       if (!userId) return;

//       const res = await fetch(`${backendUrl}/api/order?userId=${userId}`);
//       const data = await res.json();

//       const allOrders: FoodOrder[] = data.data || [];
//       const pending = allOrders.filter((order) => order.status === "PENDING");
//       const delivered = allOrders.filter(
//         (order) => order.status === "DELIVERED"
//       );

//       setPendingOrders(pending);
//       setDeliveredOrders(delivered);
//     } catch (error) {
//       console.error("Failed to fetch orders", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteOrder = async (orderId: string) => {
//     try {
//       const res = await fetch(`${backendUrl}/api/order/${orderId}`, {
//         method: "DELETE",
//       });
//       if (!res.ok) throw new Error("Failed to delete order");
//       setPendingOrders((prev) => prev.filter((o) => o._id !== orderId));
//     } catch (err) {
//       console.error(err);
//       alert("❌ Failed to delete order");
//     }
//   };

//   const handleCheckout = async () => {
//     try {
//       const userId = localStorage.getItem("userId");
//       if (!userId) {
//         alert("⚠️ Please log in first!");
//         return;
//       }

//       if (!deliveryAddress) {
//         alert("⚠️ Please add your delivery address before checkout!");
//         return;
//       }

//       const res = await fetch(`${backendUrl}/api/checkout`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId, deliveryAddress }),
//       });

//       const data = await res.json();

//       if (!res.ok) throw new Error(data.message || "Checkout failed");

//       alert(`✅ ${data.message}`);
//       await fetchOrders();
//     } catch (err) {
//       console.error("Checkout error:", err);
//       alert("❌ Checkout failed. Please try again.");
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   return (
//     <div>
//       <div className="relative w-full h-11 bg-gray-200 rounded-full flex items-center justify-between my-6">
//         <motion.div
//           layout
//           transition={{ type: "spring", stiffness: 300, damping: 25 }}
//           className={cn(
//             "absolute top-1 bottom-1 w-1/2 rounded-full",
//             "left-1 bg-red-500"
//           )}
//         />

//         <button
//           onClick={() => setActive("cart")}
//           className={cn(
//             "z-10 flex-1 text-center font-medium transition-colors",
//             active === "cart" ? "text-white" : "text-gray-700"
//           )}
//         >
//           Cart
//         </button>

//         <button
//           onClick={() => setActive("order")}
//           className={cn(
//             "z-10 flex-1 text-center font-medium transition-colors",
//             active === "order" ? "text-white" : "text-gray-700"
//           )}
//         >
//           Orders
//         </button>
//       </div>

//       <Card className="w-full bg-white">
//         <CardContent className="text-center space-y-6">
//           {active === "cart" ? (
//             <>
//               <p className="text-lg font-semibold text-red-500">
//                 🛒 Your Cart (Pending Orders)
//               </p>
//               {loading ? (
//                 <p>Loading...</p>
//               ) : pendingOrders.length === 0 ? (
//                 <p className="text-gray-500">No items in cart yet.</p>
//               ) : (
//                 pendingOrders.map((order) => (
//                   <div key={order._id} className="text-left space-y-4">
//                     {order.foodOrderItems.map((item) => (
//                       <div key={item._id} className="flex gap-2.5 items-start">
//                         <div className="w-31 h-30 relative overflow-hidden rounded-md">
//                           <Image
//                             src={item.food.imageUrl}
//                             alt={item.food.name}
//                             width={124}
//                             height={120}
//                             className="object-cover w-full h-full"
//                             unoptimized
//                           />
//                         </div>

//                         <div className="flex flex-col flex-1 gap-4">
//                           <div className="flex justify-between items-start">
//                             <div>
//                               <div className="font-semibold">
//                                 {item.food.name}
//                               </div>
//                               <div className="text-sm text-gray-500">
//                                 ${item.food.price} × {item.quantity}
//                               </div>
//                             </div>
//                             <Button
//                               variant="ghost"
//                               size="icon"
//                               onClick={() => handleDeleteOrder(order._id)}
//                             >
//                               <IoCloseOutline
//                                 size={16}
//                                 className="text-red-500"
//                               />
//                             </Button>
//                           </div>

//                           <div className="flex justify-between items-center">
//                             <div className="flex items-center gap-2">
//                               <Button
//                                 variant="ghost"
//                                 size="icon"
//                                 className="size-9"
//                               >
//                                 <FiMinus size={16} />
//                               </Button>
//                               <span>{item.quantity}</span>
//                               <Button
//                                 variant="ghost"
//                                 size="icon"
//                                 className="size-9"
//                               >
//                                 <FiPlus size={16} />
//                               </Button>
//                             </div>
//                             <div className="font-semibold text-gray-700">
//                               ${(item.food.price * item.quantity).toFixed(2)}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     ))}

//                     <UserLocation
//                       onSelectAddress={(addr) => setDeliveryAddress(addr)}
//                     />

//                     <Separator className="my-4 border border-dashed border-[rgba(9,9,11,0.5)] bg-transparent" />
//                     <div className="flex justify-between">
//                       <span>Total:</span>
//                       <span className="font-semibold">
//                         ${order.totalPrice.toFixed(2)}
//                       </span>
//                     </div>
//                   </div>
//                 ))
//               )}

//               {/* Checkout Button */}
//               {pendingOrders.length > 0 && (
//                 <Button
//                   variant="destructive"
//                   className="w-full rounded-full bg-red-500 mt-4"
//                   onClick={handleCheckout}
//                 >
//                   Checkout
//                 </Button>
//               )}

//               <div className="w-full h-[276px] bg-amber-700"></div>
//             </>
//           ) : (
//             <>
//               <p className="text-lg font-semibold text-red-500">
//                 📦 Order History
//               </p>
//               {loading ? (
//                 <p>Loading...</p>
//               ) : deliveredOrders.length === 0 ? (
//                 <p className="text-gray-500">No delivered orders yet.</p>
//               ) : (
//                 deliveredOrders.map((order) => (
//                   <div key={order._id} className="text-left space-y-4">
//                     {order.foodOrderItems.map((item) => (
//                       <div key={item._id} className="flex gap-2.5 items-start">
//                         <div className="w-31 h-30 relative overflow-hidden rounded-md">
//                           <Image
//                             src={item.food.imageUrl}
//                             alt={item.food.name}
//                             width={124}
//                             height={120}
//                             className="object-cover w-full h-full"
//                             unoptimized
//                           />
//                         </div>

//                         <div className="flex flex-col flex-1 gap-2">
//                           <div className="font-semibold">{item.food.name}</div>
//                           <div className="text-sm text-gray-500">
//                             ${item.food.price} × {item.quantity}
//                           </div>
//                           <div className="text-sm text-green-600 font-medium">
//                             ✅ Delivered
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                     <Separator className="my-3 border border-dashed border-[rgba(9,9,11,0.5)] bg-transparent" />
//                     <div className="flex justify-between text-sm">
//                       <span>Total:</span>
//                       <span className="font-semibold">
//                         ${order.totalPrice.toFixed(2)}
//                       </span>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default UserCartInfo1;

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
import { IoIosClose } from "react-icons/io";
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
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="w-9 h-9 flex items-center justify-center rounded-full">
            <CiShoppingCart className="w-4 h-4" />
          </Button>
        </SheetTrigger>

        <SheetContent className="flex flex-col p-8 overflow-y-auto bg-[#71717a] w-[535px] h-full overflow-hidden">
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
              <Card className="flex-1 w-[471px] h-[532px] relative">
                <CardHeader>
                  <CardTitle>My cart</CardTitle>
                  <div className=" h-30 flex gap-[10px]">
                    <Image src={"/login.jpg"} alt="" width={124} height={120} />
                    <div className="w-[305px] h-30 flex flex-col gap-6">
                      <div className="w-[305px] h-15 flex flex-col relative">
                        <div className="w-[259px] h-7">
                          <p className="text-red-500 text-base font-bold leading-7">
                            Sunshine Stackers
                          </p>
                        </div>
                        <div className="w-[259px] h-8">
                          <h1 className="text-foreground text-xs font-normal leading-4">
                            Fluffy pancakes stacked with fruits, cream, syrup,
                            and powdered sugar.
                          </h1>
                        </div>
                        <button className="absolute top-0 right-0 w-9 h-9 rounded-full border-1 border-[#EF4444] flex items-center justify-center">
                          <IoIosClose className="text-[#EF4444]" />
                        </button>
                      </div>
                      <div className="w-[305px] h-9 flex items-center justify-between">
                        <div className="w-[105px] h-9 flex items-center justify-between">
                          <div className="w-9 h-9 flex items-center justify-center text-xl">
                            -
                          </div>
                          <div className="text-[#09090B] font-semibold text-lg/7">
                            1
                          </div>
                          <div className="w-9 h-9 flex items-center justify-center text-xl">
                            +
                          </div>
                        </div>
                        <div className="w-[93px] h-7 text-right text-[#09090B] font-semibold text-lg/7">
                          $12.99
                        </div>
                      </div>
                    </div>
                  </div>
                  <Separator className="w-full border border-dashed border-[rgba(9,9,11,0.5)] bg-transparent" />
                </CardHeader>
                <CardContent className="flex gap-6 w-[439px] h-[116px] absolute bottom-4 right-4 p-0">
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
              </div>
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
                      2024/12/СБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdsen
                      emneleg | 100 айлын гүүрэн гарцны хойд талд 4д ногоонСБД,
                      12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdsen emneleg | 100
                      айлын гүүрэн гарцны хойд талд 4д ногоон20
                    </p>
                    <h1></h1>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </SheetContent>
      </Sheet>
    </div>
  );
};
