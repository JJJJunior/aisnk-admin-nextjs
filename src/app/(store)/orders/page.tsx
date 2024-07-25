import React from "react";
import {auth} from "@clerk/nextjs/server";
import {OrderItemType, OrdersType} from "@/lib/types";
import {getOrders} from "@/lib/actions";

import Image from "next/image";
import Link from "next/link";

const OrdersPage = async () => {
  const {userId} = auth();
  const customer = await getOrders(userId as string);

  return (
    <div className="px-10 py-12 max-sm:px-3">
      <div className="flex w-full justify-between">
        <p className="text-3xl font-semibold">Your Orders</p>
        <Link href="/" className="border rounded text-body-bold bg-white p-2 hover:bg-black hover:text-white">
          Back to Home
        </Link>
      </div>
      <hr className="my-6"/>
      {!customer?.orders?.length && <p className="text-body-bold my-5">You have no orders yet.</p>}
      {/*{!customer?.orders || (customer.orders.length === 0 && <p className="text-body-bold my-5">You have no orders yet.</p>)}*/}
      <div className="flex flex-col gap-10">
        {customer?.orders.length > 0 && customer.orders.map((order: OrdersType) => (
          <div className="flex flex-col gap-8 p-4 hover:bg-grey-1" key={order.id}>
            <div className="flex gap-20 max-md:flex-col max-md:gap-3">
              <p className="text-base-bold">Order ID: {order.id}</p>
              <p className="text-base-bold">Total Amount: ${order.totalAmount}</p>
            </div>
            <div className="flex flex-col gap-5">
              {order.products && order.products?.map((orderItem: OrderItemType, index: number) => (
                <div className="flex gap-4" key={index}>
                  <Image
                    src={orderItem.product.images.split(",")[0]}
                    alt={orderItem.product.title}
                    width={100}
                    height={100}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <div className="flex flex-col justify-between">
                    <p className="text-small-medium">
                      Title: <span className="text-small-bold">{orderItem.product.title}</span>
                    </p>
                    {orderItem.color && (
                      <p className="text-small-medium">
                        Color: <span className="text-small-bold">{orderItem.color}</span>
                      </p>
                    )}
                    {orderItem.size && (
                      <p className="text-small-medium">
                        Size: <span className="text-small-bold">{orderItem.size}</span>
                      </p>
                    )}
                    <p className="text-small-medium">
                      Unit price: <span className="text-small-bold">{orderItem.product.price}</span>
                    </p>
                    <p className="text-small-medium">
                      Quantity: <span className="text-small-bold">{orderItem.quantity}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
