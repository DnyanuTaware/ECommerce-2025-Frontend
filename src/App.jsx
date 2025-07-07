import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Verify from "./pages/Verify";
import { userData } from "./context/UserContext";
import Loading from "./components/Loading";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import ProductPage from "./pages/ProductPage";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import OrderProcessing from "./pages/OrderProcessing";
import Orders from "./pages/Orders";
import OrderPage from "./pages/OrderPage";
import AdminDashboard from "./pages/AdminDashboard";
const App = () => {
  const { isAuth, loading } = userData();
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={isAuth ? <Home /> : <Login />} />
              <Route path="/verify" element={isAuth ? <Home /> : <Verify />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductPage />} />

              <Route path="/cart" element={isAuth ? <Cart /> : <Login />} />
              <Route path="/orders" element={isAuth ? <Orders /> : <Login />} />
              <Route
                path="/order/:id"
                element={isAuth ? <OrderPage /> : <Login />}
              />
              <Route
                path="/admin/dashboard"
                element={isAuth ? <AdminDashboard /> : <Login />}
              />
              <Route
                path="/checkout"
                element={isAuth ? <Checkout /> : <Login />}
              />
              <Route
                path="/payment/:id"
                element={isAuth ? <Payment /> : <Login />}
              />
              <Route
                path="/ordersuccess"
                element={isAuth ? <OrderProcessing /> : <Login />}
              />

              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </>
      )}
    </>
  );
};

export default App;
