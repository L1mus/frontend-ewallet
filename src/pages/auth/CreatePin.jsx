import { useState } from "react";
import { useNavigate } from "react-router";
import { AuthLayout } from "../../components/templates/AuthLayout";
import PinInput from "../../components/atoms/PinInput";
import Button from "../../components/atoms/Button";
import imgBill from "../../assets/images/person.svg";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { userService } from "../../services/userService.js";
import { authActions } from "../../redux/slice/authSlice.js";

const CreatePin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [firstPin, setFirstPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
        new_pin: confirmPin,
        confirm_new_pin: confirmPin,
      });

      dispatch(authActions.updateUserPin());

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
      <div className="mt-2 flex h-full w-full flex-col gap-8">
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
            className="text-grey hover:text-primary cursor-pointer text-center text-sm font-medium transition-colors"
          >
            Back to Create PIN
          </button>
        )}
      </div>
    </AuthLayout>
  );
};

export default CreatePin;
