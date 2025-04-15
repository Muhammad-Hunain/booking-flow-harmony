
import { cn } from "@/lib/utils";

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
    <nav aria-label="Booking progress" className="w-full py-6">
      <ol className="flex items-center justify-center w-full space-x-2 sm:space-x-4">
        {steps.map((step, index) => (
          <li
            key={step.id}
            className={cn(
              "flex items-center space-x-2 sm:space-x-4",
              index < steps.length - 1 ? "flex-1" : ""
            )}
          >
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300",
                  step.current
                    ? "border-bookingAccent bg-white text-bookingAccent"
                    : step.completed
                    ? "border-bookingAccent bg-bookingAccent text-white"
                    : "border-gray-300 bg-white text-gray-300"
                )}
              >
                {step.completed ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                ) : (
                  <span className="text-sm font-bold">{step.id}</span>
                )}
              </div>
              <span
                className={cn(
                  "mt-2 text-sm font-medium",
                  step.current ? "text-bookingAccent" : "text-bookingMuted"
                )}
              >
                {step.name}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-0.5 transition-colors duration-300",
                  steps[index + 1].completed || steps[index + 1].current
                    ? "bg-bookingAccent"
                    : "bg-gray-200"
                )}
              ></div>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
