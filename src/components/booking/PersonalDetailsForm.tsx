
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { SelectionTag } from "./SelectionTag";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Calendar, Users, Lock, ChevronDown } from "lucide-react";

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
  const [activeTab, setActiveTab] = useState<string>("personal");
  const [activeRecipient, setActiveRecipient] = useState<number>(1);
  const [formData, setFormData] = useState({
    personal: {
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
    },
    recipients: [
      {
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
        dietaryRequirements: "no",
        allergyDetails: "",
        emailMarketing: false
      },
      {
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
        dietaryRequirements: "no",
        allergyDetails: "",
        emailMarketing: false
      }
    ]
  });

  const handlePersonalChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        [field]: value
      }
    }));
  };

  const handleRecipientChange = (recipientIndex: number, field: string, value: string | boolean) => {
    setFormData((prev) => {
      const updatedRecipients = [...prev.recipients];
      updatedRecipients[recipientIndex] = {
        ...updatedRecipients[recipientIndex],
        [field]: value
      };
      
      return {
        ...prev,
        recipients: updatedRecipients
      };
    });
  };

  const renderPersonalDetails = () => (
    <div className="space-y-5">
      <h3 className="text-sm font-semibold text-amber-500">YOUR DETAILS</h3>
      
      <div className="space-y-3">
        <div className="grid grid-cols-1 gap-3">
          <div>
            <Label htmlFor="title" className="text-xs mb-1">Title <span className="text-amber-500">*</span></Label>
            <Select onValueChange={(value) => handlePersonalChange("title", value)}>
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
              value={formData.personal.firstName}
              onChange={(e) => handlePersonalChange("firstName", e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <Label htmlFor="lastName" className="text-xs mb-1">Last name <span className="text-amber-500">*</span></Label>
            <Input 
              id="lastName" 
              value={formData.personal.lastName}
              onChange={(e) => handlePersonalChange("lastName", e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-xs mb-1">Email <span className="text-amber-500">*</span></Label>
            <Input 
              id="email" 
              type="email"
              value={formData.personal.email}
              onChange={(e) => handlePersonalChange("email", e.target.value)}
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
                value={formData.personal.mobile}
                onChange={(e) => handlePersonalChange("mobile", e.target.value)}
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
                value={formData.personal.landline}
                onChange={(e) => handlePersonalChange("landline", e.target.value)}
                className="rounded-l-none w-full"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="occupation" className="text-xs mb-1">Occupation <span className="text-amber-500">*</span></Label>
            <Input 
              id="occupation" 
              value={formData.personal.occupation}
              onChange={(e) => handlePersonalChange("occupation", e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <Label htmlFor="relationship" className="text-xs mb-1">Relationship to service recipient <span className="text-amber-500">*</span></Label>
            <Input 
              id="relationship" 
              value={formData.personal.relationship}
              onChange={(e) => handlePersonalChange("relationship", e.target.value)}
              className="w-full"
            />
          </div>
        </div>
      </div>

      <h3 className="text-sm font-semibold text-amber-500">YOUR ADDRESS</h3>
      
      <div className="space-y-3">
        <div>
          <Label htmlFor="country" className="text-xs mb-1">Country</Label>
          <Select onValueChange={(value) => handlePersonalChange("country", value)} defaultValue="United Kingdom">
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
              value={formData.personal.postcode}
              onChange={(e) => handlePersonalChange("postcode", e.target.value)}
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
  );

  const renderServiceRecipientDetails = () => (
    <div className="space-y-5">
      <div className="flex border-b border-gray-200">
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeRecipient === 1 ? "bg-amber-500 text-white" : "bg-gray-200 text-gray-700"
          } rounded-t-lg mr-1`}
          onClick={() => setActiveRecipient(1)}
        >
          SERVICE RECIPIENT 1
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeRecipient === 2 ? "bg-amber-500 text-white" : "bg-gray-200 text-gray-700"
          } rounded-t-lg`}
          onClick={() => setActiveRecipient(2)}
        >
          SERVICE RECIPIENT 2
        </button>
      </div>

      <div className="space-y-3">
        <div>
          <Label htmlFor="recipientFirstName" className="text-xs mb-1">First name <span className="text-amber-500">*</span></Label>
          <Input 
            id="recipientFirstName" 
            value={formData.recipients[activeRecipient-1].firstName}
            onChange={(e) => handleRecipientChange(activeRecipient-1, "firstName", e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <Label htmlFor="recipientLastName" className="text-xs mb-1">Last name <span className="text-amber-500">*</span></Label>
          <Input 
            id="recipientLastName" 
            value={formData.recipients[activeRecipient-1].lastName}
            onChange={(e) => handleRecipientChange(activeRecipient-1, "lastName", e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <Label htmlFor="dateOfBirth" className="text-xs mb-1">Date of birth <span className="text-amber-500">*</span></Label>
          <div className="flex items-center">
            <Input 
              id="dateOfBirth" 
              type="date"
              value={formData.recipients[activeRecipient-1].dateOfBirth}
              onChange={(e) => handleRecipientChange(activeRecipient-1, "dateOfBirth", e.target.value)}
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
                value={formData.recipients[activeRecipient-1].gender}
                onValueChange={(value) => handleRecipientChange(activeRecipient-1, "gender", value)}
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
          <Select 
            value={formData.recipients[activeRecipient-1].nationality}
            onValueChange={(value) => handleRecipientChange(activeRecipient-1, "nationality", value)}
          >
            <SelectTrigger id="nationality" className="w-full">
              <SelectValue placeholder="Select nationality" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="british">
                <div className="flex items-center">
                  <span className="mr-2">🇬🇧</span> British
                </div>
              </SelectItem>
              <SelectItem value="french">
                <div className="flex items-center">
                  <span className="mr-2">🇫🇷</span> French
                </div>
              </SelectItem>
              <SelectItem value="german">
                <div className="flex items-center">
                  <span className="mr-2">🇩🇪</span> German
                </div>
              </SelectItem>
              <SelectItem value="spanish">
                <div className="flex items-center">
                  <span className="mr-2">🇪🇸</span> Spanish
                </div>
              </SelectItem>
              <SelectItem value="italian">
                <div className="flex items-center">
                  <span className="mr-2">🇮🇹</span> Italian
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="pt-3">
          <Label htmlFor="address" className="text-xs mb-1">
            Address (where the service recipient plans to stay in the UK) <span className="text-amber-500">*</span>
          </Label>
          <Input 
            id="address" 
            value={formData.recipients[activeRecipient-1].address}
            onChange={(e) => handleRecipientChange(activeRecipient-1, "address", e.target.value)}
            className="w-full"
          />
        </div>

        <div className="flex">
          <div className="grow mr-2">
            <Label htmlFor="recipientPostcode" className="text-xs mb-1">Postcode <span className="text-amber-500">*</span></Label>
            <Input 
              id="recipientPostcode" 
              value={formData.recipients[activeRecipient-1].postcode}
              onChange={(e) => handleRecipientChange(activeRecipient-1, "postcode", e.target.value)}
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
                  value={formData.recipients[activeRecipient-1].disability}
                  onValueChange={(value) => handleRecipientChange(activeRecipient-1, "disability", value)}
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
                  value={formData.recipients[activeRecipient-1].specialEducationalNeeds}
                  onValueChange={(value) => handleRecipientChange(activeRecipient-1, "specialEducationalNeeds", value)}
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
                  value={formData.recipients[activeRecipient-1].allergy}
                  onValueChange={(value) => handleRecipientChange(activeRecipient-1, "allergy", value)}
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

              <div className="flex justify-between items-center">
                <Label htmlFor="dietary" className="text-sm">
                  Dietary Requirement? <span className="text-amber-500">*</span>
                </Label>
                <RadioGroup
                  value={formData.recipients[activeRecipient-1].dietaryRequirements}
                  onValueChange={(value) => handleRecipientChange(activeRecipient-1, "dietaryRequirements", value)}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="dietary-yes" />
                    <Label htmlFor="dietary-yes" className="text-sm">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="dietary-no" />
                    <Label htmlFor="dietary-no" className="text-sm">No</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>

          {formData.recipients[activeRecipient-1].allergy === "yes" && (
            <div>
              <Label htmlFor="allergyDetails" className="text-xs mb-1">
                If yes, please specify:
              </Label>
              <Textarea
                id="allergyDetails"
                value={formData.recipients[activeRecipient-1].allergyDetails}
                onChange={(e) => handleRecipientChange(activeRecipient-1, "allergyDetails", e.target.value)}
                className="w-full max-h-24"
                maxLength={100}
              />
              <p className="text-xs text-right text-gray-500 mt-1">Max 100 words</p>
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
              checked={formData.recipients[activeRecipient-1].emailMarketing}
              onCheckedChange={(checked) => handleRecipientChange(activeRecipient-1, "emailMarketing", checked)}
            />
          </div>
        </div>
      </div>
    </div>
  );

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

      <div className="flex border-b border-gray-200">
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === "personal" ? "border-b-2 border-amber-500 text-amber-500" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("personal")}
        >
          YOUR DETAILS
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === "recipient" ? "border-b-2 border-amber-500 text-amber-500" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("recipient")}
        >
          SERVICE RECIPIENT
        </button>
      </div>

      {activeTab === "personal" ? renderPersonalDetails() : renderServiceRecipientDetails()}

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
