type OrderType = {
  id: string
  customerClerkId: string,
  shippingRate: string,
  totalAmount: number,
  createdAt: Date,
  updatedAt: Date,
  customerId: string,
  customer: CustomerType;
  shippingAddress: ShippingAddressType;
  products: ProductTypeInOrder[];
}

type ProductTypeInOrder = {
  productId: string
  orderId: string
  title: string
  color: string
  size: string
  currency: string
  amountDiscount: number
  amountSubtotal: number
  amountTax: number
  amountTotal: number
  quantity: number
  createdAt: Date
  updatedAt: Date
}

type CustomerType = {
  id: string,
  name: string,
  email: string,
  createdAt: Date,
  updatedAt: Date
}

type ShippingAddressType = {
  id: string,
  streetNumber: string,
  streetName: string,
  city: string,
  state: string,
  postalCode: number,
  country: string,
  orderId: string
}

type CollectionType = {
  id: string;
  title: string;
  description: string;
  image: string;
  products: ProductType[];
};

export type ProductType = {
  id: string;
  title: string;
  description: string;
  media: string;
  category: string;
  collections: string;
  tags: string;
  sizes: string;
  colors: string;
  price: number;
  productId?: string;
  orderId?: string;
  expense: number;
  createdAt: Date;
  updatedAt: Date;
};
