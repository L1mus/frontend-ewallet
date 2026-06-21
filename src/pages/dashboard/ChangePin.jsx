import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import User from "../../assets/icons/2 User.svg?react";

import Button from "../../components/atoms/Button";
import PinInput from "../../components/atoms/PinInput";
import { authActions } from "../../redux/slice/authSlice";
import { toast } from "react-toastify";

const ChangePin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.authReducer);

  const [step, setStep] = useState(1);
  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState("");

  const titles = {
    1: { title: "Enter Current Pin 👋", desc: "Please enter your current 6-digit PIN." },
    2: { title: "Create New Pin", desc: "Create a new 6-digit PIN." },
    3: { title: "Confirm New Pin", desc: "Please type your new PIN again to confirm." },
  };

  const handleNextStep = async () => {
    if (step === 1) {
      if (currentPin.length < 6) return setError("PIN must be 6 digits");
      setError("");
      setStep(2);
      return;
    }

    if (step === 2) {
      if (newPin.length < 6) return setError("PIN must be 6 digits");
      setError("");
      setStep(3);
      return;
    }

    if (confirmPin.length < 6) return setError("PIN must be 6 digits");
    if (newPin !== confirmPin) return setError("PINs do not match. Please try again.");

    setError("");

    try {
      const result = await dispatch(
          authActions.changePinUser({
            current_pin: currentPin,
            new_pin: confirmPin,
            confirm_new_pin: confirmPin,
          }),
      ).unwrap();

      dispatch(authActions.syncActiveSession(result));
      toast.success("PIN successfully updated!");
      navigate("/profile");
    } catch (err) {
      const message = typeof err === "string" ? err : "Failed to update PIN";
      setError(message);
      toast.error(message);
    }
  };

  return (
      <div className="w-full pb-10">
        <div className="flex items-center gap-2 mb-6 text-primary px-4 md:px-0">
          <User className={"text-2xl font-bold"} />
          <h1 className="text-xl font-bold text-black font-lexend">Profile</h1>
        </div>

        <div className="w-full bg-white md:border md:border-gray-200 md:rounded-xl md:shadow-sm p-6 md:p-12 flex flex-col items-center">
          <div className="text-center mb-10">
            <h2 className="font-bold text-black text-xl mb-2 font-lexend">
              {titles[step].title}
            </h2>
            <p className="text-gray-500 text-sm font-lexend">{titles[step].desc}</p>
          </div>

          <div className="w-full max-w-lg flex flex-col gap-10">
            <div className="flex justify-center">
              <PinInput
                  key={step}
                  length={6}
                  error={error}
                  onChange={
                    step === 1
                        ? setCurrentPin
                        : step === 2
                            ? setNewPin
                            : setConfirmPin
                  }
              />
            </div>

            <Button
                onClick={handleNextStep}
                isLoading={isLoading}
                isFullWidth
                className="font-bold"
            >
              {step < 3 ? "Next" : "Submit"}
            </Button>

            {step > 1 && (
                <button
                    type="button"
                    onClick={() => {
                      setStep((s) => s - 1);
                      setError("");
                    }}
                    className="text-center text-sm font-medium text-grey hover:text-primary transition-colors cursor-pointer"
                >
                  Back
                </button>
            )}
          </div>
        </div>
      </div>
  );
};

export default ChangePin;