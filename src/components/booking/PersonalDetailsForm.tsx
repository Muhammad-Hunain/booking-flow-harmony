
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { SelectionTag } from "./SelectionTag";
import { MapPin, Calendar, Users, LucideIcon, Lock } from "lucide-react";

interface PersonalDetailsFormProps {
  selections: {
    location: string;
    serviceType: string;
    dates: string;
    group: string;
  };
  onContinue: () => void;
  onBack: () => void;
}

export const PersonalDetailsForm = ({ selections, onContinue, onBack }: PersonalDetailsFormProps) => {
  const [formData, setFormData] = useState({
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    landline: "",
    occupation: "",
    relationship: "",
    country: "United Kingdom",
    postcode: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Personal Details</h2>
        <div className="flex items-center space-x-1">
          <Lock className="h-4 w-4 text-gray-500" />
          <span className="text-xs text-gray-500">Secure Form</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectionTag icon={<MapPin className="h-4 w-4" />} label="Location" value={selections.location} />
        <SelectionTag icon={<Calendar className="h-4 w-4" />} label="Dates" value={selections.dates} />
        <SelectionTag icon={<Users className="h-4 w-4" />} label="Service Type" value={selections.serviceType} />
        <SelectionTag icon={<Users className="h-4 w-4" />} label="Group" value={selections.group} />
      </div>

      <div className="bg-slate-100 p-3 rounded-md flex items-center gap-2 border border-amber-200/50">
        <Lock className="h-4 w-4 text-gray-600" />
        <p className="text-xs text-gray-700">
          We need to collect and keep some mandatory information only in order to process your booking.
        </p>
      </div>

      <div className="space-y-5">
        <h3 className="text-sm font-semibold text-amber-500">YOUR DETAILS</h3>
        
        <div className="space-y-3">
          <div className="grid grid-cols-1 gap-3">
            <div>
              <Label htmlFor="title" className="text-xs mb-1">Title <span className="text-amber-500">*</span></Label>
              <Select onValueChange={(value) => handleChange("title", value)}>
                <SelectTrigger id="title" className="w-full">
                  <SelectValue placeholder="Select title" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mr">Mr</SelectItem>
                  <SelectItem value="mrs">Mrs</SelectItem>
                  <SelectItem value="miss">Miss</SelectItem>
                  <SelectItem value="ms">Ms</SelectItem>
                  <SelectItem value="dr">Dr</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="firstName" className="text-xs mb-1">First name <span className="text-amber-500">*</span></Label>
              <Input 
                id="firstName" 
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <Label htmlFor="lastName" className="text-xs mb-1">Last name <span className="text-amber-500">*</span></Label>
              <Input 
                id="lastName" 
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-xs mb-1">Email <span className="text-amber-500">*</span></Label>
              <Input 
                id="email" 
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <Label htmlFor="mobile" className="text-xs mb-1">Mobile <span className="text-amber-500">*</span></Label>
              <div className="flex">
                <div className="flex items-center border border-input bg-background px-3 rounded-l-md">
                  <span className="text-xs">🇬🇧 +44</span>
                </div>
                <Input 
                  id="mobile" 
                  value={formData.mobile}
                  onChange={(e) => handleChange("mobile", e.target.value)}
                  className="rounded-l-none w-full"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="landline" className="text-xs mb-1">Landline <span className="text-amber-500">*</span></Label>
              <div className="flex">
                <div className="flex items-center border border-input bg-background px-3 rounded-l-md">
                  <span className="text-xs">🇬🇧 +44</span>
                </div>
                <Input 
                  id="landline" 
                  value={formData.landline}
                  onChange={(e) => handleChange("landline", e.target.value)}
                  className="rounded-l-none w-full"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="occupation" className="text-xs mb-1">Occupation <span className="text-amber-500">*</span></Label>
              <Input 
                id="occupation" 
                value={formData.occupation}
                onChange={(e) => handleChange("occupation", e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <Label htmlFor="relationship" className="text-xs mb-1">Relationship to service recipient <span className="text-amber-500">*</span></Label>
              <Input 
                id="relationship" 
                value={formData.relationship}
                onChange={(e) => handleChange("relationship", e.target.value)}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <h3 className="text-sm font-semibold text-amber-500">YOUR ADDRESS</h3>
        
        <div className="space-y-3">
          <div>
            <Label htmlFor="country" className="text-xs mb-1">Country</Label>
            <Select onValueChange={(value) => handleChange("country", value)} defaultValue="United Kingdom">
              <SelectTrigger id="country" className="w-full">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="United Kingdom">🇬🇧 United Kingdom</SelectItem>
                <SelectItem value="France">🇫🇷 France</SelectItem>
                <SelectItem value="Germany">🇩🇪 Germany</SelectItem>
                <SelectItem value="Spain">🇪🇸 Spain</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex">
            <div className="grow mr-2">
              <Label htmlFor="postcode" className="text-xs mb-1">Postcode <span className="text-amber-500">*</span></Label>
              <Input 
                id="postcode" 
                value={formData.postcode}
                onChange={(e) => handleChange("postcode", e.target.value)}
                className="w-full"
              />
            </div>
            <Button variant="default" className="mt-6 bg-amber-500 hover:bg-amber-600">
              Find Address
            </Button>
          </div>
          
          <p className="text-xs text-gray-500 italic">Enter address manually</p>
        </div>

        <div className="flex items-center space-x-2 pt-2">
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-100 text-amber-600 text-xs">i</span>
          <p className="text-xs text-gray-600">We will send you a booking confirmation email</p>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button variant="booking" onClick={onContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
};
