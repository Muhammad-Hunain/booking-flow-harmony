
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, CreditCard, Info } from "lucide-react";

interface PaymentFormProps {
  selections: {
    location: string;
    serviceType: string;
    dates: string;
    group: string;
  };
  onContinue: () => void;
  onBack: () => void;
}

export const PaymentForm = ({ selections, onContinue, onBack }: PaymentFormProps) => {
  const [address, setAddress] = useState<"current" | "different">("current");
  const [formData, setFormData] = useState({
    cardholderName: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Booking Summary */}
      <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">BOOKING SUMMARY</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>{selections.location}</span>
          </div>
          <div className="flex justify-between">
            <span>{selections.dates}</span>
            <span>• {selections.group}</span>
          </div>
          <div className="flex justify-between">
            <span>2 service recipients</span>
            <span>• {selections.serviceType}</span>
          </div>
          <div className="h-px bg-gray-200 my-3"></div>
          <div className="flex justify-between font-medium">
            <span>Total cost:</span>
            <span className="text-lg font-bold">£1,960.00</span>
          </div>
          <div className="text-xs text-right">Price includes taxes and fees</div>
        </div>
        <div className="flex mt-3 items-start bg-amber-50 p-2 rounded-md">
          <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
          <p className="text-xs text-amber-700">
            Date change request within first 24 hours of booking, non-refundable, no cancellation.
          </p>
        </div>
      </div>

      {/* Billing Address */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-700">BILLING ADDRESS</h3>
        <RadioGroup 
          value={address} 
          onValueChange={(value: "current" | "different") => setAddress(value)}
          className="space-y-2"
        >
          <div className={`flex items-center p-3 rounded-md border ${address === "current" ? "border-amber-500 bg-amber-50" : "border-gray-200"}`}>
            <RadioGroupItem value="current" id="current-address" className="border-amber-500" />
            <div className="ml-3">
              <Label htmlFor="current-address" className="font-medium">Use current address</Label>
              {address === "current" && <div className="text-xs text-gray-500 mt-1">SW3 1AP • 1 Basil Mansions</div>}
            </div>
          </div>
          <div className={`flex items-center p-3 rounded-md border ${address === "different" ? "border-amber-500 bg-amber-50" : "border-gray-200"}`}>
            <RadioGroupItem value="different" id="different-address" className="border-amber-500" />
            <Label htmlFor="different-address" className="ml-3 font-medium">Use different address</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Card Details */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-700">CARD DETAILS</h3>
        <p className="text-xs text-gray-600">
          Please enter your card details to complete your payment. You may be redirected to your bank provider to verify your details.
        </p>
        <div className="flex items-center space-x-2 mt-2">
          <CreditCard className="h-6 w-6 text-gray-500" />
        </div>
        <div className="space-y-3 mt-4">
          <div>
            <Label htmlFor="cardholderName" className="text-xs mb-1">Cardholder name <span className="text-amber-500">*</span></Label>
            <Input 
              id="cardholderName" 
              value={formData.cardholderName}
              onChange={(e) => handleChange("cardholderName", e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <Label htmlFor="cardNumber" className="text-xs mb-1">Card number <span className="text-amber-500">*</span></Label>
            <Input 
              id="cardNumber" 
              value={formData.cardNumber}
              onChange={(e) => handleChange("cardNumber", e.target.value)}
              className="w-full"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiry" className="text-xs mb-1">Card expiry <span className="text-amber-500">*</span></Label>
              <div className="flex space-x-2">
                <Select onValueChange={(value) => handleChange("expiryMonth", value)}>
                  <SelectTrigger id="expiryMonth" className="w-full">
                    <SelectValue placeholder="MM" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => {
                      const month = (i + 1).toString().padStart(2, '0');
                      return <SelectItem key={month} value={month}>{month}</SelectItem>;
                    })}
                  </SelectContent>
                </Select>
                <Select onValueChange={(value) => handleChange("expiryYear", value)}>
                  <SelectTrigger id="expiryYear" className="w-full">
                    <SelectValue placeholder="YYYY" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 10 }, (_, i) => {
                      const year = (new Date().getFullYear() + i).toString();
                      return <SelectItem key={year} value={year}>{year}</SelectItem>;
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="cvv" className="text-xs mb-1">CVV <span className="text-amber-500">*</span></Label>
              <Input 
                id="cvv" 
                value={formData.cvv}
                onChange={(e) => handleChange("cvv", e.target.value)}
                className="w-full"
                maxLength={3}
              />
              <p className="text-xs text-gray-500 mt-1">The last 3 digits on the back of your card or the 4 on the front for AMEX</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Amount */}
      <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold">To pay now</span>
          <span className="text-lg font-bold">£1,960.00</span>
        </div>
        <p className="text-xs text-gray-500">Inc. VAT and fees</p>
      </div>

      {/* Terms and Submit */}
      <div className="space-y-4">
        <div className="bg-gray-50 p-3 rounded-md border border-gray-200 text-xs text-gray-600">
          <p>Confirm booking will create your booking. It may take a moment for the next screen to appear - please do not refresh your browser or press back in this step.</p>
        </div>
        <p className="text-xs text-gray-600">
          By confirming your booking you are agreeing to our <a href="#" className="text-amber-600 underline">Terms and Conditions</a>
        </p>
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button variant="booking" onClick={onContinue} className="px-8">
            CONFIRM BOOKING
          </Button>
        </div>
      </div>
    </div>
  );
};
