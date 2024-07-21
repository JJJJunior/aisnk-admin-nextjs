import prisma from "@/prisma";

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
