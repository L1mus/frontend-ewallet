import Avatar from "../atoms/Avatar";

const CardHistory = ({ name, status, imageSrc, amount }) => {
  return (
    <div className="flex items-center justify-between gap-2 py-2">
      <div className="flex items-center gap-3 overflow-hidden">
        <Avatar
          imageSrc={imageSrc}
          className="h-10 w-10 shrink-0 rounded-lg shadow-sm sm:h-11 sm:w-11"
        />

        <div className="flex flex-col overflow-hidden">
          <p className="truncate text-sm font-semibold text-black">{name}</p>
          <p className="text-grey mt-0.5 truncate text-xs">{status}</p>
        </div>
      </div>

      <p className="shrink-0 text-right text-sm font-semibold">{amount}</p>
    </div>
  );
};

export default CardHistory;
