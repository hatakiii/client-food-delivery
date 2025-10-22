import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CiLocationOn } from "react-icons/ci";
import { FaChevronRight } from "react-icons/fa";
import { Textarea } from "@/components/ui/textarea";

export const UserLocation = () => {
  return (
    <div>
      <Dialog>
        <form>
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
              <DialogDescription />
            </DialogHeader>

            <Textarea
              placeholder="Please share your complete address"
              className="text-sm h-20"
              // value={address}
              // onChange={addressHandler}
            />

            <DialogFooter className="flex-row gap-4 mt-6">
              <Button
                // onClick={handleCloseAddressInput}
                type="button"
                variant="outline"
                className="h-10"
              >
                Cancel
              </Button>
              <Button
                // onClick={handleAddAddressToCart}
                type="button"
                className="h-10"
              >
                Deliver Here
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
};
