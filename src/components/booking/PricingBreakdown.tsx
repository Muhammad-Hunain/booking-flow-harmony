
import { MapPin, Users, Calendar, User, Info } from "lucide-react";
import { SelectionTag } from "./SelectionTag";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PriceLineProps {
  label: string;
  value: string;
  showInfoIcon?: boolean;
  className?: string;
}

const PriceLine = ({ label, value, showInfoIcon = true, className }: PriceLineProps) => (
  <div className={cn("flex items-center justify-between py-2", className)}>
    <div className="flex items-center">
      <span className="text-bookingText">{label}</span>
      {showInfoIcon && (
        <Info size={16} className="ml-2 text-bookingMuted" />
      )}
    </div>
    <span className="font-medium text-bookingText">{value}</span>
  </div>
);

export const PricingBreakdown = ({
  onContinue,
}: {
  onContinue: () => void;
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-8 text-bookingText">
        Pricing Breakdown
      </h2>
      
      {/* Selection Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <SelectionTag 
          icon={<MapPin size={20} />} 
          label="Location" 
          value="Leeds - City Centre" 
        />
        <SelectionTag 
          icon={<Users size={20} />} 
          label="Service Type" 
          value="Mentor/Companion" 
        />
        <SelectionTag 
          icon={<Calendar size={20} />} 
          label="Dates" 
          value="1 Dec – 7 Dec" 
        />
        <SelectionTag 
          icon={<User size={20} />} 
          label="Group" 
          value="1 Adult, 1 Child" 
        />
      </div>
      
      {/* Pricing Card */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <h3 className="text-lg font-bold mb-4 text-bookingText">Our Rates Explained</h3>
        
        <div className="space-y-1 mb-6 divide-y divide-gray-100">
          <PriceLine label="Day Rate" value="£220.00 per day" />
          <PriceLine label="Travel Cost" value="£30.00 per day" />
          <PriceLine label="Accommodation" value="N/A" />
          <PriceLine label="Food Allowance" value="£30.00 per day" />
        </div>
        
        <div className="pt-4 border-t border-gray-200">
          <PriceLine 
            label="Total Per Day" 
            value="£280.00" 
            showInfoIcon={false}
            className="font-medium"
          />
          <PriceLine 
            label="Duration" 
            value="7 days" 
            showInfoIcon={false}
          />
          <PriceLine 
            label="Total Booking Cost" 
            value="£1,960.00" 
            showInfoIcon={false}
            className="text-lg font-bold"
          />
        </div>
      </div>
      
      <div className="mt-10 flex justify-center">
        <Button 
          onClick={onContinue} 
          variant="booking"
          className="font-medium px-10 py-6 h-auto w-full max-w-md"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
