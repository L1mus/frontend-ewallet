import Modal from "./Modal";

const ModalStatus = ({
  isOpen,
  onClose,
  status,
  transferToName,
  primaryAction,
  secondaryAction,
}) => {
  const isSuccess = status === "success";

  const content = {
    success: {
      titlePrefix: "Yeay Transfer ",
      titleHighlight: "Success",
      titleColor: "text-success",
      message: "Thank you for using this application for your financial",
      imagePlaceholder: "/Contact us-pana 1.png",
    },
    failed: {
      titlePrefix: "Oops Transfer ",
      titleHighlight: "Failed",
      titleColor: "text-danger",
      message: "Sorry Theres is an issue for your transfer, try again later !",
      imagePlaceholder: "/Oh no-cuate 1.png",
    },
  };

  const currentContent = isSuccess ? content.success : content.failed;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex w-full flex-col items-center">
        {transferToName && (
          <div className="border-grey-light mb-6 w-full border-b pb-4">
            <h2 className="text-grey text-base font-bold tracking-wide uppercase">
              TRANSFER TO {transferToName}
            </h2>
          </div>
        )}

        <div className="mb-6 flex w-full justify-center">
          <img
            src={currentContent.imagePlaceholder}
            alt={`${status} illustration`}
            className="h-40 w-auto object-contain"
          />
        </div>

        <div className="mb-8 w-full text-center">
          <h3 className="mb-3 text-[26px] font-bold text-black">
            {currentContent.titlePrefix}
            <span className={currentContent.titleColor}>
              {currentContent.titleHighlight}
            </span>
          </h3>
          <p className="text-grey px-4 text-sm leading-relaxed">
            {currentContent.message}
          </p>
        </div>

        <div className="flex w-full flex-col gap-3">
          <button
            onClick={primaryAction?.onClick}
            className="bg-primary hover:bg-primary/90 w-full cursor-pointer rounded-xl py-4 text-base font-bold text-white transition-all"
          >
            {primaryAction?.label}
          </button>

          <button
            onClick={secondaryAction?.onClick}
            className="border-primary text-primary hover:bg-primary/5 w-full cursor-pointer rounded-xl border bg-white py-4 text-base font-bold transition-all"
          >
            {secondaryAction?.label}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalStatus;
