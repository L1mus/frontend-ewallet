import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { BadgeCheck, Banknote, Star } from "lucide-react";

import Avatar from "../../components/atoms/Avatar";
import Stepper from "../../components/molecules/Stepper";
import ModalPin from "../../components/organism/ModalPin";
import ModalStatus from "../../components/organism/ModalStatus";
import Input from "../../components/atoms/Input";
import ArrowLeftRight from "../../assets/icons/Send.svg?react";
import Bill from "../../assets/icons/u_money-bill.svg";
import Button from "../../components/atoms/Button";
import { transactionActions } from "../../redux/slice/transactionSlice.js";

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
    status: "success",
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
    };

    try {
      await dispatch(transactionActions.transfer(payload)).unwrap();
      setStatusModal({ isOpen: true, status: "success" });
    } catch (err) {
      setStatusModal({ isOpen: true, status: "failed" });
      console.error("Transfer error:", err);
    }
  };

  const handleStatusPrimaryAction = () => {
    if (statusModal.status === "success") {
      navigate("/dashboard");
    } else {
      setStatusModal((prev) => ({ ...prev, isOpen: false }));
    }
  };

  const handleStatusSecondaryAction = () => {
    setStatusModal((prev) => ({ ...prev, isOpen: false }));
    navigate("/history");
  };

  const handleCloseStatusModal = () => {
    setStatusModal((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="w-full pb-10">
      {/* Header */}
      <div className="mb-6">
        <div className="text-primary mb-6 hidden w-fit cursor-pointer items-center gap-2 md:flex">
          <ArrowLeftRight />
          <h1 className="text-xl font-bold text-black">Transfer Money</h1>
        </div>
        <Stepper
          steps={["Find People", "Set Nominal", "Finish"]}
          activeStep={1}
        />
      </div>

      <div className="md:border-grey-light w-full bg-white md:rounded-xl md:border md:p-8 md:shadow-sm">
        {/* Receiver info */}
        <div className="mb-8 px-4 md:px-0">
          <h3 className="mb-4 text-lg font-bold text-black">
            People Information
          </h3>
          <div className="border-grey-light flex items-center justify-between rounded-xl border bg-gray-100 p-4">
            <div className="flex items-center gap-4">
              <Avatar
                imageSrc={receiver?.profile_picture_url}
                className="h-16 w-16 rounded-xl object-cover shadow-sm md:h-21 md:w-21"
              />
              <div className="flex flex-col items-start">
                <span className="text-xs font-semibold text-black md:text-base">
                  {receiver?.full_name}
                </span>
                <span className="text-grey text-xs md:text-base">
                  {receiver?.phone || "-"}
                </span>
                {receiver?.isVerified && (
                  <span className="bg-primary mt-1 inline-flex items-center rounded-md px-2 py-1 text-sm font-normal text-white md:gap-1">
                    <BadgeCheck size={16} /> Verified
                  </span>
                )}
              </div>
            </div>
            <Star className="mr-2 h-6 w-6 text-gray-400" />
          </div>
        </div>

        {/* Amount */}
        <div className="mb-8 px-4 md:px-0">
          <h3 className="mb-1 text-lg font-bold text-black">Amount</h3>
          <p className="mb-4 text-sm text-gray-500">
            Type the amount you want to transfer and then press continue to the
            next steps.
          </p>
          <div className="relative w-full">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <Banknote className="text-grey h-5 w-5" />
            </div>
            <Input
              type="number"
              placeholder="Enter Nominal Transfer"
              icon={Bill}
              className="placeholder:font-medium"
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

        {/* Notes */}
        <div className="mb-10 px-4 md:px-0">
          <h3 className="mb-1 text-lg font-bold text-black">Notes</h3>
          <p className="text-grey mb-4 text-sm">
            You can add some notes for this transfer such as payment coffee or
            something
          </p>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Enter Some Notes"
            className="border-grey-light text-grey focus:border-primary min-h-35 w-full resize-y rounded-xl border p-4 font-medium outline-none placeholder:font-medium"
          />
        </div>

        {/* CTA */}
        <div className="px-4 md:px-0">
          <Button
            onClick={handleOpenPinModal}
            isLoading={isLoading}
            isFullWidth
            className="rounded-xl py-4 text-lg font-bold"
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
          onClick: handleStatusPrimaryAction,
        }}
        secondaryAction={{
          label: "View History",
          onClick: handleStatusSecondaryAction,
        }}
      />
    </div>
  );
};

export default TransferDetail;
