import Star from "../../assets/icons/star.svg";
/**
 * ReviewCard
 * @typedef {object} ReviewCardProps
 * @param {String} props.avatar
 * @param {String} props.name
 * @param {Number} props.rating
 * @param {String} props.text
 * @returns {JSX.element}
 */

export const ReviewCard = ({ avatar, name, rating = 5, text }) => {
  return (
    <div className="flex min-h-100 w-full max-w-92 shrink-0 flex-col items-center rounded-xl border border-black/5 bg-[#E8E8E84D] text-center shadow-sm lg:shrink">
      <div className="flex h-full flex-col items-center px-6 py-10">
        <img
          src={avatar}
          alt={name}
          className="mb-4 h-14.5 w-14.5 rounded-full object-cover shadow-sm"
        />

        <h4 className="mb-2 text-lg font-bold text-black">{name}</h4>

        <div className="mb-6 flex items-center gap-2">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <img key={i} src={Star} alt="star" className="h-4 w-4" />
            ))}
          </div>
          <span className="text-base font-bold text-black">
            {rating.toFixed(1)}
          </span>
        </div>

        <div className="mb-4 text-3xl leading-none font-extrabold text-black">
          “
        </div>

        <p className="text-grey text-base leading-relaxed italic">“{text}”</p>
      </div>
    </div>
  );
};
