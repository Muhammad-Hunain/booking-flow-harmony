
import { MapPin, Users, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
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
  const [location, setLocation] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [dates, setDates] = useState("");
  const [group, setGroup] = useState("");
  
  const locations = ["Leeds - City Centre", "Manchester", "York", "Sheffield"];
  const serviceTypes = ["Mentor/Companion", "Caregiver", "Tutor", "Activity Partner"];
  const dateOptions = ["1 Dec – 7 Dec", "8 Dec – 14 Dec", "15 Dec – 21 Dec", "22 Dec – 28 Dec"];
  const groupOptions = ["1 Adult", "1 Adult, 1 Child", "2 Adults", "2 Adults, 1 Child", "2 Adults, 2 Children"];
  
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-center mb-4 text-black">
        BOOK A SERVICE
      </h2>
      
      <div className="h-2 bg-amber-300 rounded-full mb-6"></div>
      
      <div className="bg-blue-50/50 rounded-lg p-4 mb-8 text-sm text-center">
        With 10+ Learning Hubb locations providing an unrivalled service across the UK, 
        there's an experienced professional waiting wherever you need to be.
      </div>
      
      <div className="space-y-4">
        {/* Location Selection */}
        <div className="border border-amber-300 rounded-lg overflow-hidden">
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger className="bg-gray-100/80 border-none h-12 px-4 flex">
              <div className="flex items-center">
                <MapPin size={20} className="mr-3 text-gray-700" />
                <SelectValue placeholder="Choose a location" />
              </div>
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
        
        {/* Service Type Selection */}
        <div className="border border-amber-300 rounded-lg overflow-hidden">
          <Select value={serviceType} onValueChange={setServiceType}>
            <SelectTrigger className="bg-gray-100/80 border-none h-12 px-4 flex">
              <div className="flex items-center">
                <Users size={20} className="mr-3 text-gray-700" />
                <SelectValue placeholder="Choose a service" />
              </div>
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
        
        <div className="grid grid-cols-2 gap-4">
          {/* Date Selection */}
          <div className="border border-amber-300 rounded-lg overflow-hidden">
            <Select value={dates} onValueChange={setDates}>
              <SelectTrigger className="bg-gray-100/80 border-none h-12 px-4 flex">
                <div className="flex items-center">
                  <Calendar size={20} className="mr-3 text-gray-700" />
                  <SelectValue placeholder="Date" />
                </div>
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
          
          {/* Group Selection */}
          <div className="border border-amber-300 rounded-lg overflow-hidden">
            <Select value={group} onValueChange={setGroup}>
              <SelectTrigger className="bg-gray-100/80 border-none h-12 px-4 flex">
                <div className="flex items-center">
                  <User size={20} className="mr-3 text-gray-700" />
                  <SelectValue placeholder="Service recipient" />
                </div>
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
      </div>
      
      <div className="mt-8">
        <Button 
          onClick={onContinue} 
          className="font-semibold w-full py-5 h-auto text-white bg-black hover:bg-black/90 rounded-md"
          disabled={!location || !serviceType || !dates || !group}
        >
          BOOK NOW
        </Button>
      </div>
    </div>
  );
};
