
import { MapPin, Users, Calendar, User, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";

export const ServiceSelection = ({
  onContinue,
}: {
  onContinue: (data: any) => void;
}) => {
  const [location, setLocation] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(1);
  const [showRecipientOptions, setShowRecipientOptions] = useState(false);
  
  const locations = [
    "London - Belgravia",
    "London - Chelsea",
    "London - Kensington",
    "London - Knightsbridge",
    "London - Mayfair",
    "London - Central",
    "Manchester - Altrincham",
    "Manchester - Bowdon",
    "Manchester - Hale",
    "Manchester - City Centre",
    "Leeds - Alwoodley",
    "Leeds - Roundhay",
    "Leeds - Wetherby",
    "Leeds - City Centre"
  ];
  
  const serviceTypes = [
    "Transition Specialist (Fast Track Program)",
    "Transition Specialist (Intense Program)",
    "Mentor/Companion",
    "Governess"
  ];
  
  const incrementAdults = () => {
    if (adults + children < 2) {
      setAdults(adults + 1);
    }
  };
  
  const decrementAdults = () => {
    if (adults > 0) {
      setAdults(adults - 1);
    }
  };
  
  const incrementChildren = () => {
    if (adults + children < 2) {
      setChildren(children + 1);
    }
  };
  
  const decrementChildren = () => {
    if (children > 0) {
      setChildren(children - 1);
    }
  };

  // Format service recipient display
  const getServiceRecipientDisplay = () => {
    const parts = [];
    if (adults > 0) {
      parts.push(`${adults} Adult${adults !== 1 ? 's' : ''}`);
    }
    if (children > 0) {
      parts.push(`${children} Child${children !== 1 ? 'ren' : ''}`);
    }
    return parts.join(', ');
  };

  // Format date range display
  const getDateRangeDisplay = () => {
    if (dateRange?.from && dateRange?.to) {
      return `${format(dateRange.from, "d MMM")} – ${format(dateRange.to, "d MMM")}`;
    }
    return "";
  };
  
  const toggleRecipientOptions = () => {
    setShowRecipientOptions(!showRecipientOptions);
  };

  const handleContinue = () => {
    onContinue({
      location,
      serviceType,
      dateRange,
      adults,
      children
    });
  };
  
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-center mb-4 text-black uppercase">
        BOOK A SERVICE
      </h2>
      
      <div className="h-2 bg-yellow-300 rounded-full mb-6"></div>
      
      <div className="bg-blue-50/50 rounded-lg p-4 mb-8 text-sm text-center">
        With 10+ Learning Hubb locations providing an unrivalled service across the UK, 
        there's an experienced professional waiting wherever you need to be.
      </div>
      
      <div className="space-y-4 mb-8">
        {/* Location Selection */}
        <div className="border border-amber-300 rounded-lg overflow-hidden">
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger className="bg-white border-none h-12 px-4 flex">
              <div className="flex items-center">
                <MapPin size={20} className="mr-3 text-gray-700" />
                <SelectValue placeholder="Choose a location" />
              </div>
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              <div className="py-2 px-4 font-semibold text-sm bg-gray-100">London</div>
              {locations.filter(loc => loc.startsWith("London")).map((loc) => (
                <SelectItem key={loc} value={loc} className="pl-6">
                  {loc.replace("London - ", "")}
                </SelectItem>
              ))}
              
              <div className="py-2 px-4 font-semibold text-sm bg-gray-100 mt-1">Manchester</div>
              {locations.filter(loc => loc.startsWith("Manchester")).map((loc) => (
                <SelectItem key={loc} value={loc} className="pl-6">
                  {loc.replace("Manchester - ", "")}
                </SelectItem>
              ))}
              
              <div className="py-2 px-4 font-semibold text-sm bg-gray-100 mt-1">Leeds</div>
              {locations.filter(loc => loc.startsWith("Leeds")).map((loc) => (
                <SelectItem key={loc} value={loc} className="pl-6">
                  {loc.replace("Leeds - ", "")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Service Type Selection */}
        <div className="border border-amber-300 rounded-lg overflow-hidden">
          <Select value={serviceType} onValueChange={setServiceType}>
            <SelectTrigger className="bg-white border-none h-12 px-4 flex">
              <div className="flex items-center">
                <Users size={20} className="mr-3 text-gray-700" />
                <SelectValue placeholder="Choose a service" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-white">
              {serviceTypes.map((service) => (
                <SelectItem key={service} value={service} className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-amber-300 mr-1"></div> {/* Service icon */}
                  {service}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {/* Date Range Picker */}
          <div className="border border-amber-300 rounded-lg overflow-hidden">
            <Popover>
              <PopoverTrigger asChild>
                <div className="bg-white h-12 px-4 flex items-center cursor-pointer">
                  <Calendar size={20} className="mr-3 text-gray-700" />
                  <span className={`${getDateRangeDisplay() ? "" : "text-gray-400"}`}>
                    {getDateRangeDisplay() || "Select dates"}
                  </span>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="range"
                  defaultMonth={new Date()}
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
          
          {/* Service Recipient */}
          <div className="border border-amber-300 rounded-lg overflow-hidden">
            <div 
              className="bg-white h-12 px-4 flex items-center cursor-pointer"
              onClick={toggleRecipientOptions}
            >
              <User size={20} className="mr-3 text-gray-700" />
              <span className={`${getServiceRecipientDisplay() ? "" : "text-gray-400"}`}>
                {getServiceRecipientDisplay() || "Service recipient"}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Service Recipients counter */}
      {showRecipientOptions && (
        <div className="bg-gray-50 p-5 rounded-lg mb-8">
          <div className="text-center mb-4">
            <span className="inline-block px-3 py-1 bg-amber-100 rounded-full text-xs text-amber-800">
              Max 2 per booking
            </span>
          </div>
          
          <div className="space-y-4">
            {/* Adults counter */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-amber-300 rounded-full flex items-center justify-center">
                  <User size={14} className="text-white" />
                </div>
                <span className="text-sm font-medium">Adults <span className="text-xs text-gray-500">(18+ years)</span></span>
              </div>
              
              <div className="flex items-center gap-3">
                <button 
                  onClick={decrementAdults}
                  className="w-7 h-7 rounded-full bg-amber-300 flex items-center justify-center"
                  disabled={adults === 0}
                >
                  <Minus size={16} className="text-white" />
                </button>
                
                <span className="font-medium w-4 text-center">{adults}</span>
                
                <button 
                  onClick={incrementAdults}
                  className="w-7 h-7 rounded-full bg-amber-300 flex items-center justify-center"
                  disabled={adults + children >= 2}
                >
                  <Plus size={16} className="text-white" />
                </button>
              </div>
            </div>
            
            {/* Children counter */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-amber-300 rounded-full flex items-center justify-center">
                  <User size={14} className="text-white" />
                </div>
                <span className="text-sm font-medium">Children <span className="text-xs text-gray-500">(7-17 years)</span></span>
              </div>
              
              <div className="flex items-center gap-3">
                <button 
                  onClick={decrementChildren}
                  className="w-7 h-7 rounded-full bg-amber-300 flex items-center justify-center"
                  disabled={children === 0}
                >
                  <Minus size={16} className="text-white" />
                </button>
                
                <span className="font-medium w-4 text-center">{children}</span>
                
                <button 
                  onClick={incrementChildren}
                  className="w-7 h-7 rounded-full bg-amber-300 flex items-center justify-center"
                  disabled={adults + children >= 2}
                >
                  <Plus size={16} className="text-white" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-5">
            <Button
              variant="default"
              className="w-full bg-black text-white py-3 h-auto rounded-md hover:bg-black/90"
              onClick={() => setShowRecipientOptions(false)}
            >
              DONE
            </Button>
          </div>
        </div>
      )}
      
      {/* Book Now Button */}
      <Button 
        onClick={handleContinue} 
        className="font-semibold w-full py-5 h-auto text-white bg-black hover:bg-black/90 rounded-md"
        disabled={!location || !serviceType || !dateRange?.from || !dateRange?.to || (adults === 0 && children === 0)}
      >
        BOOK NOW
      </Button>
    </div>
  );
};
