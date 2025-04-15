
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
import { Switch } from "@/components/ui/switch";
import { Info, Lock } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { RecipientForm } from "./RecipientForm";

// Define form validation schema
const formSchema = z.object({
  // First recipient (self)
  title: z.string().min(1, { message: "Title is required." }),
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  mobile: z.string().min(5, { message: "Mobile number is required." }),
  mobileCountryCode: z.string().default("+44"),
  landline: z.string().optional(),
  landlineCountryCode: z.string().default("+44"),
  occupation: z.string().optional(),
  relationshipToRecipient: z.string().optional(),
  country: z.string().default("United Kingdom"),
  postcode: z.string().min(1, { message: "Postcode is required." }),
  addressLine1: z.string().optional(),
  addressLine2: z.string().optional(),
  addressLine3: z.string().optional(),
  dateOfBirth: z.string().optional(),
  gender: z.enum(["Male", "Female"]).optional(),
  nationality: z.string().optional(),
  
  // Special requirements fields for recipient 1
  hasDisability: z.enum(["Yes", "No"]).optional(),
  hasSpecialEducationalNeed: z.enum(["Yes", "No"]).optional(),
  hasAllergy: z.enum(["Yes", "No"]).optional(),
  allergyDetails: z.string().optional(),
  hasDietaryRequirement: z.enum(["Yes", "No"]).optional(),
  
  // Service recipient 2 fields
  recipientTitle: z.string().optional(),
  recipientFirstName: z.string().optional(),
  recipientLastName: z.string().optional(),
  recipientEmail: z.string().email({ message: "Please enter a valid email address." }).optional(),
  recipientMobile: z.string().optional(),
  recipientMobileCountryCode: z.string().default("+44"),
  recipientLandline: z.string().optional(),
  recipientLandlineCountryCode: z.string().default("+44"),
  recipientDateOfBirth: z.string().optional(),
  recipientGender: z.enum(["Male", "Female"]).optional(),
  recipientNationality: z.string().optional(),
  recipientAddress: z.string().optional(),
  recipientPostcode: z.string().optional(),
  recipientAddressLine1: z.string().optional(),
  recipientAddressLine2: z.string().optional(),
  recipientAddressLine3: z.string().optional(),
  
  // Special requirements fields for recipient 2
  recipientHasDisability: z.enum(["Yes", "No"]).optional(),
  recipientHasSpecialEducationalNeed: z.enum(["Yes", "No"]).optional(),
  recipientHasAllergy: z.enum(["Yes", "No"]).optional(),
  recipientAllergyDetails: z.string().optional(),
  recipientHasDietaryRequirement: z.enum(["Yes", "No"]).optional(),
  
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
      mobileCountryCode: "+44",
      landline: "",
      landlineCountryCode: "+44",
      occupation: "",
      relationshipToRecipient: "",
      country: "United Kingdom",
      postcode: "",
      addressLine1: "",
      addressLine2: "",
      addressLine3: "",
      dateOfBirth: "",
      gender: "Female",
      nationality: "United Kingdom",
      
      // Special requirements fields
      hasDisability: "No",
      hasSpecialEducationalNeed: "No",
      hasAllergy: "No",
      allergyDetails: "",
      hasDietaryRequirement: "No",
      
      // Service recipient fields
      recipientTitle: "",
      recipientFirstName: "",
      recipientLastName: "",
      recipientEmail: "",
      recipientMobile: "",
      recipientMobileCountryCode: "+44",
      recipientLandline: "",
      recipientLandlineCountryCode: "+44",
      recipientDateOfBirth: "",
      recipientGender: "Female",
      recipientNationality: "United Kingdom",
      recipientAddress: "",
      recipientPostcode: "",
      recipientAddressLine1: "",
      recipientAddressLine2: "",
      recipientAddressLine3: "",
      
      // Special requirements fields for recipient 2
      recipientHasDisability: "No",
      recipientHasSpecialEducationalNeed: "No",
      recipientHasAllergy: "No",
      recipientAllergyDetails: "",
      recipientHasDietaryRequirement: "No",
      
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
    { code: "AF", name: "Afghanistan", dial: "+93" },
    { code: "AL", name: "Albania", dial: "+355" },
    { code: "DZ", name: "Algeria", dial: "+213" },
    { code: "AD", name: "Andorra", dial: "+376" },
    { code: "AO", name: "Angola", dial: "+244" },
    { code: "AG", name: "Antigua and Barbuda", dial: "+1" },
    { code: "AR", name: "Argentina", dial: "+54" },
    { code: "AM", name: "Armenia", dial: "+374" },
    { code: "AU", name: "Australia", dial: "+61" },
    { code: "AT", name: "Austria", dial: "+43" },
    { code: "AZ", name: "Azerbaijan", dial: "+994" },
    { code: "BS", name: "Bahamas", dial: "+1" },
    { code: "BH", name: "Bahrain", dial: "+973" },
    { code: "BD", name: "Bangladesh", dial: "+880" },
    { code: "BB", name: "Barbados", dial: "+1" },
    { code: "BY", name: "Belarus", dial: "+375" },
    { code: "BE", name: "Belgium", dial: "+32" },
    { code: "BZ", name: "Belize", dial: "+501" },
    { code: "BJ", name: "Benin", dial: "+229" },
    { code: "BT", name: "Bhutan", dial: "+975" },
    { code: "BO", name: "Bolivia", dial: "+591" },
    { code: "BA", name: "Bosnia and Herzegovina", dial: "+387" },
    { code: "BW", name: "Botswana", dial: "+267" },
    { code: "BR", name: "Brazil", dial: "+55" },
    { code: "BN", name: "Brunei", dial: "+673" },
    { code: "BG", name: "Bulgaria", dial: "+359" },
    { code: "BF", name: "Burkina Faso", dial: "+226" },
    { code: "BI", name: "Burundi", dial: "+257" },
    { code: "CV", name: "Cabo Verde", dial: "+238" },
    { code: "KH", name: "Cambodia", dial: "+855" },
    { code: "CM", name: "Cameroon", dial: "+237" },
    { code: "CA", name: "Canada", dial: "+1" },
    { code: "CF", name: "Central African Republic", dial: "+236" },
    { code: "TD", name: "Chad", dial: "+235" },
    { code: "CL", name: "Chile", dial: "+56" },
    { code: "CN", name: "China", dial: "+86" },
    { code: "CO", name: "Colombia", dial: "+57" },
    { code: "KM", name: "Comoros", dial: "+269" },
    { code: "CG", name: "Congo", dial: "+242" },
    { code: "CD", name: "Congo (DRC)", dial: "+243" },
    { code: "CR", name: "Costa Rica", dial: "+506" },
    { code: "CI", name: "Côte d'Ivoire", dial: "+225" },
    { code: "HR", name: "Croatia", dial: "+385" },
    { code: "CU", name: "Cuba", dial: "+53" },
    { code: "CY", name: "Cyprus", dial: "+357" },
    { code: "CZ", name: "Czech Republic", dial: "+420" },
    { code: "DK", name: "Denmark", dial: "+45" },
    { code: "DJ", name: "Djibouti", dial: "+253" },
    { code: "DM", name: "Dominica", dial: "+1" },
    { code: "DO", name: "Dominican Republic", dial: "+1" },
    { code: "EC", name: "Ecuador", dial: "+593" },
    { code: "EG", name: "Egypt", dial: "+20" },
    { code: "SV", name: "El Salvador", dial: "+503" },
    { code: "GQ", name: "Equatorial Guinea", dial: "+240" },
    { code: "ER", name: "Eritrea", dial: "+291" },
    { code: "EE", name: "Estonia", dial: "+372" },
    { code: "ET", name: "Ethiopia", dial: "+251" },
    { code: "FJ", name: "Fiji", dial: "+679" },
    { code: "FI", name: "Finland", dial: "+358" },
    { code: "FR", name: "France", dial: "+33" },
    { code: "GA", name: "Gabon", dial: "+241" },
    { code: "GM", name: "Gambia", dial: "+220" },
    { code: "GE", name: "Georgia", dial: "+995" },
    { code: "DE", name: "Germany", dial: "+49" },
    { code: "GH", name: "Ghana", dial: "+233" },
    { code: "GR", name: "Greece", dial: "+30" },
    { code: "GD", name: "Grenada", dial: "+1" },
    { code: "GT", name: "Guatemala", dial: "+502" },
    { code: "GN", name: "Guinea", dial: "+224" },
    { code: "GW", name: "Guinea-Bissau", dial: "+245" },
    { code: "GY", name: "Guyana", dial: "+592" },
    { code: "HT", name: "Haiti", dial: "+509" },
    { code: "HN", name: "Honduras", dial: "+504" },
    { code: "HU", name: "Hungary", dial: "+36" },
    { code: "IS", name: "Iceland", dial: "+354" },
    { code: "IN", name: "India", dial: "+91" },
    { code: "ID", name: "Indonesia", dial: "+62" },
    { code: "IR", name: "Iran", dial: "+98" },
    { code: "IQ", name: "Iraq", dial: "+964" },
    { code: "IE", name: "Ireland", dial: "+353" },
    { code: "IL", name: "Israel", dial: "+972" },
    { code: "IT", name: "Italy", dial: "+39" },
    { code: "JM", name: "Jamaica", dial: "+1" },
    { code: "JP", name: "Japan", dial: "+81" },
    { code: "JO", name: "Jordan", dial: "+962" },
    { code: "KZ", name: "Kazakhstan", dial: "+7" },
    { code: "KE", name: "Kenya", dial: "+254" },
    { code: "KI", name: "Kiribati", dial: "+686" },
    { code: "KP", name: "North Korea", dial: "+850" },
    { code: "KR", name: "South Korea", dial: "+82" },
    { code: "KW", name: "Kuwait", dial: "+965" },
    { code: "KG", name: "Kyrgyzstan", dial: "+996" },
    { code: "LA", name: "Laos", dial: "+856" },
    { code: "LV", name: "Latvia", dial: "+371" },
    { code: "LB", name: "Lebanon", dial: "+961" },
    { code: "LS", name: "Lesotho", dial: "+266" },
    { code: "LR", name: "Liberia", dial: "+231" },
    { code: "LY", name: "Libya", dial: "+218" },
    { code: "LI", name: "Liechtenstein", dial: "+423" },
    { code: "LT", name: "Lithuania", dial: "+370" },
    { code: "LU", name: "Luxembourg", dial: "+352" },
    { code: "MG", name: "Madagascar", dial: "+261" },
    { code: "MW", name: "Malawi", dial: "+265" },
    { code: "MY", name: "Malaysia", dial: "+60" },
    { code: "MV", name: "Maldives", dial: "+960" },
    { code: "ML", name: "Mali", dial: "+223" },
    { code: "MT", name: "Malta", dial: "+356" },
    { code: "MH", name: "Marshall Islands", dial: "+692" },
    { code: "MR", name: "Mauritania", dial: "+222" },
    { code: "MU", name: "Mauritius", dial: "+230" },
    { code: "MX", name: "Mexico", dial: "+52" },
    { code: "FM", name: "Micronesia", dial: "+691" },
    { code: "MD", name: "Moldova", dial: "+373" },
    { code: "MC", name: "Monaco", dial: "+377" },
    { code: "MN", name: "Mongolia", dial: "+976" },
    { code: "ME", name: "Montenegro", dial: "+382" },
    { code: "MA", name: "Morocco", dial: "+212" },
    { code: "MZ", name: "Mozambique", dial: "+258" },
    { code: "MM", name: "Myanmar", dial: "+95" },
    { code: "NA", name: "Namibia", dial: "+264" },
    { code: "NR", name: "Nauru", dial: "+674" },
    { code: "NP", name: "Nepal", dial: "+977" },
    { code: "NL", name: "Netherlands", dial: "+31" },
    { code: "NZ", name: "New Zealand", dial: "+64" },
    { code: "NI", name: "Nicaragua", dial: "+505" },
    { code: "NE", name: "Niger", dial: "+227" },
    { code: "NG", name: "Nigeria", dial: "+234" },
    { code: "NO", name: "Norway", dial: "+47" },
    { code: "OM", name: "Oman", dial: "+968" },
    { code: "PK", name: "Pakistan", dial: "+92" },
    { code: "PW", name: "Palau", dial: "+680" },
    { code: "PS", name: "Palestine", dial: "+970" },
    { code: "PA", name: "Panama", dial: "+507" },
    { code: "PG", name: "Papua New Guinea", dial: "+675" },
    { code: "PY", name: "Paraguay", dial: "+595" },
    { code: "PE", name: "Peru", dial: "+51" },
    { code: "PH", name: "Philippines", dial: "+63" },
    { code: "PL", name: "Poland", dial: "+48" },
    { code: "PT", name: "Portugal", dial: "+351" },
    { code: "QA", name: "Qatar", dial: "+974" },
    { code: "RO", name: "Romania", dial: "+40" },
    { code: "RU", name: "Russia", dial: "+7" },
    { code: "RW", name: "Rwanda", dial: "+250" },
    { code: "KN", name: "Saint Kitts and Nevis", dial: "+1" },
    { code: "LC", name: "Saint Lucia", dial: "+1" },
    { code: "VC", name: "Saint Vincent and the Grenadines", dial: "+1" },
    { code: "WS", name: "Samoa", dial: "+685" },
    { code: "SM", name: "San Marino", dial: "+378" },
    { code: "ST", name: "Sao Tome and Principe", dial: "+239" },
    { code: "SA", name: "Saudi Arabia", dial: "+966" },
    { code: "SN", name: "Senegal", dial: "+221" },
    { code: "RS", name: "Serbia", dial: "+381" },
    { code: "SC", name: "Seychelles", dial: "+248" },
    { code: "SL", name: "Sierra Leone", dial: "+232" },
    { code: "SG", name: "Singapore", dial: "+65" },
    { code: "SK", name: "Slovakia", dial: "+421" },
    { code: "SI", name: "Slovenia", dial: "+386" },
    { code: "SB", name: "Solomon Islands", dial: "+677" },
    { code: "SO", name: "Somalia", dial: "+252" },
    { code: "ZA", name: "South Africa", dial: "+27" },
    { code: "SS", name: "South Sudan", dial: "+211" },
    { code: "ES", name: "Spain", dial: "+34" },
    { code: "LK", name: "Sri Lanka", dial: "+94" },
    { code: "SD", name: "Sudan", dial: "+249" },
    { code: "SR", name: "Suriname", dial: "+597" },
    { code: "SZ", name: "Eswatini", dial: "+268" },
    { code: "SE", name: "Sweden", dial: "+46" },
    { code: "CH", name: "Switzerland", dial: "+41" },
    { code: "SY", name: "Syria", dial: "+963" },
    { code: "TW", name: "Taiwan", dial: "+886" },
    { code: "TJ", name: "Tajikistan", dial: "+992" },
    { code: "TZ", name: "Tanzania", dial: "+255" },
    { code: "TH", name: "Thailand", dial: "+66" },
    { code: "TL", name: "Timor-Leste", dial: "+670" },
    { code: "TG", name: "Togo", dial: "+228" },
    { code: "TO", name: "Tonga", dial: "+676" },
    { code: "TT", name: "Trinidad and Tobago", dial: "+1" },
    { code: "TN", name: "Tunisia", dial: "+216" },
    { code: "TR", name: "Turkey", dial: "+90" },
    { code: "TM", name: "Turkmenistan", dial: "+993" },
    { code: "TV", name: "Tuvalu", dial: "+688" },
    { code: "UG", name: "Uganda", dial: "+256" },
    { code: "UA", name: "Ukraine", dial: "+380" },
    { code: "AE", name: "United Arab Emirates", dial: "+971" },
    { code: "GB", name: "United Kingdom", dial: "+44" },
    { code: "US", name: "United States", dial: "+1" },
    { code: "UY", name: "Uruguay", dial: "+598" },
    { code: "UZ", name: "Uzbekistan", dial: "+998" },
    { code: "VU", name: "Vanuatu", dial: "+678" },
    { code: "VA", name: "Vatican City", dial: "+39" },
    { code: "VE", name: "Venezuela", dial: "+58" },
    { code: "VN", name: "Vietnam", dial: "+84" },
    { code: "YE", name: "Yemen", dial: "+967" },
    { code: "ZM", name: "Zambia", dial: "+260" },
    { code: "ZW", name: "Zimbabwe", dial: "+263" }
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
            
            {activeRecipient === "self" && (
              <RecipientForm 
                form={form}
                prefix="self"
                countries={countries}
                onToggleAddressFields={toggleAddressFields}
                showAddressFields={showAddressFields}
                isSecondRecipient={false}
              />
            )}

            {activeRecipient === "other" && (
              <RecipientForm 
                form={form}
                prefix="other"
                countries={countries}
                onToggleAddressFields={toggleRecipientAddressFields}
                showAddressFields={showRecipientAddressFields}
                isSecondRecipient={true}
              />
            )}
          </div>

          {/* YOUR DETAILS SECTION */}
          <div className="bg-white p-6 rounded-md border border-gray-200 mb-6">
            <h2 className="text-xl font-bold text-[#FFCF00] mb-6">YOUR DETAILS</h2>
            <div className="space-y-5">
              {/* Name fields - Each field in a separate row */}
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
