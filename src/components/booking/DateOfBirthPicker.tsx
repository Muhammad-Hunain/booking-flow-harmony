
import * as React from "react";
import { format, differenceInYears } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface DateOfBirthPickerProps {
  value?: Date;
  onChange: (date: Date | undefined) => void;
  label: string;
  required?: boolean;
}

export const DateOfBirthPicker = ({
  value,
  onChange,
  label,
  required = false,
}: DateOfBirthPickerProps) => {
  const [age, setAge] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (value) {
      const calculatedAge = differenceInYears(new Date(), value);
      setAge(calculatedAge);
    } else {
      setAge(null);
    }
  }, [value]);

  const handleYearChange = (year: number) => {
    const newDate = new Date();
    newDate.setFullYear(year);
    if (value) {
      const date = new Date(value);
      date.setFullYear(year);
      onChange(date);
    } else {
      onChange(newDate);
    }
  };

  return (
    <div className="space-y-1">
      <FormLabel className="text-gray-700 flex items-center">
        {label} {required && <span className="text-red-500 ml-1">*</span>}
      </FormLabel>
      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant="outline"
                className={cn(
                  "w-full border-[#F2F2F2] focus-within:border-[#FFCF00] focus-within:ring-[#FFCF00] pl-3 text-left font-normal",
                  !value && "text-muted-foreground"
                )}
              >
                {value ? format(value, "dd/MM/yyyy") : <span>DD/MM/YYYY</span>}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={value}
              onSelect={onChange}
              disabled={(date) => date > new Date()}
              fromYear={1900}
              toYear={new Date().getFullYear()}
              captionLayout="dropdown-buttons"
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
        <div className="w-16 flex-shrink-0">
          <Input
            value={age !== null ? `${age}` : ""}
            readOnly
            className="bg-gray-50 text-center text-sm"
            placeholder="Age"
          />
        </div>
        <span className="text-sm text-gray-500">Years</span>
      </div>
    </div>
  );
};
