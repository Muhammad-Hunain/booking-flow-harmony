
import { Check } from "lucide-react";

export type Step = {
  id: number;
  name: string;
  completed: boolean;
  current: boolean;
};

interface BookingProgressBarProps {
  steps: Step[];
}

export const BookingProgressBar = ({ steps }: BookingProgressBarProps) => {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-1 items-center justify-center">
            <div className="flex flex-col items-center relative">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step.completed
                    ? "bg-amber-500 text-white"
                    : step.current
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 text-white"
                } z-10`}
              >
                {step.completed ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <span className="text-xs">{step.id}</span>
                )}
              </div>
              
              <span
                className={`text-[10px] font-semibold mt-2 text-center uppercase ${
                  step.current || step.completed ? "text-amber-500" : "text-gray-400"
                }`}
              >
                {step.name}
              </span>
            </div>
            
            {index < steps.length - 1 && (
              <div 
                className={`h-0.5 flex-1 mx-1 ${
                  steps[index + 1].completed || steps[index + 1].current 
                    ? "bg-amber-500" 
                    : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
