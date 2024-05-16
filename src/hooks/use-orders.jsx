import { useSelector, useDispatch } from "react-redux";
import {
  addOrderToFirestore,
  fetchUserOrders,
  addMultipleOrdersToFirestore,
  selectOrders,
  selectOrderState,
} from "../redux/slices/orders-slice";
import toast from "react-hot-toast";

const useOrders = () => {
  const { fetchingOrders, addingOrder, errorFetching, errorAdding } =
    useSelector(selectOrderState);
  const orders = useSelector(selectOrders);
  const dispatch = useDispatch();

  const addNewOrder = async (order) => {
    try {
      await dispatch(addOrderToFirestore(order));
      toast.success("Order Confirmed", { id: "success-toast" });
    } catch (error) {
      toast.error("Order Failed", { id: "error-toast" });
      console.error("Error adding order:", error);
    }
  };

  const addMultipleOrders = async (ordersData) => {
    try {
      await dispatch(addMultipleOrdersToFirestore(ordersData));
      toast.success("Orders Confirmed", { id: "success-toast" });
    } catch (error) {
      toast.error("Orders Failed", { id: "error-toast" });
      console.error("Error adding orders:", error);
    }
  };

  const fetchUserAllOrders = async () => {
    try {
      await dispatch(fetchUserOrders());
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return {
    orders,
    fetchingOrders,
    addingOrder,
    errorFetching,
    errorAdding,
    addNewOrder,
    addMultipleOrders,
    fetchUserAllOrders,
  };
};

export default useOrders;
