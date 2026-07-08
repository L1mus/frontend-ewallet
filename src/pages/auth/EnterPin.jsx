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
  const stateAuth = useSelector((state) => state.authReducer);
  const stateTransaction = useSelector((state) => state.transactionReducer);
  const pendingTransaction = location.state || null;

  useEffect(() => {
    if (!stateAuth.isLogin) {
      navigate("/auth/login", { replace: true });
    }
  }, [navigate, stateAuth.isLogin]);

  const handleVerify = async () => {
    if (pinValue.length < 6) {
      setError("Enter the complete 6 digit PIN");
      return;
    }
    setError("");
    if (pendingTransaction && pendingTransaction.type === "TRANSFER") {
      try {
        const payloadTransfer = {
          receiver_id: parseInt(pendingTransaction.receiver_id),
          amount: parseFloat(pendingTransaction.amount),
          description: pendingTransaction.notes || "",
          pin: pinValue,
        };
        await dispatch(transactionActions.transfer(payloadTransfer)).unwrap();
        toast.success("Transfer successful!", { autoClose: 1500 });
        navigate("/dashboard");
      } catch (err) {
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

  if (!stateAuth.isLogin) return null;

  return (
    <div className="bg-primary relative flex min-h-screen w-full items-center justify-center overflow-hidden px-4 py-10 font-sans sm:px-8">
      <div
        className="pointer-events-none absolute z-0 h-150 w-150 rounded-full sm:h-200 sm:w-200"
        style={{
          background: "radial-gradient(circle, #7096FF 0%, #3868FD 87%)",
          opacity: 0.7,
        }}
      />

      <div className="relative z-10 flex w-full max-w-125 flex-col items-center rounded-[30px] bg-white px-8 py-12 shadow-[0_20px_50px_rgba(0,0,0,0.15)] sm:px-12">
        <div className="mb-8 flex w-full items-center justify-start gap-2">
          <img
            src={iconMoneyWallet}
            alt="Logo"
            className="h-8 w-8 object-contain"
          />
          <h1 className="text-primary text-xl font-medium tracking-wide">
            E-Wallet
          </h1>
        </div>

        <div className="mt-8 mb-10 text-center md:mt-0">
          <h1 className="mb-3 text-3xl leading-snug font-medium text-black">
            Enter Security PIN
          </h1>
          <p className="text-grey text-base leading-relaxed font-normal">
            Please enter your 6-digit E-Wallet PIN to authorize this action.
          </p>
        </div>

        <div className="mt-2 flex w-full flex-col items-center gap-8">
          <PinInput length={6} onChange={setPinValue} error={error} />

          <Button
            variant="rectangelBlue"
            isFullWidth={true}
            onClick={handleVerify}
            isLoading={stateTransaction?.isLoading}
          >
            {stateTransaction?.isLoading ? "Processing..." : "Confirm PIN"}
          </Button>

          <button className="text-primary cursor-pointer text-center text-sm font-semibold hover:underline">
            Forgot PIN?
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnterPin;
