import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./components/theme-provider";
import { UserContextProvider } from "./context/UserContext";
import { ProductContrextProvider } from "./context/ProductContext";
import { CartContextProvider } from "./context/CartContext";
export const server = "https://ecommerce-2025-server-mvwn.onrender.com";

export const categories = [
  // electronics
  "mobile",
  "laptop",
  "tablet",
  "camera",
  "smartwatch",
  "headphone",
  "tv",
  "gaming console",

  // fashion
  "men clothing",
  "women clothing",
  "kid clothing",
  "footwear",
  "watch",
  "bag",
  "jewelry",
  "eyewear",

  // home & furniture
  "furniture",
  "home decor",
  "kitchenware",
  "bedding",
  "lighting",
  "bathroom essential",
  "cleaning supply",

  // beauty & personal care
  "skincare",
  "haircare",
  "makeup",
  "fragrance",
  "personal hygiene",

  // grocery
  "fruit & vegetable",
  "beverage",
  "snack",
  "dairy product",
  "staple",
  "packaged food",

  // book & stationery
  "fiction book",
  "non-fiction book",
  "children book",
  "notebook",
  "pen",
  "art supply",

  // sports & fitness
  "fitness equipment",
  "sportswear",
  "outdoor gear",
  "yoga essential",
  "supplement",

  // automotive
  "car accessory",
  "bike accessory",
  "car electronic",
  "lubricant & oil",

  // toy & baby
  "toy",
  "baby clothing",
  "baby care",
  "stroller & carrier",

  // others
  "pet supply",
  "gardening",
  "musical instrument",
  "health",
  "tool & hardware",
];

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <UserContextProvider>
        <ProductContrextProvider>
          <CartContextProvider>
            <App />
          </CartContextProvider>
        </ProductContrextProvider>
      </UserContextProvider>
    </ThemeProvider>
  </StrictMode>
);
