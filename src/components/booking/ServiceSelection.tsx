
import { MapPin, Users, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { cn } from "@/lib/utils";

const LocationSelector = ({ selected, onSelect }: { selected: string; onSelect: (value: string) => void }) => {
  const locations = ["Leeds - City Centre", "Manchester", "York", "Sheffield"];
  
  return (
    <div className="mb-6">
      <div className="flex items-center mb-2">
        <MapPin size={18} className="mr-2 text-bookingMuted" />
        <h3 className="font-medium text-bookingText">Location</h3>
      </div>
      <RadioGroup 
        value={selected} 
        onValueChange={onSelect} 
        className="space-y-2 mt-2 pl-2"
      >
        {locations.map(location => (
          <div key={location} className="flex items-center space-x-2">
            <RadioGroupItem value={location} id={`location-${location}`} />
            <label 
              htmlFor={`location-${location}`} 
              className={cn(
                "text-sm cursor-pointer", 
                selected === location ? "text-bookingText font-medium" : "text-bookingMuted"
              )}
            >
              {location}
            </label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

const ServiceTypeSelector = ({ selected, onSelect }: { selected: string; onSelect: (value: string) => void }) => {
  const serviceTypes = ["Mentor/Companion", "Caregiver", "Tutor", "Activity Partner"];
  
  return (
    <div className="mb-6">
      <div className="flex items-center mb-2">
        <Users size={18} className="mr-2 text-bookingMuted" />
        <h3 className="font-medium text-bookingText">Service Type</h3>
      </div>
      <RadioGroup 
        value={selected} 
        onValueChange={onSelect} 
        className="space-y-2 mt-2 pl-2"
      >
        {serviceTypes.map(service => (
          <div key={service} className="flex items-center space-x-2">
            <RadioGroupItem value={service} id={`service-${service}`} />
            <label 
              htmlFor={`service-${service}`} 
              className={cn(
                "text-sm cursor-pointer", 
                selected === service ? "text-bookingText font-medium" : "text-bookingMuted"
              )}
            >
              {service}
            </label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

const DateSelector = ({ selected, onSelect }: { selected: string; onSelect: (value: string) => void }) => {
  const dateOptions = ["1 Dec – 7 Dec", "8 Dec – 14 Dec", "15 Dec – 21 Dec", "22 Dec – 28 Dec"];
  
  return (
    <div className="mb-6">
      <div className="flex items-center mb-2">
        <Calendar size={18} className="mr-2 text-bookingMuted" />
        <h3 className="font-medium text-bookingText">Dates</h3>
      </div>
      <RadioGroup 
        value={selected} 
        onValueChange={onSelect} 
        className="space-y-2 mt-2 pl-2"
      >
        {dateOptions.map(date => (
          <div key={date} className="flex items-center space-x-2">
            <RadioGroupItem value={date} id={`date-${date}`} />
            <label 
              htmlFor={`date-${date}`} 
              className={cn(
                "text-sm cursor-pointer", 
                selected === date ? "text-bookingText font-medium" : "text-bookingMuted"
              )}
            >
              {date}
            </label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

const GroupSelector = ({ selected, onSelect }: { selected: string; onSelect: (value: string) => void }) => {
  const groupOptions = ["1 Adult", "1 Adult, 1 Child", "2 Adults", "2 Adults, 1 Child", "2 Adults, 2 Children"];
  
  return (
    <div className="mb-6">
      <div className="flex items-center mb-2">
        <User size={18} className="mr-2 text-bookingMuted" />
        <h3 className="font-medium text-bookingText">Group</h3>
      </div>
      <RadioGroup 
        value={selected} 
        onValueChange={onSelect} 
        className="space-y-2 mt-2 pl-2"
      >
        {groupOptions.map(group => (
          <div key={group} className="flex items-center space-x-2">
            <RadioGroupItem value={group} id={`group-${group}`} />
            <label 
              htmlFor={`group-${group}`} 
              className={cn(
                "text-sm cursor-pointer", 
                selected === group ? "text-bookingText font-medium" : "text-bookingMuted"
              )}
            >
              {group}
            </label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export const ServiceSelection = ({
  onContinue,
}: {
  onContinue: () => void;
}) => {
  const [location, setLocation] = useState("Leeds - City Centre");
  const [serviceType, setServiceType] = useState("Mentor/Companion");
  const [dates, setDates] = useState("1 Dec – 7 Dec");
  const [group, setGroup] = useState("1 Adult, 1 Child");
  
  return (
    <div className="w-full">
      <h2 className="text-xl font-bold text-center mb-6 text-bookingText">
        Select Your Service
      </h2>
      
      <LocationSelector selected={location} onSelect={setLocation} />
      <ServiceTypeSelector selected={serviceType} onSelect={setServiceType} />
      <DateSelector selected={dates} onSelect={setDates} />
      <GroupSelector selected={group} onSelect={setGroup} />
      
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
