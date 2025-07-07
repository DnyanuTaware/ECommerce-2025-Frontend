import { server } from "@/main";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const productContext = createContext();

export const ProductContrextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProd, setNewProd] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState([]);

  async function fetchProducts() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${server}/api/product/all?search=${search}&category=${category}&sortByPrice=${price}&page=${page}`
      );

      setProducts(data.products);
      setNewProd(data.newProduct);
      setCategories(data.categories);
      setTotalPages(data.totalPages);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  const [product, setProduct] = useState([]);
  const [relatedProduct, setRelatedProduct] = useState([]);

  async function fetchSingleProduct(id) {
    setLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/product/${id}`);

      setProduct(data.product);
      setRelatedProduct(data.relatedProducts);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchProducts();
  }, [search, category, page, price]);
  return (
    <productContext.Provider
      value={{
        loading,
        products,
        newProd,
        search,
        setSearch,
        categories,
        category,
        setCategory,
        totalPages,
        price,
        setPrice,
        page,
        setPage,
        fetchSingleProduct,
        product,
        relatedProduct,
        fetchProducts,
      }}
    >
      {children}
    </productContext.Provider>
  );
};

export const productData = () => useContext(productContext);
