// ToastNotifier.jsx
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Styles/customToastStyles.css"; // custom styles

export const showSuccessToast = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 3000,
    className: "toast-success",
  });
};

export const showNoJobsToast = (message) => {
  toast.info(message, {
    position: "top-right",
    autoClose: 3000,
    className: "toast-info",
  });
};

export const showErrorToast = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 3000,
    className: "toast-error",
  });
};

export function ToastContainerWrapper() {
  return <ToastContainer limit={3} newestOnTop />;
}
