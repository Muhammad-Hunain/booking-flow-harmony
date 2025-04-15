
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SelectionTagProps {
  icon: ReactNode;
  label: string;
  value: string;
  className?: string;
}

export const SelectionTag = ({ icon, label, value, className }: SelectionTagProps) => {
  return (
    <div 
      className={cn(
        "flex items-center gap-3 px-4 py-3 bg-bookingPill rounded-full shadow-sm border border-amber-100", 
        className
      )}
    >
      <div className="flex-shrink-0 text-bookingText opacity-70">
        {icon}
      </div>
      <div className="flex flex-col">
        <p className="text-xs text-bookingMuted">{label}</p>
        <p className="font-medium text-bookingText">{value}</p>
      </div>
    </div>
  );
};
