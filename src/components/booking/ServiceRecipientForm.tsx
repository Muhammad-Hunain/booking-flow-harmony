
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

interface ServiceRecipientFormProps {
  onContinue: () => void;
  onBack: () => void;
}

export const ServiceRecipientForm = ({ onContinue, onBack }: ServiceRecipientFormProps) => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "female",
    nationality: "",
    address: "",
    postcode: "",
    disability: "no",
    specialEducationalNeeds: "no",
    allergy: "no",
    allergyDetails: "",
    emailMarketing: false
  });

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex border-b border-gray-200">
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 1 ? "bg-amber-500 text-white" : "bg-gray-200 text-gray-700"
          } rounded-t-lg mr-1`}
          onClick={() => setActiveTab(1)}
        >
          SERVICE RECIPIENT 1
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 2 ? "bg-amber-500 text-white" : "bg-gray-200 text-gray-700"
          } rounded-t-lg`}
          onClick={() => setActiveTab(2)}
        >
          SERVICE RECIPIENT 2
        </button>
      </div>

      <div className="space-y-5">
        <div className="space-y-3">
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
            <Label htmlFor="dateOfBirth" className="text-xs mb-1">Date of birth <span className="text-amber-500">*</span></Label>
            <div className="flex items-center">
              <Input 
                id="dateOfBirth" 
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                className="w-full"
              />
              <span className="ml-2 text-xs text-gray-500">Years</span>
            </div>
          </div>

          <div>
            <Label className="text-xs mb-1">Gender <span className="text-amber-500">*</span></Label>
            <div className="flex space-x-4 mt-1">
              <div className="flex items-center space-x-2">
                <RadioGroup
                  value={formData.gender}
                  onValueChange={(value) => handleChange("gender", value)}
                  className="flex space-x-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male" className="text-sm">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female" className="text-sm">Female</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="nationality" className="text-xs mb-1">Nationality <span className="text-amber-500">*</span></Label>
            <Select onValueChange={(value) => handleChange("nationality", value)}>
              <SelectTrigger id="nationality" className="w-full">
                <SelectValue placeholder="Select nationality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="british">British</SelectItem>
                <SelectItem value="french">French</SelectItem>
                <SelectItem value="german">German</SelectItem>
                <SelectItem value="spanish">Spanish</SelectItem>
                <SelectItem value="italian">Italian</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="pt-3">
            <Label htmlFor="address" className="text-xs mb-1">
              Address (where the service recipient plans to stay in the UK) <span className="text-amber-500">*</span>
            </Label>
            <Input 
              id="address" 
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              className="w-full"
            />
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

          <div className="space-y-3 pt-3">
            <div>
              <Label className="text-xs">Does the service recipient have a: </Label>
              
              <div className="mt-2 space-y-3">
                <div className="flex justify-between items-center">
                  <Label htmlFor="disability" className="text-sm">
                    Disability? <span className="text-amber-500">*</span>
                  </Label>
                  <RadioGroup
                    value={formData.disability}
                    onValueChange={(value) => handleChange("disability", value)}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="disability-yes" />
                      <Label htmlFor="disability-yes" className="text-sm">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="disability-no" />
                      <Label htmlFor="disability-no" className="text-sm">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex justify-between items-center">
                  <Label htmlFor="sen" className="text-sm">
                    Special Educational Need? <span className="text-amber-500">*</span>
                  </Label>
                  <RadioGroup
                    value={formData.specialEducationalNeeds}
                    onValueChange={(value) => handleChange("specialEducationalNeeds", value)}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="sen-yes" />
                      <Label htmlFor="sen-yes" className="text-sm">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="sen-no" />
                      <Label htmlFor="sen-no" className="text-sm">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex justify-between items-center">
                  <Label htmlFor="allergy" className="text-sm">
                    Allergy? <span className="text-amber-500">*</span>
                  </Label>
                  <RadioGroup
                    value={formData.allergy}
                    onValueChange={(value) => handleChange("allergy", value)}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="allergy-yes" />
                      <Label htmlFor="allergy-yes" className="text-sm">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="allergy-no" />
                      <Label htmlFor="allergy-no" className="text-sm">No</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>

            {formData.allergy === "yes" && (
              <div>
                <Label htmlFor="allergyDetails" className="text-xs mb-1">
                  If yes, please specify:
                </Label>
                <Textarea
                  id="allergyDetails"
                  value={formData.allergyDetails}
                  onChange={(e) => handleChange("allergyDetails", e.target.value)}
                  className="w-full"
                />
              </div>
            )}
          </div>

          <div className="pt-4 space-y-2">
            <h3 className="text-sm font-semibold text-amber-500">EMAIL MARKETING</h3>
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-700 w-4/5">
                We would like to send you news and offers for our services by email. If you
                would prefer not to receive these, please ensure this box is ticked.
              </p>
              <Switch
                checked={formData.emailMarketing}
                onCheckedChange={(checked) => handleChange("emailMarketing", checked)}
              />
            </div>
          </div>
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

      <div className="text-xs text-center text-gray-500 pt-2">
        Your data is safe and secure with us.<br />
        Your personal information is confidential and secure<br />
        when you use the Learning Rebels website.
      </div>
    </div>
  );
};
