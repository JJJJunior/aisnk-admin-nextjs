import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ProductType } from "../types";
import {message} from "antd";

interface CartItem {
  item: ProductType;
  quantity: number;
  color?: string;
  size?: string;
}

interface CartStore {
  cartItems: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (idToRemove: String) => void;
  increaseQuantity: (idToIncrease: String) => void;
  decreaseQuantity: (idToDecrease: String) => void;
  clearCart: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      cartItems: [],
      addItem: (data: CartItem) => {
        const { item, quantity, color, size } = data;
        const currentItems = get().cartItems;
        const isExisting = currentItems.find((cartItem) => cartItem.item.id === item.id);
        if (isExisting) {
          return message.info("Item already in cart");
        }
        set({ cartItems: [...currentItems, { item, quantity, color, size }] });
        message.success("Item added to cart");
      },
      removeItem: (idToRemove: String) => {
        const newCartItems = get().cartItems.filter((cartItem) => cartItem.item.id !== idToRemove);
        set({ cartItems: newCartItems });
        message.success("Item added to cart");
      },
      increaseQuantity: (idToIncrease: String) => {
        const newCartItems = get().cartItems.map((cartItem) =>
          cartItem.item.id === idToIncrease ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
        set({ cartItems: newCartItems });
        message.success("Quantity increased");
      },
      decreaseQuantity: (idToDecrease: String) => {
        const newCartItems = get().cartItems.map((cartItem) =>
          cartItem.item.id === idToDecrease ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
        );
        set({ cartItems: newCartItems });
        message.success("Quantity decreased");
      },
      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
