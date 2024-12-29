import React from "react";

const Stepper = ({
  steps,
  activeStep,
}: {
  steps: string[];
  activeStep: number;
}) => {
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((label, index) => (
        <div key={index} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              activeStep >= index ? "bg-green-500" : "bg-gray-300"
            } text-white`}
          >
            {index + 1}
          </div>
          {index < steps.length - 1 && (
            <div className="w-12 h-1 bg-gray-300 mx-2">
              <div
                className={`h-1 ${
                  activeStep > index ? "bg-green-500" : "bg-gray-300"
                }`}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
