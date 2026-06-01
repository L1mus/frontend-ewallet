import { useState } from "react";
import { useNavigate } from "react-router";
import { AuthLayout } from "../../components/templates/AuthLayout";
import PinInput from "../../components/atoms/PinInput";
import Button from "../../components/atoms/Button";
import imgBill from "../../assets/images/wallet.png";
import { useDispatch, useSelector } from "react-redux";
import { registerActions } from "../../redux/slice/registerSlice";
import { loginActions } from "../../redux/slice/loginSlice";
import { toast } from "react-toastify";

const CreatePin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loginUser } = useSelector((state) => state.loginReducer);
  const stateRegister = useSelector((state) => state.registerReducer);
  const [step, setStep] = useState(1);
  const [firstPin, setFirstPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState("");

  const handleNextStep = async () => {
    if (step === 1) {
      if (firstPin.length < 6) {
        setError("PIN must be 6 digits");
        return;
      }
      setError("");
      setStep(2);
    } else {
      if (confirmPin.length < 6) {
        setError("PIN must be 6 digits");
        return;
      }
      if (firstPin !== confirmPin) {
        setError("The PIN does not match. Please try again");
        return;
      }

      try {
        setError("");
        await dispatch(
            registerActions.changePinUser({
              current_pin: "",
              new_pin: confirmPin,
              confirm_new_pin: confirmPin,
            })
        ).unwrap();

        toast.success("PIN successfully created!", { autoClose: 1500 });

        if (loginUser) {
          dispatch(loginActions.updateUserPin());
          navigate("/dashboard");
        } else {
          navigate("/auth/login");
        }
      } catch (err) {
        setError(err || "Failed to create PIN");
        toast.error(err || "Failed to save PIN");
      }
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
              isLoading={stateRegister.isLoading}
          >
            {stateRegister.isLoading
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