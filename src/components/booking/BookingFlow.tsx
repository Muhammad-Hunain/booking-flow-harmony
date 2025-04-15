
import { useState } from "react";
import { BookingProgressBar, Step } from "./BookingProgressBar";
import { ServiceSelection } from "./ServiceSelection";
import { PricingBreakdown } from "./PricingBreakdown";
import { Card } from "@/components/ui/card";

const STEPS: Step[] = [
  { id: 1, name: "BOOK A SERVICE", completed: false, current: true },
  { id: 2, name: "PRICE BREAKDOWN", completed: false, current: false },
  { id: 3, name: "PERSONAL DETAILS", completed: false, current: false },
  { id: 4, name: "PAYMENT", completed: false, current: false },
  { id: 5, name: "BOOKING CONFIRMATION", completed: false, current: false },
];

export const BookingFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [steps, setSteps] = useState(STEPS);
  const [selections, setSelections] = useState({
    location: "Leeds - City Centre",
    serviceType: "Mentor/Companion",
    dates: "1 Dec – 7 Dec",
    group: "1 Adult, 1 Child"
  });

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
    <div className="min-h-screen bg-gray-100/30 flex flex-col items-center pt-8 px-4 pb-12">
      <div className="w-full max-w-md">
        <BookingProgressBar steps={steps} />
        
        <Card className="mt-8 p-6 shadow-lg border-amber-50">
          {currentStep === 1 && <ServiceSelection onContinue={handleNextStep} />}
          {currentStep === 2 && <PricingBreakdown selections={selections} onContinue={handleNextStep} />}
          {currentStep > 2 && (
            <div className="text-center p-6">
              <h2 className="text-2xl font-bold mb-4">Additional Steps Coming Soon</h2>
              <p className="text-gray-600 mb-6">
                This is a demonstration of the first two steps of the booking flow.
              </p>
              <div className="flex justify-center space-x-4">
                <button 
                  onClick={() => {
                    const updatedSteps = STEPS.map(step => ({
                      ...step,
                      completed: step.id === 1,
                      current: step.id === 2
                    }));
                    setSteps(updatedSteps);
                    setCurrentStep(2);
                  }}
                  className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300"
                >
                  Back to Pricing
                </button>
                <button 
                  onClick={() => {
                    const updatedSteps = STEPS.map(step => ({
                      ...step,
                      completed: false,
                      current: step.id === 1
                    }));
                    setSteps(updatedSteps);
                    setCurrentStep(1);
                  }}
                  className="px-4 py-2 rounded-md bg-amber-100 text-amber-900 hover:bg-amber-200"
                >
                  Start Over
                </button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
