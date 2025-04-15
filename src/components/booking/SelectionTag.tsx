
import { ReactNode } from "react";

interface SelectionTagProps {
  icon: ReactNode;
  label: string;
  value: string;
  className?: string;
}

export const SelectionTag = ({ icon, label, value, className }: SelectionTagProps) => {
  return (
    <div 
      className={`flex items-center gap-2 px-3 py-2 bg-gray-100/70 rounded-lg border border-amber-200 ${className || ""}`}
    >
      <div className="flex-shrink-0 text-gray-600">
        {icon}
      </div>
      <div className="flex flex-col overflow-hidden">
        <p className="text-[10px] text-gray-500 truncate">{label}</p>
        <p className="text-xs font-medium text-gray-800 truncate">{value}</p>
      </div>
    </div>
  );
};
