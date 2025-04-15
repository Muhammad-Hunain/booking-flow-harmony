
import { useState } from "react";
import { BookingProgressBar, Step } from "./BookingProgressBar";
import { ServiceSelection } from "./ServiceSelection";
import { PricingBreakdown } from "./PricingBreakdown";
import { PersonalDetailsForm } from "./PersonalDetailsForm";
import { PaymentForm } from "./PaymentForm";
import { Card } from "@/components/ui/card";

const STEPS: Step[] = [
  { id: 1, name: "Book a Service", completed: false, current: true },
  { id: 2, name: "Price Breakdown", completed: false, current: false },
  { id: 3, name: "Personal Details", completed: false, current: false },
  { id: 4, name: "Payment", completed: false, current: false },
  { id: 5, name: "Booking Confirmation", completed: false, current: false },
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

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      const updatedSteps = steps.map((step) => {
        if (step.id === currentStep) {
          return { ...step, completed: false, current: false };
        } else if (step.id === currentStep - 1) {
          return { ...step, completed: false, current: true };
        }
        return step;
      });
      
      setSteps(updatedSteps);
      setCurrentStep((prev) => prev - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <ServiceSelection onContinue={handleNextStep} />;
      case 2:
        return <PricingBreakdown selections={selections} onContinue={handleNextStep} />;
      case 3:
        return <PersonalDetailsForm selections={selections} onContinue={handleNextStep} onBack={handlePreviousStep} />;
      case 4:
        return <PaymentForm selections={selections} onContinue={handleNextStep} onBack={handlePreviousStep} />;
      case 5:
        return (
          <div className="text-center p-6">
            <h2 className="text-2xl font-bold mb-4">Booking Confirmation</h2>
            <p className="text-gray-600 mb-6">
              Thank you for your booking! A confirmation email has been sent to your email address.
            </p>
            <div className="flex justify-center space-x-4">
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
                Make a New Booking
              </button>
            </div>
          </div>
        );
      default:
        return (
          <div className="text-center p-6">
            <h2 className="text-2xl font-bold mb-4">Additional Steps Coming Soon</h2>
            <p className="text-gray-600 mb-6">
              This step is under construction.
            </p>
            <div className="flex justify-center space-x-4">
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
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100/30 flex flex-col items-center pt-8 px-4 pb-12">
      <div className="w-full max-w-md">
        <BookingProgressBar steps={steps} />
        
        <Card className="mt-8 p-6 shadow-lg border-amber-50">
          {renderStepContent()}
        </Card>
      </div>
    </div>
  );
};
