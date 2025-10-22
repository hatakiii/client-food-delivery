import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CiShoppingCart } from "react-icons/ci";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { IoCloseOutline } from "react-icons/io5";
import { FiMinus, FiPlus } from "react-icons/fi";
import { Separator } from "@/components/ui/separator";

export const UserCart = () => {
  const [active, setActive] = useState<"cart" | "order">("cart");
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="w-9 h-9  flex items-center justify-center rounded-full">
            <CiShoppingCart className="w-4 h-4" />
          </Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col p-8">
          <SheetHeader>
            <SheetTitle>Order details</SheetTitle>
          </SheetHeader>
          <div className="relative w-full h-11 bg-gray-200 rounded-full flex items-center justify-between my-6">
            {/* Sliding background */}
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={cn(
                "absolute top-1 bottom-1 w-1/2 rounded-full",
                active === "cart" ? "left-1 bg-red-500" : "left-1/2 bg-red-500"
              )}
            />

            {/* Cart Button */}
            <button
              onClick={() => setActive("cart")}
              className={cn(
                "z-10 flex-1 text-center font-medium transition-colors",
                active === "cart" ? "text-white" : "text-gray-700"
              )}
            >
              Cart
            </button>

            {/* Order Button */}
            <button
              onClick={() => setActive("order")}
              className={cn(
                "z-10 flex-1 text-center font-medium transition-colors",
                active === "order" ? "text-white" : "text-gray-700"
              )}
            >
              Order
            </button>
          </div>

          {/* Below Content */}
          <Card className="w-full">
            <CardContent className=" text-center">
              {active === "cart" ? (
                <>
                  <div>
                    <div className="flex gap-2.5">
                      <div className="w-31 h-30 relative overflow-hidden">
                        <Image
                          src={"/hero.png"}
                          alt=""
                          width={124}
                          height={120}
                          className="object-cover w-full h-full "
                          unoptimized
                        />
                      </div>
                      <div className="flex flex-col gap-6">
                        <div className="flex gap-2.5">
                          <div className="flex-1">
                            <div>123</div>
                            <div>456</div>
                          </div>
                          <div className="w-9 h-9 rounded-full border border-red-500 bg-white flex justify-center items-center">
                            <IoCloseOutline
                              size={16}
                              className="text-red-500"
                            />
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <Button variant={"ghost"} className="size-9">
                              <FiMinus size={16} />
                            </Button>
                            <div>food quantity</div>
                            <Button variant={"ghost"} className="size-9">
                              <FiPlus size={16} />
                            </Button>
                          </div>
                          <div>123456</div>
                        </div>
                      </div>
                    </div>
                    <Separator className="mt-5 border border-dashed border-[rgba(9,9,11,0.5)] bg-transparent" />
                  </div>
                  <div className="bg-background text-foreground flex flex-col p-4 gap-5 rounded-[20px]">
                    <div>Payment info</div>
                    <div>
                      <div className="flex justify-between">
                        <div>Items</div>
                        <div>$</div>
                      </div>
                      <div className="flex justify-between">
                        <div>Shipping</div>
                        <div>1$</div>
                      </div>
                    </div>

                    <Separator className="border border-dashed border-[rgba(9,9,11,0.5)] bg-transparent" />

                    <div className="flex justify-between">
                      <div>Total</div>
                      <div>$</div>
                    </div>

                    <Button
                      variant="destructive"
                      className="w-full rounded-full bg-red-500"
                    >
                      Checkout
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-lg font-semibold text-red-500">
                    📦 Orders
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Your past orders will appear here.
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        </SheetContent>
      </Sheet>
    </div>
  );
};
