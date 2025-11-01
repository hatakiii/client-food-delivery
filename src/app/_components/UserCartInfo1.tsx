// import React from 'react'

// const UserCartInfo1 = () => {
//   return (
//     <div>
//         <div className="relative w-full h-11 bg-gray-200 rounded-full flex items-center justify-between my-6">
//             <motion.div
//               layout
//               transition={{ type: "spring", stiffness: 300, damping: 25 }}
//               className={cn(
//                 "absolute top-1 bottom-1 w-1/2 rounded-full",
//                  "left-1 bg-red-500"
//               )}
//             />

//             <button
//               onClick={() => setActive("cart")}
//               className={cn(
//                 "z-10 flex-1 text-center font-medium transition-colors",
//                 active === "cart" ? "text-white" : "text-gray-700"
//               )}
//             >
//               Cart
//             </button>

//             <button
//               onClick={() => setActive("order")}
//               className={cn(
//                 "z-10 flex-1 text-center font-medium transition-colors",
//                 active === "order" ? "text-white" : "text-gray-700"
//               )}
//             >
//               Orders
//             </button>
//           </div>

//           <Card className="w-full bg-white">
//             <CardContent className="text-center space-y-6">
//               {active === "cart" ? (
//                 <>
//                   <p className="text-lg font-semibold text-red-500">
//                     🛒 Your Cart (Pending Orders)
//                   </p>
//                   {loading ? (
//                     <p>Loading...</p>
//                   ) : pendingOrders.length === 0 ? (
//                     <p className="text-gray-500">No items in cart yet.</p>
//                   ) : (
//                     pendingOrders.map((order) => (
//                       <div key={order._id} className="text-left space-y-4">
//                         {order.foodOrderItems.map((item) => (
//                           <div
//                             key={item._id}
//                             className="flex gap-2.5 items-start"
//                           >
//                             <div className="w-31 h-30 relative overflow-hidden rounded-md">
//                               <Image
//                                 src={item.food.imageUrl}
//                                 alt={item.food.name}
//                                 width={124}
//                                 height={120}
//                                 className="object-cover w-full h-full"
//                                 unoptimized
//                               />
//                             </div>

//                             <div className="flex flex-col flex-1 gap-4">
//                               <div className="flex justify-between items-start">
//                                 <div>
//                                   <div className="font-semibold">
//                                     {item.food.name}
//                                   </div>
//                                   <div className="text-sm text-gray-500">
//                                     ${item.food.price} × {item.quantity}
//                                   </div>
//                                 </div>
//                                 <Button
//                                   variant="ghost"
//                                   size="icon"
//                                   onClick={() => handleDeleteOrder(order._id)}
//                                 >
//                                   <IoCloseOutline
//                                     size={16}
//                                     className="text-red-500"
//                                   />
//                                 </Button>
//                               </div>

//                               <div className="flex justify-between items-center">
//                                 <div className="flex items-center gap-2">
//                                   <Button
//                                     variant="ghost"
//                                     size="icon"
//                                     className="size-9"
//                                   >
//                                     <FiMinus size={16} />
//                                   </Button>
//                                   <span>{item.quantity}</span>
//                                   <Button
//                                     variant="ghost"
//                                     size="icon"
//                                     className="size-9"
//                                   >
//                                     <FiPlus size={16} />
//                                   </Button>
//                                 </div>
//                                 <div className="font-semibold text-gray-700">
//                                   $
//                                   {(item.food.price * item.quantity).toFixed(2)}
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         ))}

//                         <UserLocation
//                           onSelectAddress={(addr) => setDeliveryAddress(addr)}
//                         />

//                         <Separator className="my-4 border border-dashed border-[rgba(9,9,11,0.5)] bg-transparent" />
//                         <div className="flex justify-between">
//                           <span>Total:</span>
//                           <span className="font-semibold">
//                             ${order.totalPrice.toFixed(2)}
//                           </span>
//                         </div>
//                       </div>
//                     ))
//                   )}

//                   {/* Checkout Button */}
//                   {pendingOrders.length > 0 && (
//                     <Button
//                       variant="destructive"
//                       className="w-full rounded-full bg-red-500 mt-4"
//                       onClick={handleCheckout}
//                     >
//                       Checkout
//                     </Button>
//                   )}

//                   <div className="w-full h-[276px] bg-amber-700"></div>
//                 </>
//               ) : (
//                 <>
//                   <p className="text-lg font-semibold text-red-500">
//                     📦 Order History
//                   </p>
//                   {loading ? (
//                     <p>Loading...</p>
//                   ) : deliveredOrders.length === 0 ? (
//                     <p className="text-gray-500">No delivered orders yet.</p>
//                   ) : (
//                     deliveredOrders.map((order) => (
//                       <div key={order._id} className="text-left space-y-4">
//                         {order.foodOrderItems.map((item) => (
//                           <div
//                             key={item._id}
//                             className="flex gap-2.5 items-start"
//                           >
//                             <div className="w-31 h-30 relative overflow-hidden rounded-md">
//                               <Image
//                                 src={item.food.imageUrl}
//                                 alt={item.food.name}
//                                 width={124}
//                                 height={120}
//                                 className="object-cover w-full h-full"
//                                 unoptimized
//                               />
//                             </div>

//                             <div className="flex flex-col flex-1 gap-2">
//                               <div className="font-semibold">
//                                 {item.food.name}
//                               </div>
//                               <div className="text-sm text-gray-500">
//                                 ${item.food.price} × {item.quantity}
//                               </div>
//                               <div className="text-sm text-green-600 font-medium">
//                                 ✅ Delivered
//                               </div>
//                             </div>
//                           </div>
//                         ))}
//                         <Separator className="my-3 border border-dashed border-[rgba(9,9,11,0.5)] bg-transparent" />
//                         <div className="flex justify-between text-sm">
//                           <span>Total:</span>
//                           <span className="font-semibold">
//                             ${order.totalPrice.toFixed(2)}
//                           </span>
//                         </div>
//                       </div>
//                     ))
//                   )}
//                 </>
//               )}
//             </CardContent>
//           </Card>

//     </div>
//   )
// }

// export default UserCartInfo
