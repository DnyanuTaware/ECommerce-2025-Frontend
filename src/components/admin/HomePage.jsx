import { productData } from "@/context/ProductContext";
import React, { useState } from "react";
import Loading from "../Loading";
import ProductCard from "../ProductCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { categories, server } from "@/main";
import toast from "react-hot-toast";
import axios from "axios";
import Cookies from "js-cookie";
import LoadingAnimation from "../LoadingAnimation";

const HomePage = () => {
  const { products, page, setPage, fetchProducts, loading, totalPages } =
    productData();

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  const [open, setOpen] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    images: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, images: e.target.files }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!formData.images || formData.images.length === 0) {
      toast.error("Please select images");
      return;
    }

    const form = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "images") {
        for (let i = 0; i < value.length; i++) {
          form.append("files", value[i]);
        }
      } else {
        form.append(key, value);
      }
    });

    try {
      setBtnLoading(true);

      const { data } = await axios.post(`${server}/api/product/new`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: Cookies.get("token"),
        },
      });
      toast.success(data.message);
      setOpen(false);
      setFormData({
        title: "",
        description: "",
        category: "",
        price: "",
        stock: "",
        images: null,
      });
      fetchProducts();
      setBtnLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  };
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">All Products</h2>
        <Button
          variant="success"
          onClick={() => setOpen(true)}
          className="mb-4"
        >
          Add Product
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <form onSubmit={submitHandler} className="space-y-4">
              <Input
                name="title"
                placeholder="Product title"
                value={formData.title}
                onChange={handleChange}
                required
              />
              <Input
                name="description"
                placeholder="About the product description"
                value={formData.description}
                onChange={handleChange}
                required
              />
              <select
                name="category"
                placeholder="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map((e) => {
                  return (
                    <option value={e} key={e}>
                      {e}
                    </option>
                  );
                })}
              </select>
              <Input
                name="price"
                placeholder="Product Price"
                value={formData.price}
                onChange={handleChange}
                required
              />{" "}
              <Input
                name="stock"
                placeholder="Product Stock"
                value={formData.stock}
                onChange={handleChange}
                required
              />
              <Input
                type="file"
                name="images"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                required
              />
              <Button
                disabled={btnLoading}
                variant="success"
                type="submit"
                className="w-full"
              >
                {btnLoading ? <LoadingAnimation /> : " Create Product"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products && products.length > 0 ? (
            products.map((e) => {
              return (
                <ProductCard product={e} key={e._id} latest="no"></ProductCard>
              );
            })
          ) : (
            <p>No products Yet</p>
          )}
        </div>
      )}
      <div className="mt-2 mb-3">
        <Pagination>
          <PaginationContent>
            {page !== 1 && (
              <PaginationItem className="cursor-pointer" onClick={prevPage}>
                <PaginationPrevious />
              </PaginationItem>
            )}
            {page !== totalPages && (
              <PaginationItem className="cursor-pointer" onClick={nextPage}>
                <PaginationNext />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default HomePage;
