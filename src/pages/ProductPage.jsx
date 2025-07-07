import Loading from "@/components/Loading";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cartData } from "@/context/CartContext";
import { productData } from "@/context/ProductContext";
import { userData } from "@/context/UserContext";
import { categories, server } from "@/main";
import axios from "axios";
import Cookies from "js-cookie";
import { Edit, Loader, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const ProductPage = () => {
  const { fetchSingleProduct, product, relatedProduct, loading } =
    productData();

  const { isAuth, user } = userData();

  const { addToCart } = cartData();

  const { id } = useParams();

  useEffect(() => {
    fetchSingleProduct(id);
  }, [id]);

  const addToCartHandler = () => {
    addToCart(id);
  };

  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const [btnLoading, setBtnLoading] = useState(false);

  const updateHandler = () => {
    setShow(!show);
    setCategory(product.category);
    setTitle(product.title);
    setDescription(product.description);
    setStock(product.stock);
    setPrice(product.price);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    try {
      const { data } = await axios.put(
        `${server}/api/product/${id}`,
        { title, description, price, stock, category },
        {
          headers: {
            token: Cookies.get("token"),
          },
        }
      );
      toast.success(data.message);
      fetchSingleProduct(id);
      setShow(false);
      setBtnLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const [updatedImages, setUpdatedImages] = useState(null);
  const handleSubmitImage = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    if (!updatedImages || updatedImages.length === 0) {
      toast.error("Please select New images");
      setBtnLoading(false);
      return;
    }
    const formData = new FormData();

    for (let i = 0; i < updatedImages.length; i++) {
      formData.append("files", updatedImages[i]);
    }
    try {
      const { data } = await axios.post(
        `${server}/api/product/${id}`,
        formData,
        {
          headers: {
            token: Cookies.get("token"),
          },
        }
      );
      toast.success(data.message);
      fetchSingleProduct(id);

      setBtnLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div
          className="container mx-auto p-x-4 p-y-8
      "
        >
          {user && user.role === "admin" && (
            <div className="w-[300px] md:w-[450px] m-auto mb-5">
              <Button variant="success" onClick={updateHandler}>
                {show ? <X className="mb-2" /> : <Edit />}
              </Button>
              {show && (
                <form onSubmit={submitHandler} className="space-y-4">
                  <div>
                    <Label className="mb-2">Title</Label>
                    <Input
                      placeholder="Product title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label className="mb-2">Description</Label>
                    <Input
                      placeholder="Product Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label className="mb-2">Category</Label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      required
                      className="w-full p-2 border rounded-md dark:bg-gray-900 dark:text-white"
                    >
                      {categories.map((e) => (
                        <option value={e} key={e}>
                          {e}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label className="mb-2">Price</Label>
                    <Input
                      placeholder="Product Price"
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label className="mb-2">Stock</Label>
                    <Input
                      className="mb-2"
                      placeholder="Product stock"
                      type="number"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      required
                    />
                    <Button
                      variant="success"
                      type="submit"
                      className="w-full mb-2"
                      disabled={btnLoading}
                    >
                      {btnLoading ? <Loader /> : "Update Produt"}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          )}
          {product && (
            <div className="flex flex-col lg:flex-row items-start gap-14">
              <div className="w-[400px] md:w-[650px]">
                <Carousel>
                  <CarouselContent>
                    {product.images &&
                      product.images.map((image, index) => {
                        return (
                          <CarouselItem key={index}>
                            <img
                              src={image.url}
                              alt="image"
                              className="w-full rounded-md"
                            />
                          </CarouselItem>
                        );
                      })}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
                {user && user.role === "admin" && (
                  <form
                    onSubmit={handleSubmitImage}
                    className="flex flex-col gap-4"
                  >
                    <div>
                      <Label className="mb-2">Upload New Images</Label>
                      <Input
                        type="file"
                        name="files"
                        id="files"
                        multiple
                        accept="image/*"
                        onChange={(e) => setUpdatedImages(e.target.files)}
                        className="block w-full mt-1 text-sm"
                      />
                    </div>
                    <Button
                      variant="success"
                      type="submit"
                      disabled={btnLoading}
                    >
                      Update Image
                    </Button>
                  </form>
                )}
              </div>
              <div className="w-full lg:w-1/2 space-y-4">
                <h1 className="text-2xl font-bold">{product.title}</h1>
                <p className="text-lg">{product.description}</p>
                <p className="text-lg font-semibold ">₹{product.price}</p>

                {isAuth ? (
                  <>
                    {product.stock <= 0 ? (
                      <p className=" text-red-600 text-2xl">Out Of Stock</p>
                    ) : (
                      <Button onClick={addToCartHandler} variant="success">
                        Add To Cart
                      </Button>
                    )}
                  </>
                ) : (
                  <p className="text-blue-500">
                    plz Login to add something to cart
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
      {relatedProduct?.length > 0 && (
        <>
          {loading ? (
            <Loading />
          ) : (
            <div className="mt-12">
              <h2 className="text-xl font-bold">Related Products</h2>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {relatedProduct.map((e) => {
                  return <ProductCard key={e._id} product={e}></ProductCard>;
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductPage;
