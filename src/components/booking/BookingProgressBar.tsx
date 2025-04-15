
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
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center">
            <div
              className={`flex items-center justify-center w-6 h-6 rounded-full ${
                step.completed
                  ? "bg-amber-500 text-white"
                  : step.current
                  ? "bg-green-500 text-white"
                  : "bg-gray-300 text-white"
              }`}
            >
              {step.completed ? (
                <Check className="w-4 h-4" />
              ) : (
                <span className="text-xs"></span>
              )}
            </div>
            
            {index < steps.length - 1 && (
              <div
                className={`h-0.5 w-10 sm:w-16 mt-3 ${
                  step.completed ? "bg-black" : "bg-gray-200"
                }`}
                style={{ 
                  position: "absolute", 
                  left: `calc(${((index + 0.5) / steps.length) * 100}% - 20px)`,
                  width: `calc(${100 / steps.length}% - 20px)`
                }}
              ></div>
            )}
            
            <span
              className={`text-[10px] font-semibold mt-2 ${
                step.current || step.completed ? "text-amber-500" : "text-gray-400"
              }`}
            >
              {step.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
