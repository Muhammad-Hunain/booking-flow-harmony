
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

// Define form validation schema
const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  addressLine1: z.string().optional(),
  addressLine2: z.string().optional(),
  addressLine3: z.string().optional(),
  city: z.string().optional(),
  postcode: z.string().optional(),
  specialRequirements: z.string().optional(),
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

  // Define form with validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      addressLine3: "",
      city: "",
      postcode: "",
      specialRequirements: "",
    },
  });

  // Handle form submission
  const onSubmit = (data: FormValues) => {
    toast.success("Personal details saved!");
    onContinue();
  };

  const toggleAddressFields = () => {
    setShowAddressFields(!showAddressFields);
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-center mb-6 text-black">
        PERSONAL DETAILS
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Full Name */}
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your full name"
                    {...field}
                    className="border-gray-300"
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
                <FormLabel className="text-gray-700">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    {...field}
                    className="border-gray-300"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Phone</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="Enter your phone number"
                    {...field}
                    className="border-gray-300"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Enter Address Manually Button */}
          <div className="pt-1">
            <Button
              type="button"
              variant="outline"
              onClick={toggleAddressFields}
              className="text-amber-600 border-amber-300 hover:bg-amber-50"
            >
              {showAddressFields ? "Hide Address Fields" : "Enter Address Manually"}
            </Button>
          </div>

          {/* Address Fields (conditionally shown) */}
          {showAddressFields && (
            <div className="space-y-5 pt-2">
              <FormField
                control={form.control}
                name="addressLine1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Address Line 1</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your address"
                        {...field}
                        className="border-gray-300"
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
                    <FormLabel className="text-gray-700">Address Line 2</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your address"
                        {...field}
                        className="border-gray-300"
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
                    <FormLabel className="text-gray-700">Address Line 3</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your address"
                        {...field}
                        className="border-gray-300"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">City</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your city"
                          {...field}
                          className="border-gray-300"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="postcode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Postcode</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your postcode"
                          {...field}
                          className="border-gray-300"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}

          {/* Special Requirements */}
          <FormField
            control={form.control}
            name="specialRequirements"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">
                  Special Requirements (Optional)
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Any special requirements or notes"
                    {...field}
                    className="border-gray-300"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Form Buttons */}
          <div className="flex flex-col space-y-3 pt-4">
            <Button
              type="submit"
              className="w-full py-5 h-auto bg-black hover:bg-black/90 text-white font-semibold"
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
        </form>
      </Form>
    </div>
  );
};
