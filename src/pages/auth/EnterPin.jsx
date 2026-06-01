import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import PinInput from "../../components/atoms/PinInput";
import Button from "../../components/atoms/Button";
import iconMoneyWallet from "../../assets/icons/Money-Wallet.svg";
import { useSelector, useDispatch } from "react-redux";
import { transactionActions } from "../../redux/slice/transactionSlice";
import { toast } from "react-toastify";

const EnterPin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [pinValue, setPinValue] = useState("");
  const [error, setError] = useState("");
  const stateLogin = useSelector((state) => state.loginReducer);
  const stateTransaction = useSelector((state) => state.transactionReducer);
  const pendingTransaction = location.state || null;

  useEffect(() => {
    if (!stateLogin.isLogin) {
      navigate("/auth/login", { replace: true });
    }
  }, [navigate, stateLogin.isLogin]);

  const handleVerify = async () => {
    if (pinValue.length < 6) {
      setError("Enter the complete 6 digit PIN");
      return;
    }
    setError("");
    if (pendingTransaction && pendingTransaction.type === "TRANSFER") {
      try {
        const payloadTransfer = {
          receiver_id:  parseInt(pendingTransaction.receiver_id),
          amount:       parseFloat(pendingTransaction.amount),
          description:  pendingTransaction.description || "",
          pin:          pinValue,
        };
        await dispatch(transactionActions.transfer(payloadTransfer)).unwrap();
        toast.success("Transfer successful!", { autoClose: 1500 });
        navigate("/dashboard");
      } catch (err) {
        // Error dikembalikan oleh backend jika PIN salah atau saldo tidak cukup
        setError(err || "Transaction failed. Please check your PIN.");
        toast.error(err || "Transfer failed");
      }
      return;
    }

    if (pinValue === "123456") {
      toast.success("Authorization Successful!", { autoClose: 1000 });
      navigate("/dashboard");
    } else {
      setError("The PIN you entered is incorrect");
    }
  };

  if (!stateLogin.isLogin) return null;

  return (
      <div className="relative min-h-screen w-full bg-primary font-sans overflow-hidden flex items-center justify-center px-4 sm:px-8 py-10">
        <div
            className="absolute w-150 h-150 sm:w-200 sm:h-200 rounded-full z-0 pointer-events-none"
            style={{
              background: "radial-gradient(circle, #7096FF 0%, #3868FD 87%)",
              opacity: 0.7,
            }}
        />

        <div className="relative z-10 w-full max-w-125 bg-white rounded-[30px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] px-8 py-12 sm:px-12 flex flex-col items-center">
          <div className="w-full flex justify-start items-center gap-2 mb-8">
            <img
                src={iconMoneyWallet}
                alt="Logo"
                className="w-8 h-8 object-contain"
            />
            <h1 className="text-primary font-medium text-xl tracking-wide">
              E-Wallet
            </h1>
          </div>

          <div className="mb-10 mt-8 md:mt-0 text-center">
            <h1 className="text-3xl font-medium text-black mb-3 leading-snug">
              Enter Security PIN
            </h1>
            <p className="text-base font-normal text-grey leading-relaxed">
              Please enter your 6-digit E-Wallet PIN to authorize this action.
            </p>
          </div>

          <div className="w-full flex flex-col gap-8 mt-2 items-center">
            <PinInput length={6} onChange={setPinValue} error={error} />

            <Button
                variant="rectangelBlue"
                isFullWidth={true}
                onClick={handleVerify}
                isLoading={stateTransaction?.isLoading}
            >
              {stateTransaction?.isLoading ? "Processing..." : "Confirm PIN"}
            </Button>

            <button className="text-sm text-primary font-semibold hover:underline text-center cursor-pointer">
              Forgot PIN?
            </button>
          </div>
        </div>
      </div>
  );
};

export default EnterPin;