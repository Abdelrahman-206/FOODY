import { create } from 'zustand';
import { FoodItem } from '../data/mockData';

export type CartItem = FoodItem & { quantity: number };

type CartStore = {
  items: CartItem[];
  addItem: (item: FoodItem) => void;
  removeItem: (id: string) => void;
  incrementItem: (id: string) => void;
  decrementItem: (id: string) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  addItem: (item) => {
    const existing = get().items.find((i) => i.id === item.id);
    if (existing) {
      set({ items: get().items.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i) });
    } else {
      set({ items: [...get().items, { ...item, quantity: 1 }] });
    }
  },

  removeItem: (id) => set({ items: get().items.filter((i) => i.id !== id) }),

  incrementItem: (id) =>
    set({ items: get().items.map((i) => i.id === id ? { ...i, quantity: i.quantity + 1 } : i) }),

  decrementItem: (id) => {
    const item = get().items.find((i) => i.id === id);
    if (!item) return;
    if (item.quantity === 1) {
      set({ items: get().items.filter((i) => i.id !== id) });
    } else {
      set({ items: get().items.map((i) => i.id === id ? { ...i, quantity: i.quantity - 1 } : i) });
    }
  },

  clearCart: () => set({ items: [] }),

  totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

  totalPrice: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
}));
