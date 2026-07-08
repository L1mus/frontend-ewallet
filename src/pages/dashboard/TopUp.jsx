import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Banknote, BadgeCheck } from "lucide-react";
import Upload from "../../assets/icons/Upload.svg?react";
import Button from "../../components/atoms/Button";

import Avatar from "../../components/atoms/Avatar";
import InputRadio from "../../components/atoms/InputRadio";
import { transactionActions } from "../../redux/slice/transactionSlice";

const TopUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginUser } = useSelector((state) => state.authReducer);
  const { isLoading } = useSelector((state) => state.transactionReducer);
  const [nominal, setNominal] = useState("");
  const [selectedMethod, setSelectedMethod] = useState(1);

  const paymentMethods = [
    { id: 1, code: "bri", name: "Bank Rakyat Indonesia", logo: "/bri.png" },
    { id: 2, code: "bca", name: "Bank Central Asia", logo: "/bca.png" },
    { id: 3, code: "dana", name: "Dana", logo: "/dana.png" },
    { id: 4, code: "gopay", name: "Gopay", logo: "/gopay.png" },
    { id: 5, code: "ovo", name: "Ovo", logo: "/ovo.png" },
  ];

  const amountNum = parseFloat(nominal) || 0;
  const adminFee = amountNum > 0 ? 1000 : 0;
  const tax = amountNum * 0.1;
  const subTotal = amountNum + adminFee + tax;

  const formatIdr = (val) => {
    return new Intl.NumberFormat("id-ID").format(val);
  };

  const handleNominalChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setNominal(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nominal || amountNum <= 0) {
      toast.error("Please enter a valid top-up amount.");
      return;
    }

    if (!selectedMethod) {
      toast.error("Please select a payment method.");
      return;
    }

    const payload = {
      payment_method_id: parseInt(selectedMethod),
      amount: parseFloat(nominal),
    };

    try {
      await dispatch(transactionActions.topUp(payload)).unwrap();
      toast.success("Request Top-Up Successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error || "top up failed");
    }
  };

  return (
    <div className="w-full pb-10">
      <div className="text-primary mb-6 hidden items-center gap-2 md:flex">
        <Upload className={"text-2xl"} />
        <h1 className="text-xl font-bold text-black">Top Up Account</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
        <div className="md:border-grey-light flex flex-col gap-8 bg-white p-4 md:rounded-xl md:border md:p-8 md:shadow-sm lg:col-span-2">
          <div>
            <h3 className="mb-4 text-lg font-bold text-black">
              Account Information
            </h3>
            <div className="bg-grey-light flex items-center gap-4 rounded-xl p-4">
              <Avatar
                imageSrc={loginUser?.profile_picture_url}
                className="h-21 w-21 rounded-xl object-cover shadow-sm"
              />
              <div className="flex flex-col items-start gap-1">
                <span className="text-base font-bold text-black">
                  {loginUser?.full_name}
                </span>
                <span className="text-grey text-sm">
                  {loginUser?.phone || "-"}
                </span>
                {loginUser?.isVerified && (
                  <span className="bg-primary mt-1 inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-bold text-white">
                    <BadgeCheck size={14} /> Verified
                  </span>
                )}
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-1 text-lg font-bold text-black">Amount</h3>
            <p className="text-grey mb-4 text-sm">
              Type the amount you want to transfer to your e-wallet account
            </p>
            <div className="relative w-full">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <Banknote className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                value={nominal}
                min="0"
                onKeyDown={(e) => {
                  if (["-", "+", "e", "E", ".", ","].includes(e.key)) {
                    e.preventDefault();
                  }
                }}
                onChange={handleNominalChange}
                disabled={isLoading}
                placeholder="Enter Nominal Transfer"
                className="border-grey-light text-grey focus:border-primary w-full rounded-xl border py-3.5 pr-4 pl-12 font-medium shadow-sm transition-colors outline-none"
              />
            </div>
          </div>

          <div>
            <h3 className="mb-1 text-lg font-bold text-black">
              Payment Method
            </h3>
            <p className="text-grey mb-4 text-sm">
              Choose your payment method for top up account
            </p>
            <div className="flex flex-col gap-3">
              {paymentMethods.map((method) => (
                <InputRadio
                  key={method.id}
                  nameInput="paymentMethod"
                  valueInput={method.id}
                  labelName={method.name}
                  logo={method.logo}
                  checked={selectedMethod === method.id}
                  onChange={(e) => setSelectedMethod(parseInt(e.target.value))}
                  disabled={isLoading}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="border-grey-light bg-white p-4 md:rounded-xl md:border md:p-6 md:shadow-sm lg:sticky lg:top-8">
            <h3 className="mb-6 text-lg font-bold text-black">Payment</h3>

            <div className="mb-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-grey text-sm font-medium">Order</span>
                <span className="text-sm font-bold text-black">
                  Rp. {formatIdr(amountNum)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-grey text-sm font-medium">Fee</span>
                <span className="text-sm font-bold text-black">
                  Rp. {formatIdr(adminFee)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-grey text-sm font-medium">Tax</span>
                <span className="text-sm font-bold text-black">
                  Rp. {formatIdr(tax)}
                </span>
              </div>
            </div>

            <div className="border-grey-light mb-6 border-t-[1.5px] border-dashed pt-5">
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-gray-800">
                  Sub Total
                </span>
                <span className="text-base font-bold text-black">
                  Rp. {formatIdr(subTotal)}
                </span>
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              isLoading={isLoading}
              isFullWidth
              className="cursor-pointer rounded-xl py-3.5 font-bold shadow-md"
            >
              Submit
            </Button>

            <p className="text-grey mt-4 text-xs leading-relaxed">
              *Get Discount if you pay with Bank Central Asia
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopUp;
