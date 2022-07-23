import { createContext, ReactNode } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./style.module.css";

const ToastContext = createContext(null);

const toastConfig = {
  autoClose: 5000,
  className: styles.toastNotification,
  closeButton: false,
  closeOnClick: false,
  bodyClassName: styles.toastBody,
  position: toast.POSITION.TOP_CENTER,
  progressStyle: {
    // autoClose depends on Progress Bar Element: https://github.com/fkhadra/react-toastify/issues/649#issuecomment-915303649
    visibility: "hidden",
  },
  toastClassName: styles.toast,
  theme: "colored",
};

export default function ToastProvider({ children }) {
  return (
    <ToastContext.Provider value={null}>
      {children}
      <ToastContainer {...toastConfig} />
    </ToastContext.Provider>
  );
}
