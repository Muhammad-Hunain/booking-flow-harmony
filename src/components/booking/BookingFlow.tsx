
import { useState } from "react";
import { BookingProgressBar, Step } from "./BookingProgressBar";
import { ServiceSelection } from "./ServiceSelection";
import { PricingBreakdown } from "./PricingBreakdown";

const STEPS: Step[] = [
  { id: 1, name: "Service", completed: false, current: true },
  { id: 2, name: "Pricing", completed: false, current: false },
  { id: 3, name: "Details", completed: false, current: false },
  { id: 4, name: "Payment", completed: false, current: false },
];

export const BookingFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [steps, setSteps] = useState(STEPS);

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      const updatedSteps = steps.map((step) => {
        if (step.id === currentStep) {
          return { ...step, completed: true, current: false };
        } else if (step.id === currentStep + 1) {
          return { ...step, current: true };
        }
        return step;
      });
      
      setSteps(updatedSteps);
      setCurrentStep((prev) => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-bookingBg flex flex-col pt-8 px-4">
      <BookingProgressBar steps={steps} />
      
      <div className="flex-1 flex items-start justify-center mt-6 pb-12">
        {currentStep === 1 && <ServiceSelection onContinue={handleNextStep} />}
        {currentStep === 2 && <PricingBreakdown onContinue={handleNextStep} />}
        {currentStep > 2 && (
          <div className="text-center">
            <h2 className="text-2xl font-bold">Next Steps Coming Soon</h2>
            <p className="text-bookingMuted mt-2">
              This is a demonstration of the first two steps of the booking flow.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
