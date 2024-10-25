import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import useLocalStorageState from "use-local-storage-state";

const PaymentSuccess = ({ status = true }) => {
  const [cart, setCart] = useLocalStorageState("cart", {
    cart: {}
  });
  const paymentSuccess = status;
  React.useEffect(() => {
    if (paymentSuccess) {
      setCart({});
    }
  }, [paymentSuccess]);
  return (
    <div className="h-[60vh] flex items-center justify-center font-black text-xl gap-3 text-green-600">
      <CheckCircleIcon />
      Order Placed
    </div>
  );
};

export default PaymentSuccess;
