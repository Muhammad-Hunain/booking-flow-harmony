
import { MapPin, Users, Calendar, User, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

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
        <Info size={16} className="ml-2 text-bookingMuted cursor-help" />
      )}
    </div>
    <span className="font-medium text-bookingText">{value}</span>
  </div>
);

const ServiceSummary = ({
  title,
  icon,
  value,
}: {
  title: string;
  icon: React.ReactNode;
  value: string;
}) => {
  return (
    <div className="flex items-center border-b border-gray-100 py-3">
      <div className="flex-shrink-0 text-bookingText opacity-70 mr-3">
        {icon}
      </div>
      <div className="flex flex-col">
        <p className="text-xs text-bookingMuted">{title}</p>
        <p className="font-medium text-bookingText">{value}</p>
      </div>
    </div>
  );
};

export const PricingBreakdown = ({
  onContinue,
}: {
  onContinue: () => void;
}) => {
  return (
    <div className="w-full">
      <h2 className="text-xl font-bold text-center mb-6 text-bookingText">
        Pricing Breakdown
      </h2>
      
      {/* Selection Summary */}
      <div className="mb-6">
        <ServiceSummary 
          title="Location" 
          icon={<MapPin size={20} />} 
          value="Leeds - City Centre" 
        />
        <ServiceSummary 
          title="Service Type" 
          icon={<Users size={20} />} 
          value="Mentor/Companion" 
        />
        <ServiceSummary 
          title="Dates" 
          icon={<Calendar size={20} />} 
          value="1 Dec – 7 Dec" 
        />
        <ServiceSummary 
          title="Group" 
          icon={<User size={20} />} 
          value="1 Adult, 1 Child" 
        />
      </div>
      
      {/* Pricing Card */}
      <div className="bg-white rounded-lg p-5 border border-gray-100">
        <h3 className="text-lg font-bold mb-4 text-bookingText">Our Rates Explained</h3>
        
        <div className="space-y-1 mb-5 divide-y divide-gray-100">
          <PriceLine label="Day Rate" value="£220.00 per day" />
          <PriceLine label="Travel Cost" value="£30.00 per day" />
          <PriceLine label="Accommodation" value="N/A" />
          <PriceLine label="Food Allowance" value="£30.00 per day" />
        </div>
        
        <div className="pt-3 border-t border-gray-200">
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
      
      <div className="mt-6">
        <Button 
          onClick={onContinue} 
          variant="booking"
          className="font-medium w-full py-5 h-auto"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
