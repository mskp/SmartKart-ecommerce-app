import { useSelector, useDispatch } from "react-redux";
import {
  selectCart,
  addItem,
  removeItem,
  updateItemQuantity,
  clearCart,
  showCartModal,
  hideCartModal,
  selectCartModalVisibility,
  selectTotalPrice,
  selectTotalProducts,
} from "../redux/slices/cart-slice";
import useAuth from "./use-auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useCart = () => {
  const totalPrice = useSelector(selectTotalPrice);
  const cart = useSelector(selectCart);
  const cartModalVisible = useSelector(selectCartModalVisibility);
  const dispatch = useDispatch();
  const totalItems = useSelector(selectTotalProducts);
  const navigate = useNavigate();

  const {
    auth: { isAuthenticated },
  } = useAuth();

  const addToCart = (item) => {
    if (!isAuthenticated) {
      toast.error("You must login first", { id: "error-toast" });
      return navigate("/login");
    }
    try {
      dispatch(addItem(item));
      toast.success("Item added to cart", { id: "success-toast" });
    } catch (error) {
      toast.error(error.message, { id: "error-toast" });
    }
  };

  const removeFromCart = (itemId) => {
    dispatch(removeItem(itemId));
  };

  const updateCartItemQuantity = (itemId, quantity) => {
    dispatch(updateItemQuantity({ id: itemId, quantity }));
  };

  const clearWholeCart = () => {
    dispatch(clearCart());
  };

  const showCart = () => {
    dispatch(showCartModal());
  };

  const hideCart = () => {
    dispatch(hideCartModal());
  };

  return {
    cart,
    totalPrice,
    cartModalVisible,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearWholeCart,
    showCart,
    hideCart,
    totalItems,
  };
};

export default useCart;
