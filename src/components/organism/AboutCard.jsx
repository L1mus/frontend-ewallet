export const AboutCard = ({ icon, title, description }) => {
  return (
    <div className="from-primary-light to-primary flex h-72 w-full shrink-0 cursor-default flex-col items-center rounded-xl bg-linear-to-b text-center text-white shadow-lg transition-all duration-300 hover:-translate-y-2 md:w-55">
      <div className="flex h-full flex-col items-center pt-8.5">
        <div className="mb-6 flex h-14.5 w-14.5 items-center justify-center rounded-full bg-white shadow-sm">
          <img src={icon} alt={title} className="h-6 w-6 object-contain" />
        </div>

        <h3 className="mb-4 px-2 text-base leading-tight font-bold">{title}</h3>

        <p className="mb-8.5 px-3 text-xs leading-relaxed text-white/80">
          {description}
        </p>
      </div>
    </div>
  );
};
