
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
          <div key={step.id} className="flex flex-1 items-center">
            <div className="flex flex-col items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full z-10 ${
                  step.completed
                    ? "bg-[#FFCF00] text-white"
                    : step.current
                    ? "bg-[#119142] text-white"
                    : "bg-black text-white"
                }`}
              >
                {step.completed ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <span className="text-xs font-semibold">{step.id}</span>
                )}
              </div>
              
              <span
                className={`text-[10px] font-medium mt-2 text-center uppercase ${
                  step.current || step.completed ? "text-[#FFCF00]" : "text-gray-400"
                }`}
              >
                {step.name}
              </span>
            </div>
            
            {index < steps.length - 1 && (
              <div 
                className={`h-0.5 flex-1 ${
                  steps[index + 1].completed || steps[index + 1].current || step.completed
                    ? "bg-[#FFCF00]" 
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
