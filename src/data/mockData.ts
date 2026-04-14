export type FoodItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  emoji: string;
  image: any;
  category: string;
  restaurantId: string;
  popular?: boolean;
};

export type Restaurant = {
  id: string;
  name: string;
  emoji: string;
  image: any;
  category: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  minOrder: number;
  tags: string[];
};

export const restaurants: Restaurant[] = [
  {
    id: 'r1',
    name: "Big Smoke Burgers",
    emoji: "🍔",
    image: require('../../assets/food/burger5.jpg'),
    category: "Burgers",
    rating: 4.8,
    deliveryTime: "20-30 min",
    deliveryFee: 1.99,
    minOrder: 10,
    tags: ["Popular", "Fast Delivery"],
  },
  {
    id: 'r2',
    name: "Crispy & Co.",
    emoji: "🍗",
    image: require('../../assets/food/chicken2.jpg'),
    category: "Burgers & Fries",
    rating: 4.5,
    deliveryTime: "25-35 min",
    deliveryFee: 0.99,
    minOrder: 8,
    tags: ["Best Value"],
  },
  {
    id: 'r3',
    name: "The Patty Lab",
    emoji: "🥩",
    image: require('../../assets/food/burger3.jpg'),
    category: "Gourmet Burgers",
    rating: 4.9,
    deliveryTime: "30-45 min",
    deliveryFee: 2.99,
    minOrder: 15,
    tags: ["Top Rated", "Gourmet"],
  },
  {
    id: 'r4',
    name: "Shake Station",
    emoji: "🍔",
    image: require('../../assets/food/burger1.jpg'),
    category: "Burgers & Shakes",
    rating: 4.6,
    deliveryTime: "20-30 min",
    deliveryFee: 1.49,
    minOrder: 10,
    tags: ["New"],
  },
];

export const foodItems: FoodItem[] = [
  // Big Smoke Burgers
  { id: 'f1', restaurantId: 'r1', name: "Classic Smash Burger", description: "Double smash patty, cheddar, pickles, special sauce", price: 9.99, emoji: "🍔", image: require('../../assets/food/burger5.jpg'), category: "Burgers", popular: true },
  { id: 'f2', restaurantId: 'r1', name: "BBQ Bacon Burger", description: "Beef patty, crispy bacon, BBQ sauce, onion rings", price: 11.99, emoji: "🍔", image: require('../../assets/food/burger4.jpg'), category: "Burgers", popular: true },
  { id: 'f3', restaurantId: 'r1', name: "Mushroom Swiss", description: "Juicy patty, sautéed mushrooms, Swiss cheese", price: 10.99, emoji: "🍔", image: require('../../assets/food/burger3.jpg'), category: "Burgers" },
  { id: 'f4', restaurantId: 'r1', name: "Crispy Chicken Burger", description: "Crispy fried chicken, coleslaw, hot sauce, brioche bun", price: 10.49, emoji: "🍗", image: require('../../assets/food/burger1.jpg'), category: "Chicken", popular: true },
  { id: 'f5', restaurantId: 'r1', name: "Spicy Chicken Strips", description: "Golden fried chicken strips, honey mustard dip", price: 8.49, emoji: "🍗", image: require('../../assets/food/chicken1.jpg'), category: "Chicken" },

  // Crispy & Co.
  { id: 'f6', restaurantId: 'r2', name: "Crispy Chicken Burger", description: "Fried chicken fillet, coleslaw, hot sauce", price: 8.99, emoji: "🍗", image: require('../../assets/food/burger1.jpg'), category: "Burgers", popular: true },
  { id: 'f7', restaurantId: 'r2', name: "Crunchy Chicken Feast", description: "Whole fried chicken pieces, lime, spicy seasoning", price: 14.99, emoji: "🍗", image: require('../../assets/food/chicken1.jpg'), category: "Chicken", popular: true },
  { id: 'f8', restaurantId: 'r2', name: "Southern Fried Chicken", description: "Classic southern style, coleslaw, biscuit", price: 12.99, emoji: "🍗", image: require('../../assets/food/chicken2.jpg'), category: "Chicken" },
  { id: 'f9', restaurantId: 'r2', name: "Double Beef Stack", description: "Two beef patties, lettuce, tomato, mayo", price: 10.49, emoji: "🍔", image: require('../../assets/food/burger4.jpg'), category: "Burgers" },

  // The Patty Lab
  { id: 'f10', restaurantId: 'r3', name: "Gourmet Smash Burger", description: "Premium beef, caramelised onions, Swiss, brioche", price: 14.99, emoji: "🍔", image: require('../../assets/food/burger3.jpg'), category: "Burgers", popular: true },
  { id: 'f11', restaurantId: 'r3', name: "Truffle Wagyu Burger", description: "Wagyu beef, truffle aioli, aged cheddar, brioche bun", price: 18.99, emoji: "🍔", image: require('../../assets/food/burger5.jpg'), category: "Burgers", popular: true },
  { id: 'f12', restaurantId: 'r3', name: "Spicy Crispy Chicken", description: "Double crispy chicken, pickles, spicy mayo", price: 13.99, emoji: "🍗", image: require('../../assets/food/burger2.jpg'), category: "Chicken" },

  // Shake Station
  { id: 'f13', restaurantId: 'r4', name: "Classic Cheeseburger", description: "Beef patty, American cheese, mustard, pickles", price: 9.99, emoji: "🍔", image: require('../../assets/food/burger5.jpg'), category: "Burgers", popular: true },
  { id: 'f14', restaurantId: 'r4', name: "Loaded Crispy Burger", description: "Crispy chicken, bacon, jalapeños, pepper jack", price: 12.49, emoji: "🍔", image: require('../../assets/food/burger2.jpg'), category: "Burgers" },
  { id: 'f15', restaurantId: 'r4', name: "Fried Chicken Bucket", description: "8 pieces golden fried chicken, dipping sauce", price: 16.99, emoji: "🍗", image: require('../../assets/food/chicken2.jpg'), category: "Chicken", popular: true },
  { id: 'f16', restaurantId: 'r4', name: "Spicy Chicken Burger", description: "Ghost pepper sauce, jalapeños, pepper jack cheese", price: 11.49, emoji: "🌶️", image: require('../../assets/food/burger1.jpg'), category: "Burgers" },
];
