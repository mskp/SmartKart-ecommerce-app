import { Button } from "@nextui-org/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useCart from "../hooks/use-cart";
import { fetchProducts, selectProducts } from "../redux/slices/product-slice";
import ErrorComponent from "./error-component";
import ProductSkeleton from "./product-skeleton";

export default function Products() {
  const { addToCart } = useCart();
  const dispatch = useDispatch();
  const { products, isLoading, error } = useSelector(selectProducts);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const handleAddToCart = (product) => {
    addToCart({ ...product, quantity: 1 });
  };

  if (isLoading) return <ProductSkeleton />;

  if (error)
    return (
      <ErrorComponent
        errorTitle={"Error fetching products"}
        errorSubtitle={"Try after sometime"}
      />
    );

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-2 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product, index) => (
            <section
              key={index}
              className="group relative cursor-pointer shadow-2xl p-4 rounded-lg flex flex-col gap-4"
            >
              <Link to={`/product/${product.id}`}>
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={product.image}
                    alt={product.title?.substring(10)}
                    className="object-cover object-center lg:h-full lg:w-full transition-transform duration-500 transform hover:scale-105"
                  />
                </div>
                <div className="mt-4 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={product.href}>
                        <span className="absolute inset-0 truncate" />
                        {product.title.substring(0, 30)}...
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.category}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900 ">
                    {`₹ ${product?.priceInINR}`}
                  </p>
                </div>
              </Link>
              <Button
                variant="bordered"
                color="default"
                onClick={() => handleAddToCart(product)}
              >
                Add To Cart
              </Button>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
