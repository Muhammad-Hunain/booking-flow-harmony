
import { useState } from "react";
import { BookingProgressBar, Step } from "./BookingProgressBar";
import { ServiceSelection } from "./ServiceSelection";
import { PricingBreakdown } from "./PricingBreakdown";
import { PersonalDetailsForm } from "./PersonalDetailsForm";
import { PaymentForm } from "./PaymentForm";
import { BookingConfirmation } from "./BookingConfirmation";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";

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
    location: "",
    serviceType: "",
    dates: "",
    adults: 1,
    children: 0,
    group: "1 Adult",
    dateRange: {
      from: undefined as Date | undefined,
      to: undefined as Date | undefined
    }
  });
  
  // Generate a booking reference based on location
  const getLocationPrefix = (location: string) => {
    if (location.startsWith("London")) return "LON";
    if (location.startsWith("Manchester")) return "MAN";
    if (location.startsWith("Leeds")) return "LEE";
    return "LHB";
  };
  
  const bookingReference = selections.location ? 
    `${getLocationPrefix(selections.location)}${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}` : 
    'LHB000000';

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

  const updateSelections = (newSelections: Partial<typeof selections>) => {
    setSelections(prev => ({
      ...prev,
      ...newSelections
    }));
  };

  // Handle service selection completion
  const handleServiceSelectionComplete = (data: any) => {
    // Format date range for display
    let dateRangeDisplay = "";
    if (data.dateRange?.from && data.dateRange?.to) {
      dateRangeDisplay = `${format(data.dateRange.from, "d MMM")} – ${format(data.dateRange.to, "d MMM")}`;
    }
    
    // Format group display
    let groupDisplay = "";
    if (data.adults > 0 && data.children > 0) {
      groupDisplay = `${data.adults} Adult, ${data.children} Child${data.children !== 1 ? 'ren' : ''}`;
    } else if (data.adults > 0) {
      groupDisplay = `${data.adults} Adult${data.adults !== 1 ? 's' : ''}`;
    } else if (data.children > 0) {
      groupDisplay = `${data.children} Child${data.children !== 1 ? 'ren' : ''}`;
    }
    
    updateSelections({
      ...data,
      dates: dateRangeDisplay,
      group: groupDisplay
    });
    
    handleNextStep();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <ServiceSelection onContinue={handleServiceSelectionComplete} />;
      case 2:
        return <PricingBreakdown selections={selections} onContinue={handleNextStep} />;
      case 3:
        return <PersonalDetailsForm selections={selections} onContinue={handleNextStep} onBack={handlePreviousStep} />;
      case 4:
        return <PaymentForm selections={selections} onContinue={handleNextStep} onBack={handlePreviousStep} />;
      case 5:
        return <BookingConfirmation 
          selections={selections} 
          bookingReference={bookingReference}
          onNewBooking={() => {
            const updatedSteps = STEPS.map(step => ({
              ...step,
              completed: false,
              current: step.id === 1
            }));
            setSteps(updatedSteps);
            setCurrentStep(1);
          }}
        />;
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
