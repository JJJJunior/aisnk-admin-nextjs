"use server";
import prisma from "@/prisma";
import axios from "axios";

export const getProductsOnCollections = async (collectionId: string) => {
  const productList = await prisma.productsOnCollections.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      collectionId: collectionId,
    },
    include: {
      product: true,
    },
  });
  return productList;
};

export const getCollections = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/collections`);
  return await res.data;
};

export const getProducts = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
  return await res.data;
};

export const getProductDetails = async (productId: string) => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}`);
  return await res.data;
};

export const getOrders = async (customerId: string) => {
  // const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/customers/${customerId}`);
  return prisma.customer.findUnique({
    where: {
      id: customerId,
    },
    include: {
      orders: {
        select: {
          id: true,
          products: {
            include: {
              product: true,
            },
          },
          shippingAddress: true,
          shippingRate: true,
          totalAmount: true,
          createdAt: true,
        },
      },
    },
  });
};

export const getCustomers = async () => {
  const customers = await prisma.customer.findMany();
  return customers;
};

export const getRelatedProducts = async (productId: string) => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}/related`);
  return await res.data;
};

export const getTotalSales = async () => {
  const orders = await prisma.order.findMany();
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);
  return { totalOrders, totalRevenue };
};

export const getTotalCustomers = async () => {
  const customers = await prisma.customer.findMany();
  return customers.length;
};

export const getSalesPerMonth = async () => {
  const orders = await prisma.order.findMany();

  const salesPerMonth = orders.reduce((acc, order) => {
    const monthIndex = new Date(order.createdAt).getMonth();
    acc[monthIndex] = (acc[monthIndex] || 0) + order.totalAmount;
    return acc;
  }, {});

  return Array.from({ length: 12 }, (_, i) => {
    const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(new Date(0, i));
    // if i === 5 => month = "Jun"
    return { name: month, sales: salesPerMonth[i] || 0 };
  });
};
