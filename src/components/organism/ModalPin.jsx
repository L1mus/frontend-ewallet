import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Modal from "./Modal";
import PinInput from "../atoms/PinInput";
import Button from "../atoms/Button";

const pinSchema = z.object({
  pin: z.string().length(6, "PIN must be 6 digits"),
});

const ModalPin = ({ isOpen, onClose, onConfirm, transferToName }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(pinSchema),
    defaultValues: { pin: "" },
  });

  const onSubmit = (data) => {
    onConfirm(data.pin);
    reset();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col">
        {transferToName && (
          <div className="border-grey-light mb-8 w-full border-b pb-4">
            <h2 className="text-grey text-sm font-bold tracking-wide uppercase">
              TRANSFER TO {transferToName}
            </h2>
          </div>
        )}

        <div className="mb-8 text-left">
          <h3 className="mb-2 text-3xl font-medium text-black">
            Enter Your Pin 👋
          </h3>
          <p className="text-grey text-sm">Enter Your Pin For Transaction</p>
        </div>

        <div className="mb-10 w-full">
          <Controller
            name="pin"
            control={control}
            render={({ field }) => (
              <PinInput
                value={field.value}
                onChange={field.onChange}
                error={!!errors.pin}
              />
            )}
          />
          {errors.pin && (
            <p className="text-danger mt-2 text-xs font-medium">
              {errors.pin.message}
            </p>
          )}
        </div>

        <Button type="submit" children="Submit" isFullWidth={true} />

        <div className="mt-5 text-center">
          <span className="text-sm text-gray-500">
            Forgot Your Pin?{" "}
            <span>
              <button className="text-primary cursor-pointer hover:underline">
                Reset
              </button>
            </span>
          </span>
        </div>
      </form>
    </Modal>
  );
};

export default ModalPin;
