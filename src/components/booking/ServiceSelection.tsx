
import { MapPin, Users, Calendar, User } from "lucide-react";
import { SelectionTag } from "./SelectionTag";
import { Button } from "@/components/ui/button";

export const ServiceSelection = ({
  onContinue,
}: {
  onContinue: () => void;
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-8 text-bookingText">
        Select Your Service
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      
      <div className="mt-10 flex justify-center">
        <Button 
          onClick={onContinue} 
          variant="booking"
          className="font-medium px-10 py-6 h-auto"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
