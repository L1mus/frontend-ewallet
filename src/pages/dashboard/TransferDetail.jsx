import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {useDispatch, useSelector} from "react-redux";
import { toast } from "react-toastify";
import { Banknote, BadgeCheck, Star } from "lucide-react";
import Avatar from "../../components/atoms/Avatar";
import Stepper from "../../components/molecules/Stepper";
import ModalPin from "../../components/organism/ModalPin";
import ModalStatus from "../../components/organism/ModalStatus";
import Input from "../../components/atoms/Input";

import ArrowLeftRight from "../../assets/icons/Send.svg?react";
import Bill from "../../assets/icons/u_money-bill.svg";
import Button from "../../components/atoms/Button";
import {transactionActions} from "../../redux/slice/transactionSlice.js";

const TransferDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const receiver = location.state?.receiver;

  const { loginUser: sender } = useSelector((state) => state.authReducer);
  const { isLoading } = useSelector((state) => state.transactionReducer);

  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);

  const [statusModal, setStatusModal] = useState({
    isOpen: false,
    success: "success",
  });

  useEffect(() => {
    if (!receiver) {
      toast.error("Please select a recipient first.");
      navigate("/transfer");
    }
  }, [receiver, navigate]);

  const handleOpenPinModal = () => {
    const amountNum = parseFloat(amount);
    if (!amount || amountNum <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }
    if (sender && amountNum > sender.balance) {
      toast.error("Insufficient balance.");
      return;
    }
    setIsPinModalOpen(true);
  };


  const handleConfirmTransfer = async (pin) => {
    setIsPinModalOpen(false);
    const payload = {
      receiverID: receiver?.id,
      amount: parseFloat(amount),
      notes: notes,
      pin: pin,
    }
    try {
      dispatch(transactionActions.transfer(payload)).unwrap();
      navigate("/auth/enter-pin", {
        state: {
          type: "TRANSFER",
          receiver_id: receiver?.id,
          amount: parseFloat(amount),
          notes: notes,
        },
      });
    } catch (err) {
      toast.error(err || "transfer failed");
    }finally {
      setIsPinModalOpen(false);
    }
  };

  const handleCloseStatusModal = () => {
    setStatusModal((prev) => ({ ...prev, isOpen: false }));
    // if (statusModal.status === "success") {
    //   navigate("/dashboard");
    // }
  };

  return (
    <div className="w-full pb-10">
      <div className="mb-6">
        <div
          className="hidden md:flex items-center gap-2 mb-6 text-primary cursor-pointer w-fit"
        >
          <ArrowLeftRight />
          <h1 className="text-xl font-bold text-black">Transfer Money</h1>
        </div>
        <Stepper
          steps={["Find People", "Set Nominal", "Finish"]}
          activeStep={1}
        />
      </div>

      <div className="w-full bg-white md:border md:border-grey-light md:rounded-xl md:shadow-sm md:p-8">
        <div className="mb-8 px-4 md:px-0">
          <h3 className="font-bold text-black text-lg mb-4">
            People Information
          </h3>
          <div className="bg-gray-100 rounded-xl p-4 flex items-center justify-between border border-grey-light">
            <div className="flex items-center gap-4">
              <Avatar
                imageSrc={receiver?.profile_picture_url}
                className=" w-16 h-16 md:w-21 md:h-21 rounded-xl object-cover shadow-sm"
              />
              <div className="flex flex-col items-start">
                <span className="font-semibold text-black text-xs md:text-base">
                  {receiver?.full_name}
                </span>
                <span className="text-grey text-xs md:text-base">
                  {receiver?.phone || "-"}
                </span>
                {receiver?.isVerified && (
                  <span className="inline-flex items-center md:gap-1 bg-primary text-white text-sm font-normal px-2 py-1 rounded-md mt-1">
                    <BadgeCheck size={16} /> Verified
                  </span>
                )}
              </div>
            </div>
            <Star className="text-gray-400 w-6 h-6 mr-2" />
          </div>
        </div>

        <div className="mb-8 px-4 md:px-0">
          <h3 className="font-bold text-black text-lg mb-1">Amount</h3>
          <p className="text-gray-500 text-sm mb-4">
            Type the amount you want to transfer and then press continue to the
            next steps.
          </p>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Banknote className="text-grey w-5 h-5" />
            </div>
            <Input
              type={"number"}
              placeholder={"Enter Nominal Transfer"}
              icon={Bill}
              className={"placeholder:font-medium"}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
              onKeyDown={(e) => {
                if (["-", "+", "e", "E", ".", ","].includes(e.key)) {
                  e.preventDefault();
                }
              }}
            />
          </div>
        </div>

        <div className="mb-10 px-4 md:px-0">
          <h3 className="font-bold text-black text-lg mb-1">Notes</h3>
          <p className="text-grey text-sm mb-4">
            You can add some notes for this transfer such as payment coffee or
            something
          </p>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Enter Some Notes"
            className="w-full border border-grey-light rounded-xl p-4 outline-none text-grey font-medium focus:border-primary min-h-35 resize-y placeholder:font-medium"
          ></textarea>
        </div>

        <div className="px-4 md:px-0">
          <Button
            onClick={handleOpenPinModal}
            isLoading={isLoading}
            isFullWidth
            className="py-4 rounded-xl font-bold text-lg"
          >
            Continue to Transfer
          </Button>
        </div>
      </div>

      <ModalPin
        isOpen={isPinModalOpen}
        onClose={() => setIsPinModalOpen(false)}
        onConfirm={handleConfirmTransfer}
        transferToName={receiver?.full_name}
      />

      <ModalStatus
        isOpen={statusModal.isOpen}
        onClose={handleCloseStatusModal}
        status={statusModal.status}
        transferToName={receiver?.full_name}
        primaryAction={{
          label:
            statusModal.status === "success"
              ? "Back to Dashboard"
              : "Try Again",
          onClick: handleCloseStatusModal,
        }}
        secondaryAction={{
          label: "View History",
          onClick: () => {
            handleCloseStatusModal();
            navigate("/history");
          },
        }}
      />
    </div>
  );
};

export default TransferDetail;
