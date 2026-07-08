import React from "react";
import cn from "../../utils/cn";

const Stepper = ({ steps, activeStep }) => {
  return (
    <div className="mb-8 flex items-center gap-2">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full text-sm font-normal text-white transition-colors",
                index === activeStep ? "bg-primary" : "bg-grey",
              )}
            >
              {index + 1}
            </div>

            <span
              className={cn(
                "text-sm font-medium",
                index === activeStep ? "text-primary" : "text-gray-500",
              )}
            >
              {step}
            </span>
          </div>

          {index < steps.length - 1 && (
            <div className="mx-1 hidden w-10 border-t-[1.5px] border-dashed border-gray-400 sm:block sm:w-16 md:mx-3" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Stepper;
