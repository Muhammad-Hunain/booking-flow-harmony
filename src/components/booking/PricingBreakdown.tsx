
import { MapPin, Users, Calendar, User, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SelectionTag } from "./SelectionTag";

interface PriceLineProps {
  label: string;
  value: string;
  showInfoIcon?: boolean;
  className?: string;
}

const PriceLine = ({ label, value, showInfoIcon = true, className }: PriceLineProps) => (
  <div className={`flex items-center justify-between py-2 ${className || ""}`}>
    <div className="flex items-center">
      <span className="text-gray-700">{label}</span>
      {showInfoIcon && (
        <Info size={16} className="ml-2 text-gray-500 cursor-help" />
      )}
    </div>
    <span className="font-medium text-gray-800">{value}</span>
  </div>
);

export const PricingBreakdown = ({
  selections,
  onContinue,
}: {
  selections: {
    location: string;
    serviceType: string;
    dates: string;
    group: string;
  };
  onContinue: () => void;
}) => {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-center mb-4 text-black">
        PRICE BREAKDOWN
      </h2>
      
      {/* Selection Tags */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <SelectionTag 
          icon={<MapPin size={18} />} 
          label="Location" 
          value={selections.location} 
        />
        <SelectionTag 
          icon={<Users size={18} />} 
          label="Service Type" 
          value={selections.serviceType} 
        />
        <SelectionTag 
          icon={<Calendar size={18} />} 
          label="Dates" 
          value={selections.dates} 
        />
        <SelectionTag 
          icon={<User size={18} />} 
          label="Group" 
          value={selections.group} 
        />
      </div>
      
      {/* Pricing Card */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-center">OUR RATES EXPLAINED</h3>
        
        <div className="bg-gray-100/70 rounded-lg p-5 mb-5">
          <div className="space-y-1 divide-y divide-gray-200">
            <PriceLine label="Day Rate" value="£220.00 per day" />
            <PriceLine label="Travel Cost" value="£30.00 per day" />
            <PriceLine label="Accommodation" value="N/A" />
            <PriceLine label="Food Allowance" value="£30.00 per day" />
          </div>
          
          <div className="pt-4 mt-3">
            <PriceLine 
              label="Total" 
              value="£280.00 per day" 
              showInfoIcon={false}
              className="font-medium"
            />
            <PriceLine 
              label="Your booking" 
              value="7 days" 
              showInfoIcon={false}
            />
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200">
              <span className="text-lg font-bold text-gray-800">Total booking</span>
              <span className="text-xl font-bold text-gray-800">£1,960.00</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <Button 
          onClick={onContinue} 
          className="font-semibold w-full py-5 h-auto text-white bg-black hover:bg-black/90 rounded-md"
        >
          CONTINUE
        </Button>
      </div>
    </div>
  );
};
