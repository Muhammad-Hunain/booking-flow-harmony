
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { DateOfBirthPicker } from "./DateOfBirthPicker";

interface RecipientFormProps {
  form: UseFormReturn<any>;
  prefix: string;
  countries: { code: string; name: string; dial: string }[];
  onToggleAddressFields: () => void;
  showAddressFields: boolean;
  isSecondRecipient?: boolean;
}

export const RecipientForm: React.FC<RecipientFormProps> = ({
  form,
  prefix,
  countries,
  onToggleAddressFields,
  showAddressFields,
  isSecondRecipient = false,
}) => {
  const titleName = isSecondRecipient ? "recipientTitle" : "title";
  const firstNameName = isSecondRecipient ? "recipientFirstName" : "firstName";
  const lastNameName = isSecondRecipient ? "recipientLastName" : "lastName";
  const emailName = isSecondRecipient ? "recipientEmail" : "email";
  const mobileName = isSecondRecipient ? "recipientMobile" : "mobile";
  const mobileCountryCodeName = isSecondRecipient ? "recipientMobileCountryCode" : "mobileCountryCode";
  const landlineName = isSecondRecipient ? "recipientLandline" : "landline";
  const landlineCountryCodeName = isSecondRecipient ? "recipientLandlineCountryCode" : "landlineCountryCode";
  const dobName = isSecondRecipient ? "recipientDateOfBirth" : "dateOfBirth";
  const genderName = isSecondRecipient ? "recipientGender" : "gender";
  const nationalityName = isSecondRecipient ? "recipientNationality" : "nationality";
  const disabilityName = isSecondRecipient ? "recipientHasDisability" : "hasDisability";
  const senName = isSecondRecipient ? "recipientHasSpecialEducationalNeed" : "hasSpecialEducationalNeed";
  const allergyName = isSecondRecipient ? "recipientHasAllergy" : "hasAllergy";
  const allergyDetailsName = isSecondRecipient ? "recipientAllergyDetails" : "allergyDetails";
  const dietaryName = isSecondRecipient ? "recipientHasDietaryRequirement" : "hasDietaryRequirement";
  const postcodeName = isSecondRecipient ? "recipientPostcode" : "postcode";
  const addressLine1Name = isSecondRecipient ? "recipientAddressLine1" : "addressLine1";
  const addressLine2Name = isSecondRecipient ? "recipientAddressLine2" : "addressLine2";
  const addressLine3Name = isSecondRecipient ? "recipientAddressLine3" : "addressLine3";

  return (
    <div className="space-y-5">
      {/* Title */}
      <FormField
        control={form.control}
        name={titleName}
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
        name={firstNameName}
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
        name={lastNameName}
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
        name={emailName}
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

      {/* Mobile - With Country Code Selection */}
      <FormField
        control={form.control}
        name={mobileName}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700 flex items-center">
              Mobile <span className="text-red-500 ml-1">*</span>
            </FormLabel>
            <div className="flex">
              <Select 
                onValueChange={(value) => form.setValue(mobileCountryCodeName, value)} 
                defaultValue={form.getValues(mobileCountryCodeName)}
              >
                <SelectTrigger className="w-32 border-[#F2F2F2] rounded-r-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-80">
                  {countries.map((country) => (
                    <SelectItem key={`mobile-${country.code}-${prefix}`} value={country.dial}>
                      <div className="flex items-center">
                        <img src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`} alt={country.code} className="mr-2 h-3" />
                        {country.dial}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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

      {/* Landline - With Country Code Selection */}
      <FormField
        control={form.control}
        name={landlineName}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700 flex items-center">
              Landline <span className="text-red-500 ml-1">*</span>
            </FormLabel>
            <div className="flex">
              <Select 
                onValueChange={(value) => form.setValue(landlineCountryCodeName, value)} 
                defaultValue={form.getValues(landlineCountryCodeName)}
              >
                <SelectTrigger className="w-32 border-[#F2F2F2] rounded-r-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-80">
                  {countries.map((country) => (
                    <SelectItem key={`landline-${country.code}-${prefix}`} value={country.dial}>
                      <div className="flex items-center">
                        <img src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`} alt={country.code} className="mr-2 h-3" />
                        {country.dial}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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

      {!isSecondRecipient && (
        <>
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
        </>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Date of Birth */}
        <FormField
          control={form.control}
          name={dobName}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <DateOfBirthPicker
                  label="Date of birth"
                  required={true}
                  value={field.value ? new Date(field.value) : undefined}
                  onChange={(date) => field.onChange(date ? date.toISOString() : '')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Gender */}
        <FormField
          control={form.control}
          name={genderName}
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
                    <RadioGroupItem value="Male" id={`${prefix}male`} className="border-[#F2F2F2]" />
                    <label htmlFor={`${prefix}male`} className="text-sm">Male</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Female" id={`${prefix}female`} className="border-[#F2F2F2]" />
                    <label htmlFor={`${prefix}female`} className="text-sm">Female</label>
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
        name={nationalityName}
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
              <SelectContent className="max-h-80">
                {countries.map((country) => (
                  <SelectItem key={`nationality-${country.code}-${prefix}`} value={country.name}>
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

      {/* Address related fields */}
      <FormField
        control={form.control}
        name={postcodeName}
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

      {/* Enter address manually button */}
      <div className="pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onToggleAddressFields}
          className="text-[#FFCF00] border-[#FFCF00] hover:bg-[#FFCF00]/10"
        >
          Enter address manually
        </Button>
      </div>

      {showAddressFields && (
        <div className="space-y-4 pt-2">
          <FormField
            control={form.control}
            name={addressLine1Name}
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
            name={addressLine2Name}
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
            name={addressLine3Name}
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
          name={disabilityName}
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
                    <RadioGroupItem value="Yes" id={`${prefix}disability-yes`} className="border-[#F2F2F2]" />
                    <label htmlFor={`${prefix}disability-yes`} className="text-sm">Yes</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="No" id={`${prefix}disability-no`} className="border-[#F2F2F2]" />
                    <label htmlFor={`${prefix}disability-no`} className="text-sm">No</label>
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
          name={senName}
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
                    <RadioGroupItem value="Yes" id={`${prefix}sen-yes`} className="border-[#F2F2F2]" />
                    <label htmlFor={`${prefix}sen-yes`} className="text-sm">Yes</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="No" id={`${prefix}sen-no`} className="border-[#F2F2F2]" />
                    <label htmlFor={`${prefix}sen-no`} className="text-sm">No</label>
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
          name={allergyName}
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
                    <RadioGroupItem value="Yes" id={`${prefix}allergy-yes`} className="border-[#F2F2F2]" />
                    <label htmlFor={`${prefix}allergy-yes`} className="text-sm">Yes</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="No" id={`${prefix}allergy-no`} className="border-[#F2F2F2]" />
                    <label htmlFor={`${prefix}allergy-no`} className="text-sm">No</label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Allergy details */}
        {form.watch(allergyName) === "Yes" && (
          <FormField
            control={form.control}
            name={allergyDetailsName}
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
          name={dietaryName}
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
                    <RadioGroupItem value="Yes" id={`${prefix}dietary-yes`} className="border-[#F2F2F2]" />
                    <label htmlFor={`${prefix}dietary-yes`} className="text-sm">Yes</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="No" id={`${prefix}dietary-no`} className="border-[#F2F2F2]" />
                    <label htmlFor={`${prefix}dietary-no`} className="text-sm">No</label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
