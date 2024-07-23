export type OrderType = {
  id: string;
  customerClerkId: string;
  shippingRate: string;
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
  customerId: string;
  customer: CustomerType;
  shippingAddress: ShippingAddressType;
  products: ProductTypeInOrder[];
};

export type ProductTypeInOrder = {
  productId: string;
  orderId: string;
  title: string;
  color: string;
  size: string;
  currency: string;
  amountDiscount: number;
  amountSubtotal: number;
  amountTax: number;
  amountTotal: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
};

export type CustomerType = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ShippingAddressType = {
  id: string;
  streetNumber: string;
  streetName: string;
  city: string;
  state: string;
  postalCode: number;
  country: string;
  orderId: string;
};

export type CollectionType = {
  id: string;
  title: string;
  description: string;
  images: string[];
  products: ProductType[];
};

export type ProductType = {
  id: string;
  title: string;
  description: string;
  images: string[];
  category: string;
  collections: string[];
  status: string;
  tags: string[];
  sizes: string[];
  stock: number;
  colors: string[];
  price: number;
  expense: number;
};
