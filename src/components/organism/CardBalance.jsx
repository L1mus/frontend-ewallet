import React from "react";

const CardBalance = ({
  children,
  // eslint-disable-next-line no-unused-vars
  Icon,
  iconStyle,
  title,
  balance,
  growthIndicators,
  growthPeriod,
}) => {
  return (
    <>
      <div className="border-grey-light flex w-full flex-col items-center justify-center gap-2 rounded-lg border-2 bg-white p-2 sm:items-start sm:border lg:h-37">
        <div className="flex items-center gap-2">
          <div className="text-primary">{children}</div>
          <p className="text-xs sm:text-base">{title}</p>
        </div>
        <p className="text-center text-xs font-semibold sm:text-sm lg:text-base">
          Rp {balance}
        </p>
        <div className="flex items-center gap-0.5 sm:gap-1">
          <p className="text-xs sm:text-sm">{growthIndicators}</p>
          <p>
            <Icon className={iconStyle} />
          </p>
          <p className="text-[8px] tracking-tighter sm:text-sm">
            {growthPeriod}
          </p>
        </div>
      </div>
    </>
  );
};

export default CardBalance;
