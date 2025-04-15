
import { MapPin, Users, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const ServiceSelection = ({
  onContinue,
}: {
  onContinue: () => void;
}) => {
  const [location, setLocation] = useState("Leeds - City Centre");
  const [serviceType, setServiceType] = useState("Mentor/Companion");
  const [dates, setDates] = useState("1 Dec – 7 Dec");
  const [group, setGroup] = useState("1 Adult, 1 Child");
  
  const locations = ["Leeds - City Centre", "Manchester", "York", "Sheffield"];
  const serviceTypes = ["Mentor/Companion", "Caregiver", "Tutor", "Activity Partner"];
  const dateOptions = ["1 Dec – 7 Dec", "8 Dec – 14 Dec", "15 Dec – 21 Dec", "22 Dec – 28 Dec"];
  const groupOptions = ["1 Adult", "1 Adult, 1 Child", "2 Adults", "2 Adults, 1 Child", "2 Adults, 2 Children"];
  
  return (
    <div className="w-full">
      <h2 className="text-xl font-bold text-center mb-6 text-bookingText">
        Select Your Service
      </h2>
      
      <div className="space-y-6">
        {/* Location Dropdown */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center mb-1">
            <MapPin size={18} className="mr-2 text-bookingMuted" />
            <label htmlFor="location" className="font-medium text-bookingText">Location</label>
          </div>
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {locations.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Service Type Dropdown */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center mb-1">
            <Users size={18} className="mr-2 text-bookingMuted" />
            <label htmlFor="service" className="font-medium text-bookingText">Service Type</label>
          </div>
          <Select value={serviceType} onValueChange={setServiceType}>
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Select service type" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {serviceTypes.map((service) => (
                <SelectItem key={service} value={service}>
                  {service}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Dates Dropdown */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center mb-1">
            <Calendar size={18} className="mr-2 text-bookingMuted" />
            <label htmlFor="dates" className="font-medium text-bookingText">Dates</label>
          </div>
          <Select value={dates} onValueChange={setDates}>
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Select dates" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {dateOptions.map((date) => (
                <SelectItem key={date} value={date}>
                  {date}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Group Dropdown */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center mb-1">
            <User size={18} className="mr-2 text-bookingMuted" />
            <label htmlFor="group" className="font-medium text-bookingText">Group</label>
          </div>
          <Select value={group} onValueChange={setGroup}>
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Select group" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {groupOptions.map((groupOpt) => (
                <SelectItem key={groupOpt} value={groupOpt}>
                  {groupOpt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="mt-8">
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
