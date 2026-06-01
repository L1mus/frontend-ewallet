import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import User from "../../assets/icons/2 User.svg?react";

import Button from "../../components/atoms/Button";
import PinInput from "../../components/atoms/PinInput";
import { registerActions } from "../../redux/slice/registerSlice";
import { loginActions } from "../../redux/slice/loginSlice";
import { toast } from "react-toastify";

const ChangePin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loginUser } = useSelector((state) => state.loginReducer);
  const { isLoading } = useSelector((state) => state.registerReducer);
  const [pin, setPin] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pin.length < 6) return toast.error("The PIN must be 6 digits.");

    try {
      const result = await dispatch(
          registerActions.changePinUser({
            new_pin: pin,
          }),
      ).unwrap();

      dispatch(loginActions.syncActiveSession(result));
      toast.success("PIN successfully updated!");
      navigate("/profile");
    } catch (err) {
      toast.error(err);
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
            Change Pin 👋
          </h2>
          <p className="text-gray-500 text-sm font-lexend">
            Please save your pin because this so important.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg flex flex-col gap-10"
        >
          <div className="flex justify-center">
            <PinInput
              length={6}
              value={pin}
              onChange={(newPin) => setPin(newPin)}
            />
          </div>

          <Button
            type="submit"
            isLoading={isLoading}
            isFullWidth
            className="font-bold"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChangePin;
