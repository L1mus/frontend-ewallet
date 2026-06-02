import { useState } from "react";
import { useNavigate } from "react-router";
import { AuthLayout } from "../../components/templates/AuthLayout";
import PinInput from "../../components/atoms/PinInput";
import Button from "../../components/atoms/Button";
import imgBill from "../../assets/images/wallet.png";
import { useDispatch } from "react-redux";
import { loginActions } from "../../redux/slice/loginSlice";
import { toast } from "react-toastify";
import {userService} from "../../services/userService.js";

const CreatePin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [step,       setStep]       = useState(1);
  const [firstPin,   setFirstPin]   = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error,      setError]      = useState("");
  const [isLoading,  setIsLoading]  = useState(false);

  const handleNextStep = async () => {
    if (step === 1) {
      if (firstPin.length < 6) {
        setError("PIN must be 6 digits");
        return;
      }
      setError("");
      setStep(2);
      return;
    }

    if (confirmPin.length < 6) {
      setError("PIN must be 6 digits");
      return;
    }
    if (firstPin !== confirmPin) {
      setError("PINs do not match. Please try again.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      await userService.createPin({
        new_pin:         confirmPin,
        confirm_new_pin: confirmPin,
      });

      dispatch(loginActions.updateUserPin());

      toast.success("PIN created successfully!", { autoClose: 1500 });

      navigate("/dashboard");
    } catch (err) {
      const message =
          err?.response?.data?.message ||
          (typeof err === "string" ? err : "Failed to create PIN");
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <AuthLayout
          title={step === 1 ? "Create Security PIN" : "Confirm Your PIN"}
          subtitle={
            step === 1
                ? "Create a 6-digit PIN to secure your E-Wallet transactions."
                : "Please type your 6-digit PIN again to confirm."
          }
          imagePath={imgBill}
      >
        <div className="w-full h-full flex flex-col gap-8 mt-2">
          <PinInput
              key={step}
              length={6}
              onChange={step === 1 ? setFirstPin : setConfirmPin}
              error={error}
          />

          <Button
              variant="rectangelBlue"
              isFullWidth={true}
              onClick={handleNextStep}
              isLoading={isLoading}
          >
            {isLoading
                ? "Saving PIN..."
                : step === 1
                    ? "Next Step"
                    : "Confirm PIN"}
          </Button>

          {step === 2 && (
              <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setConfirmPin("");
                    setError("");
                  }}
                  className="text-center text-sm font-medium text-grey hover:text-primary transition-colors cursor-pointer"
              >
                Back to Create PIN
              </button>
          )}
        </div>
      </AuthLayout>
  );
};

export default CreatePin;