import { Bounce, toast } from "react-toastify";

// let toastId;
export const ToastFunc = (toastContent: string, toastType: string) => {
  toast.dismiss();
  (toast as any)[toastType](toastContent, {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};
