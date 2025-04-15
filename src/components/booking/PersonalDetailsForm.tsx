
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Info, Lock } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";

// Define form validation schema
const formSchema = z.object({
  // First recipient (self)
  title: z.string().min(1, { message: "Title is required." }),
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  mobile: z.string().min(5, { message: "Mobile number is required." }),
  landline: z.string().optional(),
  occupation: z.string().optional(),
  relationshipToRecipient: z.string().optional(),
  country: z.string().default("United Kingdom"),
  postcode: z.string().min(1, { message: "Postcode is required." }),
  addressLine1: z.string().optional(),
  addressLine2: z.string().optional(),
  addressLine3: z.string().optional(),
  
  // Service recipient 2 fields
  recipientTitle: z.string().optional(),
  recipientFirstName: z.string().optional(),
  recipientLastName: z.string().optional(),
  recipientEmail: z.string().email({ message: "Please enter a valid email address." }).optional(),
  recipientMobile: z.string().optional(),
  recipientLandline: z.string().optional(),
  recipientDateOfBirth: z.string().optional(),
  recipientGender: z.enum(["Male", "Female"]).optional(),
  recipientNationality: z.string().optional(),
  recipientAddress: z.string().optional(),
  recipientPostcode: z.string().optional(),
  recipientAddressLine1: z.string().optional(),
  recipientAddressLine2: z.string().optional(),
  recipientAddressLine3: z.string().optional(),
  
  // Special requirements fields
  hasDisability: z.enum(["Yes", "No"]).optional(),
  hasSpecialEducationalNeed: z.enum(["Yes", "No"]).optional(),
  hasAllergy: z.enum(["Yes", "No"]).optional(),
  allergyDetails: z.string().optional(),
  hasDietaryRequirement: z.enum(["Yes", "No"]).optional(),
  
  // Marketing consent
  marketingConsent: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

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

export const PersonalDetailsForm = ({
  selections,
  onContinue,
  onBack,
}: PersonalDetailsFormProps) => {
  const [showAddressFields, setShowAddressFields] = useState(false);
  const [showRecipientAddressFields, setShowRecipientAddressFields] = useState(false);
  const [activeRecipient, setActiveRecipient] = useState<"self" | "other">("self");

  // Define form with validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      landline: "",
      occupation: "",
      relationshipToRecipient: "",
      country: "United Kingdom",
      postcode: "",
      addressLine1: "",
      addressLine2: "",
      addressLine3: "",
      
      // Service recipient fields
      recipientTitle: "",
      recipientFirstName: "",
      recipientLastName: "",
      recipientEmail: "",
      recipientMobile: "",
      recipientLandline: "",
      recipientDateOfBirth: "",
      recipientGender: "Female",
      recipientNationality: "",
      recipientAddress: "",
      recipientPostcode: "",
      recipientAddressLine1: "",
      recipientAddressLine2: "",
      recipientAddressLine3: "",
      
      // Special requirements fields
      hasDisability: "No",
      hasSpecialEducationalNeed: "No",
      hasAllergy: "No",
      allergyDetails: "",
      hasDietaryRequirement: "No",
      
      // Marketing consent
      marketingConsent: false,
    },
  });

  // Handle form submission
  const onSubmit = (data: FormValues) => {
    console.log(data);
    toast.success("Personal details saved!");
    onContinue();
  };

  const toggleAddressFields = () => {
    setShowAddressFields(!showAddressFields);
  };
  
  const toggleRecipientAddressFields = () => {
    setShowRecipientAddressFields(!showRecipientAddressFields);
  };

  const countries = [
    { code: "GB", name: "United Kingdom" },
    { code: "US", name: "United States" },
    { code: "CA", name: "Canada" },
    { code: "AU", name: "Australia" },
    { code: "FR", name: "France" },
    { code: "DE", name: "Germany" },
    { code: "IT", name: "Italy" },
    { code: "ES", name: "Spain" },
    { code: "JP", name: "Japan" },
    { code: "CN", name: "China" },
    { code: "IN", name: "India" },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Security note */}
      <div className="bg-gray-100 p-4 mb-8 rounded-md flex items-center gap-3">
        <Lock className="text-gray-700" size={20} />
        <p className="text-sm text-gray-700">
          We need to collect and keep some personal information only in order to process your booking.
        </p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* YOUR DETAILS SECTION */}
          <div className="bg-white p-6 rounded-md border border-gray-200 mb-6">
            <h2 className="text-xl font-bold text-[#FFCF00] mb-6">YOUR DETAILS</h2>
            
            <div className="space-y-5">
              {/* Name fields - Each field in a separate row */}
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 flex items-center">
                      Title <span className="text-red-500 ml-1">*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="border-[#F2F2F2] focus-within:border-[#FFCF00] focus-within:ring-[#FFCF00]">
                          <SelectValue placeholder="Select title" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Mr">Mr</SelectItem>
                        <SelectItem value="Mrs">Mrs</SelectItem>
                        <SelectItem value="Ms">Ms</SelectItem>
                        <SelectItem value="Miss">Miss</SelectItem>
                        <SelectItem value="Master">Master</SelectItem>
                        <SelectItem value="Lord">Lord</SelectItem>
                        <SelectItem value="Lady">Lady</SelectItem>
                        <SelectItem value="Sir">Sir</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* First Name */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 flex items-center">
                      First name <span className="text-red-500 ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter first name"
                        {...field}
                        className="border-[#F2F2F2] focus-within:border-[#FFCF00] focus-within:ring-[#FFCF00]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Last Name */}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 flex items-center">
                      Last name <span className="text-red-500 ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter last name"
                        {...field}
                        className="border-[#F2F2F2] focus-within:border-[#FFCF00] focus-within:ring-[#FFCF00]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 flex items-center">
                      Email <span className="text-red-500 ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        {...field}
                        className="border-[#F2F2F2] focus-within:border-[#FFCF00] focus-within:ring-[#FFCF00]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Mobile - Single row */}
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 flex items-center">
                      Mobile <span className="text-red-500 ml-1">*</span>
                    </FormLabel>
                    <div className="flex">
                      <div className="flex items-center justify-center w-20 h-10 bg-gray-100 border border-[#F2F2F2] rounded-l-md px-2">
                        <span className="flex items-center">
                          <img src="https://flagcdn.com/w20/gb.png" alt="UK" className="mr-1 h-3" />
                          +44
                        </span>
                      </div>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="Enter mobile number"
                          {...field}
                          className="rounded-l-none border-[#F2F2F2] focus-within:border-[#FFCF00] focus-within:ring-[#FFCF00]"
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Landline - Single row */}
              <FormField
                control={form.control}
                name="landline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 flex items-center">
                      Landline <span className="text-red-500 ml-1">*</span>
                    </FormLabel>
                    <div className="flex">
                      <div className="flex items-center justify-center w-20 h-10 bg-gray-100 border border-[#F2F2F2] rounded-l-md px-2">
                        <span className="flex items-center">
                          <img src="https://flagcdn.com/w20/gb.png" alt="UK" className="mr-1 h-3" />
                          +44
                        </span>
                      </div>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="Enter landline number"
                          {...field}
                          className="rounded-l-none border-[#F2F2F2] focus-within:border-[#FFCF00] focus-within:ring-[#FFCF00]"
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Occupation */}
              <FormField
                control={form.control}
                name="occupation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 flex items-center">
                      Occupation <span className="text-red-500 ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your occupation"
                        {...field}
                        className="border-[#F2F2F2] focus-within:border-[#FFCF00] focus-within:ring-[#FFCF00]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Relationship to service recipient */}
              <FormField
                control={form.control}
                name="relationshipToRecipient"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 flex items-center">
                      Relationship to service recipient <span className="text-red-500 ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your relationship"
                        {...field}
                        className="border-[#F2F2F2] focus-within:border-[#FFCF00] focus-within:ring-[#FFCF00]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* YOUR ADDRESS SECTION */}
          <div className="bg-white p-6 rounded-md border border-gray-200 mb-6">
            <h2 className="text-xl font-bold text-[#FFCF00] mb-6">YOUR ADDRESS</h2>
            
            <div className="space-y-5">
              {/* Country - Single row */}
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Country</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="border-[#F2F2F2] focus-within:border-[#FFCF00] focus-within:ring-[#FFCF00]">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country.code} value={country.name}>
                            <div className="flex items-center">
                              <img src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`} alt={country.code} className="mr-2 h-3" />
                              {country.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Postcode - Single row */}
              <div className="relative">
                <FormField
                  control={form.control}
                  name="postcode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 flex items-center">
                        Postcode <span className="text-red-500 ml-1">*</span>
                      </FormLabel>
                      <div className="flex">
                        <FormControl>
                          <Input
                            placeholder="Enter postcode"
                            {...field}
                            className="border-[#F2F2F2] focus-within:border-[#FFCF00] focus-within:ring-[#FFCF00]"
                          />
                        </FormControl>
                        <Button 
                          type="button" 
                          className="ml-2 bg-[#FFCF00] hover:bg-[#FFCC00]/90 text-black"
                        >
                          FIND ADDRESS
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Address Fields */}
              <div className="pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={toggleAddressFields}
                  className="text-[#FFCF00] border-[#FFCF00] hover:bg-[#FFCF00]/10"
                >
                  Enter address manually
                </Button>
              </div>

              {showAddressFields && (
                <div className="space-y-4 pt-2">
                  <FormField
                    control={form.control}
                    name="addressLine1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Address line 1</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter address line 1"
                            {...field}
                            className="border-[#F2F2F2] focus-within:border-[#FFCF00] focus-within:ring-[#FFCF00]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="addressLine2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Address line 2</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter address line 2"
                            {...field}
                            className="border-[#F2F2F2] focus-within:border-[#FFCF00] focus-within:ring-[#FFCF00]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="addressLine3"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Address line 3</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter address line 3"
                            {...field}
                            className="border-[#F2F2F2] focus-within:border-[#FFCF00] focus-within:ring-[#FFCF00]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
              
              {/* Email confirmation note */}
              <div className="flex items-center mt-4 text-sm text-gray-500">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info size={16} className="text-[#FFCF00] mr-2" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-black text-white p-3 max-w-xs">
                      <p>We'll send you confirmation details to this email address.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                We will send you a booking confirmation email.
              </div>
            </div>
          </div>
          
          {/* SERVICE RECIPIENT SECTION */}
          <div className="bg-white p-6 rounded-md border border-gray-200 mb-6">
            <h2 className="text-xl font-bold text-[#FFCF00] mb-6">SERVICE RECIPIENT</h2>
            
            <div className="flex space-x-3 mb-6">
              <Button
                type="button"
                className={`px-6 py-2 ${
                  activeRecipient === "self" 
                    ? "bg-[#FFCF00] text-black" 
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => setActiveRecipient("self")}
              >
                SERVICE RECIPIENT 1
              </Button>
              <Button
                type="button"
                className={`px-6 py-2 ${
                  activeRecipient === "other" 
                    ? "bg-[#FFCF00] text-black" 
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => setActiveRecipient("other")}
              >
                SERVICE RECIPIENT 2
              </Button>
            </div>
            
            {activeRecipient === "other" && (
              <div className="space-y-5">
                {/* Title */}
                <FormField
                  control={form.control}
                  name="recipientTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 flex items-center">
                        Title <span className="text-red-500 ml-1">*</span>
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="border-[#F2F2F2] focus-within:border-[#FFCF00] focus-within:ring-[#FFCF00]">
                            <SelectValue placeholder="Select title" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Mr">Mr</SelectItem>
                          <SelectItem value="Mrs">Mrs</SelectItem>
                          <SelectItem value="Ms">Ms</SelectItem>
                          <SelectItem value="Miss">Miss</SelectItem>
                          <SelectItem value="Master">Master</SelectItem>
                          <SelectItem value="Lord">Lord</SelectItem>
                          <SelectItem value="Lady">Lady</SelectItem>
                          <SelectItem value="Sir">Sir</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* First Name */}
                <FormField
                  control={form.control}
                  name="recipientFirstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 flex items-center">
                        First name <span className="text-red-500 ml-1">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter first name"
                          {...field}
                          className="border-[#F2F2F2] focus-within:border-[#FFCF00] focus-within:ring-[#FFCF00]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Last Name */}
                <FormField
                  control={form.control}
                  name="recipientLastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 flex items-center">
                        Last name <span className="text-red-500 ml-1">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter last name"
                          {...field}
                          className="border-[#F2F2F2] focus-within:border-[#FFCF00] focus-within:ring-[#FFCF00]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="recipientEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 flex items-center">
                        Email <span className="text-red-500 ml-1">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter email address"
                          {...field}
                          className="border-[#F2F2F2] focus-within:border-[#FFCF00] focus-within:ring-[#FFCF00]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Mobile */}
                <FormField
                  control={form.control}
                  name="recipientMobile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 flex items-center">
                        Mobile <span className="text-red-500 ml-1">*</span>
                      </FormLabel>
                      <div className="flex">
                        <div className="flex items-center justify-center w-20 h-10 bg-gray-100 border border-[#F2F2F2] rounded-l-md px-2">
                          <span className="flex items-center">
                            <img src="https://flagcdn.com/w20/gb.png" alt="UK" className="mr-1 h-3" />
                            +44
                          </span>
                        </div>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="Enter mobile number"
                            {...field}
                            className="rounded-l-none border-[#F2F2F2] focus-within:border-[#FFCF00] focus-within:ring-[#FFCF00]"
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Landline */}
                <FormField
                  control={form.control}
                  name="recipientLandline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 flex items-center">
                        Landline <span className="text-red-500 ml-1">*</span>
                      </FormLabel>
                      <div className="flex">
                        <div className="flex items-center justify-center w-20 h-10 bg-gray-100 border border-[#F2F2F2] rounded-l-md px-2">
                          <span className="flex items-center">
                            <img src="https://flagcdn.com/w20/gb.png" alt="UK" className="mr-1 h-3" />
                            +44
                          </span>
                        </div>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="Enter landline number"
                            {...field}
                            className="rounded-l-none border-[#F2F2F2] focus-within:border-[#FFCF00] focus-within:ring-[#FFCF00]"
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Date of Birth */}
                  <FormField
                    control={form.control}
                    name="recipientDateOfBirth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 flex items-center">
                          Date of birth <span className="text-red-500 ml-1">*</span>
                        </FormLabel>
                        <div className="flex items-center gap-2">
                          <FormControl>
                            <Input
                              placeholder="DD/MM/YYYY"
                              {...field}
                              className="border-[#F2F2F2] focus-within:border-[#FFCF00] focus-within:ring-[#FFCF00]"
                            />
                          </FormControl>
                          <span className="text-sm text-gray-500">Years</span>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Gender */}
                  <FormField
                    control={form.control}
                    name="recipientGender"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-gray-700 flex items-center">
                          Gender <span className="text-red-500 ml-1">*</span>
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex space-x-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="Male" id="male" className="border-[#F2F2F2]" />
                              <label htmlFor="male" className="text-sm">Male</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="Female" id="female" className="border-[#F2F2F2]" />
                              <label htmlFor="female" className="text-sm">Female</label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Nationality */}
                <FormField
                  control={form.control}
                  name="recipientNationality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 flex items-center">
                        Nationality <span className="text-red-500 ml-1">*</span>
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="border-[#F2F2F2] focus-within:border-[#FFCF00] focus-within:ring-[#FFCF00]">
                            <SelectValue placeholder="Select nationality" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country.code} value={country.name}>
                              <div className="flex items-center">
                                <img src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`} alt={country.code} className="mr-2 h-3" />
                                {country.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Recipient Address */}
                <FormField
                  control={form.control}
                  name="recipientAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 flex items-center">
                        Address (where the service recipient plans to stay in the UK) <span className="text-red-500 ml-1">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter address"
                          {...field}
                          className="border-[#F2F2F2] focus-within:border-[#FFCF00] focus-within:ring-[#FFCF00]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Recipient Postcode */}
                <div className="relative">
                  <FormField
                    control={form.control}
                    name="recipientPostcode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 flex items-center">
                          Postcode <span className="text-red-500 ml-1">*</span>
                        </FormLabel>
                        <div className="flex">
                          <FormControl>
                            <Input
                              placeholder="Enter postcode"
                              {...field}
                              className="border-[#F2F2F2] focus-within:border-[#FFCF00] focus-within:ring-[#FFCF00]"
                            />
                          </FormControl>
                          <Button 
                            type="button" 
                            className="ml-2 bg-[#FFCF00] hover:bg-[#FFCC00]/90 text-black"
                          >
                            FIND ADDRESS
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Enter address manually button */}
                <div className="pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={toggleRecipientAddressFields}
                    className="text-[#FFCF00] border-[#FFCF00] hover:bg-[#FFCF00]/10"
                  >
                    Enter address manually
                  </Button>
                </div>

                {showRecipientAddressFields && (
                  <div className="space-y-4 pt-2">
                    <FormField
                      control={form.control}
                      name="recipientAddressLine1"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Address line 1</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter address line 1"
                              {...field}
                              className="border-[#F2F2F2] focus-within:border-[#FFCF00] focus-within:ring-[#FFCF00]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="recipientAddressLine2"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Address line 2</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter address line 2"
                              {...field}
                              className="border-[#F2F2F2] focus-within:border-[#FFCF00] focus-within:ring-[#FFCF00]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="recipientAddressLine3"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Address line 3</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter address line 3"
                              {...field}
                              className="border-[#F2F2F2] focus-within:border-[#FFCF00] focus-within:ring-[#FFCF00]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {/* SPECIAL REQUIREMENTS */}
                <div className="pt-4 space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Special Requirements</h3>
                  
                  {/* Disability */}
                  <FormField
                    control={form.control}
                    name="hasDisability"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-gray-700 flex items-center">
                          Does the service recipient have a: Disability? <span className="text-red-500 ml-1">*</span>
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex space-x-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="Yes" id="disability-yes" className="border-[#F2F2F2]" />
                              <label htmlFor="disability-yes" className="text-sm">Yes</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="No" id="disability-no" className="border-[#F2F2F2]" />
                              <label htmlFor="disability-no" className="text-sm">No</label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Special Educational Need */}
                  <FormField
                    control={form.control}
                    name="hasSpecialEducationalNeed"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-gray-700 flex items-center">
                          Special Educational Need? <span className="text-red-500 ml-1">*</span>
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex space-x-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="Yes" id="sen-yes" className="border-[#F2F2F2]" />
                              <label htmlFor="sen-yes" className="text-sm">Yes</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="No" id="sen-no" className="border-[#F2F2F2]" />
                              <label htmlFor="sen-no" className="text-sm">No</label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Allergy */}
                  <FormField
                    control={form.control}
                    name="hasAllergy"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-gray-700 flex items-center">
                          Allergy? <span className="text-red-500 ml-1">*</span>
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex space-x-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="Yes" id="allergy-yes" className="border-[#F2F2F2]" />
                              <label htmlFor="allergy-yes" className="text-sm">Yes</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="No" id="allergy-no" className="border-[#F2F2F2]" />
                              <label htmlFor="allergy-no" className="text-sm">No</label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Allergy details */}
                  {form.watch("hasAllergy") === "Yes" && (
                    <FormField
                      control={form.control}
                      name="allergyDetails"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">
                            If yes, please specify:
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter allergy details"
                              {...field}
                              className="border-[#F2F2F2] focus-within:border-[#FFCF00] focus-within:ring-[#FFCF00]"
                              maxLength={100}
                            />
                          </FormControl>
                          <div className="text-xs text-gray-400 mt-1">Max 100 words</div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {/* Dietary Requirement */}
                  <FormField
                    control={form.control}
                    name="hasDietaryRequirement"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-gray-700 flex items-center">
                          Dietary Requirement? <span className="text-red-500 ml-1">*</span>
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex space-x-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="Yes" id="dietary-yes" className="border-[#F2F2F2]" />
                              <label htmlFor="dietary-yes" className="text-sm">Yes</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="No" id="dietary-no" className="border-[#F2F2F2]" />
                              <label htmlFor="dietary-no" className="text-sm">No</label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}
          </div>

          {/* EMAIL MARKETING SECTION */}
          <div className="bg-white p-6 rounded-md border border-gray-200 mb-6">
            <h2 className="text-xl font-bold text-[#FFCF00] mb-6">EMAIL MARKETING</h2>
            
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700 max-w-md">
                We would like to send you news and offers for our services by email. If you would prefer not to receive these, please ensure this box is ticked.
              </div>
              <FormField
                control={form.control}
                name="marketingConsent"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Form Buttons */}
          <div className="space-y-4">
            <Button
              type="submit"
              className="w-full py-5 h-auto bg-black hover:bg-black/90 text-white font-bold"
            >
              CONTINUE
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="w-full py-5 h-auto"
            >
              Back
            </Button>
          </div>
          
          <div className="text-xs text-center text-gray-500 mt-6">
            Your data is safe and secure with us.<br />
            Your personal information is confidential and secure when you use the Learning Hub website.
          </div>
        </form>
      </Form>
    </div>
  );
};
