import { useDispatch, useSelector } from "react-redux";
import { showModal, hideModal } from "../redux/slices/modal-slice";

export const useModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modal.isOpen);

  const openModal = () => {
    dispatch(showModal());
  };

  const closeModal = () => {
    dispatch(hideModal());
  };

  return { isOpen, openModal, closeModal };
};
