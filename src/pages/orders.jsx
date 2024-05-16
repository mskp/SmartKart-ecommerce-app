import { useEffect } from "react";
import useOrders from "../hooks/use-orders";
import LoadingComponent from "../components/loading-component";
import ErrorComponent from "../components/error-component";

function Orders() {
  const { fetchUserAllOrders, orders, fetchingOrders, errorFetching } =
    useOrders();

  useEffect(() => {
    fetchUserAllOrders();
  }, []);

  if (fetchingOrders) return <LoadingComponent />;

  if (errorFetching) return <ErrorComponent errorTitle="No orders found" />;

  return (
    <section className="relative flex justify-center items-center">
      <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
        <h2 className="font-manrope font-bold text-4xl mb-6 leading-10 text-black text-center">
          Orders
        </h2>
        <div className="main-box border border-gray-200 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full mb-8">
          {orders?.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col lg:flex-row items-center p-6 border-b border-gray-200 gap-6 w-full "
            >
              <div className="img-box max-w-[140px]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="aspect-square w-full"
                />
              </div>
              <div className="flex flex-col lg:flex-row items-center w-full ">
                <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
                  <div className="flex items-center">
                    <div>
                      <h2 className="font-semibold text-xl leading-8 text-black mb-3">
                        {item.title}
                      </h2>
                      <p className="font-normal text-md leading-8 text-gray-500 mb-3">
                        Category:{" "}
                        <span className="capitalize">{item.category}</span>
                      </p>
                      <div className="flex items-center gap-4">
                        <p className="font-medium text-xl leading-7 text-black ">
                          Qty:{" "}
                          <span className="text-gray-800">{item.quantity}</span>
                        </p>
                        <p className="font-medium  leading-7 text-black text-xl">
                          Price:{" "}
                          <span className="text-gray-800">{`₹ ${item.priceInINR}`}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Orders;
