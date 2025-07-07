import { server } from "@/main";
import axios from "axios";
import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const userContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);

  const [isAuth, setIsAuth] = useState(false);

  async function loginUser(email, navigate) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/login`, { email });

      toast.success(data.message);

      localStorage.setItem("email", email);

      navigate("/verify");
      setBtnLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  async function verifyUser(otp, navigate, fetchcart) {
    setBtnLoading(true);
    const email = localStorage.getItem("email");
    try {
      const { data } = await axios.post(`${server}/api/user/verify`, {
        email,
        otp,
      });

      toast.success(data.message);

      localStorage.clear();

      navigate("/");
      setBtnLoading(false);
      setIsAuth(true);
      setUser(data.user);

      Cookies.set("token", data.token, {
        expires: 15,
        secure: true,
        path: "/",
      });
      fetchcart();
    } catch (error) {
      console.log("error", error);
      toast.error(error.response.data.message);
    }
  }

  async function fetchUser() {
    try {
      const { data } = await axios.get(`${server}/api/user/me`, {
        headers: {
          token: Cookies.get("token"),
        },
      });
      setIsAuth(true);
      setUser(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setIsAuth(false);
      setLoading(false);
    }
  }

  function logOutUser(navigate, setTotalItem) {
    Cookies.set("token", null);
    setUser("");
    setIsAuth(false);
    navigate("/login");
    toast.success("Logged Out");
    setTotalItem(0);
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <userContext.Provider
      value={{
        user,
        loading,
        btnLoading,
        isAuth,
        loginUser,
        verifyUser,
        logOutUser,
        fetchUser,
      }}
    >
      {children}
      <Toaster />
    </userContext.Provider>
  );
};

export const userData = () => useContext(userContext);
