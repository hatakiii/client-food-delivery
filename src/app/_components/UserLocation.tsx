// components/UserLocation.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { CiLocationOn } from "react-icons/ci";
import { FaChevronRight } from "react-icons/fa";

interface UserLocationProps {
  onSelectAddress: (address: string) => void;
}

export const UserLocation = ({ onSelectAddress }: UserLocationProps) => {
  const [address, setAddress] = useState("");

  const handleDeliverHere = () => {
    if (!address.trim()) {
      alert("Please enter your delivery address!");
      return;
    }
    onSelectAddress(address);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-63 h-9 bg-white flex items-center justify-center text-xs font-normal leading-4 gap-1 rounded-full px-3">
          <CiLocationOn className="w-5 h-5 text-[#EF4444]" />
          <span className="text-red-500 whitespace-nowrap">
            Delivery address:
          </span>
          <span className="text-muted-foreground whitespace-nowrap">
            Add Location
          </span>
          <FaChevronRight className="w-5 h-5 text-[#18181B80]" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[502px] rounded-[20px] gap-6">
        <DialogHeader>
          <DialogTitle>Please write your delivery address!</DialogTitle>
        </DialogHeader>

        <Textarea
          placeholder="Please share your complete address"
          className="text-sm h-20"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <DialogFooter className="flex-row gap-4 mt-6">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="button" onClick={handleDeliverHere}>
            Deliver Here
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
