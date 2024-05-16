import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import useCart from "../hooks/use-cart";
import { usdToInr } from "../utils";
import ErrorComponent from "./error-component";
import LoadingComponent from "./loading-component";
import { useSelector } from "react-redux";
import {
  fetchProductById,
  selectProducts,
} from "../redux/slices/product-slice";
import { useDispatch } from "react-redux";
import useOrders from "../hooks/use-orders";

function Product() {
  const productId = useLoaderData();
  const { addToCart } = useCart();
  const dispatch = useDispatch();
  const { addNewOrder, orders } = useOrders();

  const {
    isLoading,
    error,
    products: [product],
  } = useSelector(selectProducts);

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, []);

  if (isLoading) return <LoadingComponent />;

  if (error || !product)
    return (
      <ErrorComponent
        errorTitle={"Product not found"}
        errorSubtitle={
          "The product you're searching for is either out of stock or does not exist"
        }
      />
    );

  return (
    <div className="flex flex-col justify-between items-start md:flex-row -mx-2 md:space-x-4">
      <div className="md:w-1/2 mx-auto md:mx-0 mb-4 md:mb-0">
        <div className="h-[300px] md:h-[460px] rounded-lg overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={product.image}
            alt={product.title}
          />
        </div>
      </div>
      <div className="md:w-1/2 flex flex-col justify-center space-y-4">
        <h2 className="text-xl md:text-2xl font-bold mb-2">{product.title}</h2>
        <div className="flex justify-between items-center">
          <div className="text-gray-700">
            <span className="font-bold">Price:</span>{" "}
            <span> {`₹ ${product?.priceInINR}`}</span>
          </div>
        </div>
        <div>
          <span className="font-bold text-gray-700">Product Description:</span>{" "}
          <p className="text-gray-700 text-sm mt-2 capitalize">
            {product.description}
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 justify-start">
          <Button
            onClick={() => addToCart({ ...product, quantity: 1 })}
            variant="solid"
            color="primary"
            size="lg"
          >
            Add to Cart
          </Button>
          <Button
            onClick={async () => await addNewOrder({ ...product, quantity: 1 })}
            variant="solid"
            color="secondary"
            size="lg"
          >
            Buy now
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Product;
