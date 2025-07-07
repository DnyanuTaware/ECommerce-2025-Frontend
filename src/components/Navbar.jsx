import { LogIn, ShoppingCart, User } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { ModeToggle } from "./mode-toggle";
import { userData } from "@/context/UserContext";
import { cartData } from "@/context/CartContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuth, logOutUser, user } = userData();

  const { totalItem, setTotalItem } = cartData();
  const logoutHandler = () => {
    logOutUser(navigate, setTotalItem);
  };

  return (
    <div className="z-50 sticky top-0 bg-white/30 backdrop-blur-2xl ">
      <div className="container mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between">
        <h1 className="text-2xl font-bold">QuickCart</h1>
        <ul className="flex justify-center items-center space-x-6">
          <li className="cursor-pointer" onClick={() => navigate("/")}>
            Home
          </li>
          <li className="cursor-pointer" onClick={() => navigate("/products")}>
            Products
          </li>
          <li
            className="cursor-pointer relative flex items-center "
            onClick={() => navigate("/cart")}
          >
            <ShoppingCart className="w-6 h-6"></ShoppingCart>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs  font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {totalItem ? totalItem : 0}
            </span>
          </li>
          <li className="cursor-pointer">
            <DropdownMenu>
              <DropdownMenuTrigger>
                {isAuth ? <User /> : <LogIn />}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuSeparator>
                  {!isAuth ? (
                    <>
                      <DropdownMenuItem onClick={() => navigate("/login")}>
                        Login
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem onClick={() => navigate("/orders")}>
                        Your Order
                      </DropdownMenuItem>
                      {user && user.role === "admin" && (
                        <DropdownMenuItem
                          onClick={() => navigate("/admin/dashboard")}
                        >
                          Dashboard
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={logoutHandler}>
                        Logout
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuSeparator>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
          <ModeToggle />
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
