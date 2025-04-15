import { MapPin, Calendar, User, Clock, ChevronDown, Mail, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
interface BookingConfirmationProps {
  selections: {
    location: string;
    serviceType: string;
    dates: string;
    group: string;
  };
  bookingReference: string;
  onNewBooking: () => void;
}
export const BookingConfirmation = ({
  selections,
  bookingReference,
  onNewBooking
}: BookingConfirmationProps) => {
  return <div className="flex flex-col items-center space-y-5">
      {/* Success Icons */}
      <div className="flex items-center justify-center space-x-1 mb-2">
        {[1, 2, 3, 4, 5].map(step => <div key={step} className="flex items-center">
            
            {step < 5}
          </div>)}
      </div>
      
      {/* Confirmation Header */}
      <div className="bg-amber-400 py-4 px-6 rounded-md w-full text-center">
        <h2 className="text-xl font-bold">BOOKING</h2>
        <h2 className="text-xl font-bold">CONFIRMED!</h2>
      </div>
      
      {/* Booking Reference */}
      <div className="flex justify-between w-full py-2 border-b text-sm">
        <div className="text-amber-600 font-semibold">BOOKING REFERENCE:</div>
        <div className="font-bold">{bookingReference}</div>
      </div>
      
      {/* Welcome Message */}
      <div className="text-center w-full">
        <p className="text-sm"><span className="font-semibold">Hello Kareemah Ross</span></p>
        <p className="text-sm mt-2">Thanks for choosing our service!</p>
        <p className="text-xs mt-1 text-gray-600">
          You'll find all the booking details below but if you need anything else, just ask - our friendly teams are here to help.
        </p>
        <p className="text-xs mt-1 text-gray-600">
          We look forward to seeing you soon :)
        </p>
      </div>
      
      {/* Your Booking */}
      <div className="w-full">
        <h3 className="text-sm font-bold text-amber-600 mb-2">YOUR BOOKING</h3>
        <div className="bg-gray-100 rounded-md p-4 w-full">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center">
              <MapPin size={16} className="text-gray-600 mr-2" />
              <span className="text-xs">{selections.location}</span>
            </div>
            <div className="flex items-center">
              <User size={16} className="text-gray-600 mr-2" />
              <span className="text-xs">{selections.serviceType}</span>
            </div>
            <div className="flex items-center">
              <Calendar size={16} className="text-gray-600 mr-2" />
              <span className="text-xs">{selections.dates}</span>
            </div>
            <div className="flex items-center">
              <User size={16} className="text-gray-600 mr-2" />
              <span className="text-xs">{selections.group}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Arrival */}
      <div className="w-full">
        <h3 className="text-sm font-bold text-amber-600 mb-2">ARRIVING</h3>
        <div className="bg-gray-100 rounded-md p-4 w-full flex items-center">
          <Calendar size={16} className="text-gray-600 mr-2" />
          <span className="text-xs font-bold">Sunday, 1 December 2024 after 11:00</span>
        </div>
      </div>
      
      {/* Leaving */}
      <div className="w-full">
        <h3 className="text-sm font-bold text-amber-600 mb-2">LEAVING</h3>
        <div className="bg-gray-100 rounded-md p-4 w-full flex items-center">
          <Calendar size={16} className="text-gray-600 mr-2" />
          <span className="text-xs font-bold">Saturday, 7 December 2024 before 18:00</span>
        </div>
      </div>
      
      {/* Hours and Duties */}
      <div className="w-full">
        <div className="bg-gray-100 rounded-md p-4 w-full">
          <h3 className="text-sm font-bold mb-2">Hours</h3>
          <div className="flex items-center mb-4">
            <Clock size={16} className="text-gray-600 mr-2" />
            <span className="text-xs">10:00 - 18:00</span>
          </div>
          
          <h3 className="text-sm font-bold mb-2">Duties</h3>
          <ul className="text-xs space-y-1 list-disc pl-5">
            <li>Mentor or a peer-to-peer buddy</li>
            <li>Build self confidence, self-esteem and positive self image</li>
            <li>Teach independent living skills</li>
            <li>Support learning and development</li>
            <li>Develop social, emotional, personal, cultural and language skills</li>
            <li>Deliver informal education services</li>
            <li>Support health and wellbeing</li>
            <li>Provide instruction in etiquette</li>
            <li>Accompany to famous landmarks, museums, galleries, theatres, parks and high profile events</li>
          </ul>
        </div>
      </div>
      
      {/* Price Breakdown */}
      <div className="w-full">
        <h3 className="text-sm font-bold text-gray-700 mb-2">Price breakdown</h3>
        <div className="bg-gray-100 rounded-md p-4 w-full space-y-2">
          <div className="flex justify-between">
            <span className="text-xs">Day Rate:</span>
            <span className="text-xs">£220.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs">Travel Cost:</span>
            <span className="text-xs">£30.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs">Accommodation:</span>
            <span className="text-xs">N/A</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs">Food Allowance:</span>
            <span className="text-xs">£30.00</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span className="text-xs">Total:</span>
            <span className="text-xs">£280.00</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span className="text-xs">Your booking:</span>
            <span className="text-xs">7 days</span>
          </div>
          <div className="flex justify-between font-bold text-base pt-2 border-t">
            <span>Total price</span>
            <span>£1,960.00</span>
          </div>
          <div className="flex items-start pt-2 text-gray-500 text-[10px]">
            <span className="mr-1">ⓘ</span>
            <span>50% charge required within first 24 hours of booking, non-refundable, no cancellation</span>
          </div>
        </div>
      </div>
      
      {/* Amend booking section */}
      <div className="w-full">
        <h3 className="text-sm font-bold text-amber-600 mb-2">HOW TO AMEND YOUR BOOKING</h3>
        <div className="space-y-3 w-full">
          <div className="bg-gray-100 rounded-md p-3 w-full flex items-center">
            <div className="bg-amber-400 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-2">1</div>
            <span className="text-xs">Click <span className="text-amber-600 font-bold">here</span> to amend the dates on your Learning Hub booking</span>
          </div>
          
          <div className="flex justify-center w-full">
            <ChevronDown className="text-amber-400 w-6 h-6" />
          </div>
          
          <div className="bg-gray-100 rounded-md p-3 w-full flex items-center">
            <div className="bg-amber-400 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-2">2</div>
            <span className="text-xs">Enter <span className="font-bold">booking reference and last name</span></span>
          </div>
          
          <div className="flex justify-center w-full">
            <ChevronDown className="text-amber-400 w-6 h-6" />
          </div>
          
          <div className="bg-gray-100 rounded-md p-3 w-full flex items-center">
            <div className="bg-amber-400 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-2">3</div>
            <span className="text-xs">Click <span className="font-bold">"Amend"</span> and confirm your changes</span>
          </div>
        </div>
      </div>
      
      {/* Help section */}
      <div className="w-full space-y-4">
        <h3 className="text-sm font-bold text-amber-600 text-center">WE'RE HAPPY TO HELP</h3>
        <p className="text-xs text-center">If you have any questions, please email Learning Hub directly via:</p>
        
        <div className="flex justify-center">
          <a href="mailto:admin@learninghub.co.uk" className="flex items-center text-amber-600 font-semibold">
            <Mail size={16} className="mr-2" />
            <span>admin@learninghub.co.uk</span>
          </a>
        </div>
        
        <div className="flex justify-center">
          <a href="#" className="flex items-center text-amber-600 font-semibold">
            <FileText size={16} className="mr-2" />
            <span>CONTRACT AGREEMENT</span>
          </a>
        </div>
        
        <div className="bg-gray-100 rounded-md p-4 text-xs text-gray-600">
          <p className="font-bold mb-2">This is a SERVICE message:</p>
          <p className="mb-2">*If your chosen location is London, please ensure you provide accommodation 'off-site' for the Learning Hub employee.</p>
          <p className="mb-2">The accommodation shall be a 3-star hotel room or a luxury apartment within close proximity a maximum 5-minute walk from where the service recipient is residing.</p>
          <p className="mb-2">The address must reach Learning Hubs at least 7 days before the booking is due to commence.</p>
          <p>**Learning Hubs employees are entitled to UK public holidays (New Year's Day, Good Friday, Easter Monday, Bank Holiday, Christmas Day, and Boxing Day) as time off, with pay.</p>
        </div>
      </div>
      
      {/* New Booking Button */}
      <div className="w-full flex justify-center pt-4">
        <Button onClick={onNewBooking} className="px-6 py-2 rounded-md bg-amber-100 text-amber-900 hover:bg-amber-200">
          Make a New Booking
        </Button>
      </div>
    </div>;
};