import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const formSchema = z.object({
  email: z.email({
    error: "Invalid email. Use a format like example@email.com",
  }),
});

export const SignUpForm = ({ setEmail, handleNextStep }: any) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setEmail(values.email);
    handleNextStep();
  }

  return (
    // <div className="border rounded-xl max-w-2xl">
    <div className="w-full h-screen flex justify-between p-5">
      <div className="flex items-center ml-25">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="gap-0">
                  <Link href={"/"}>
                    <Button variant={"outline"} className="w-9 h-9 mb-6">
                      <ChevronLeft />
                    </Button>
                  </Link>

                  <FormLabel className="text-6 leading-8 font-[600] mb-1 ">
                    Create your account
                  </FormLabel>
                  <FormDescription className="mb-6">
                    Sign up to explore your favorite dishes.
                  </FormDescription>
                  <FormControl>
                    <Input
                      placeholder="Enter your email address"
                      {...field}
                      className="w-104"
                      // value={email} //onChange ni controlled uchraas value deer ni email ee butsaana
                      // onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-104">
              Let's Go
            </Button>
            <div className="flex gap-3 justify-center">
              <p className="text-muted-foreground text-4 leading-6 font-[400]">
                Already have an account?
              </p>
              <Link href={"/login"}>
                <p className="text-[#2563EB] text-4 leading-6 font-[400]">
                  Log in
                </p>
              </Link>
            </div>
          </form>
        </Form>
      </div>
      <div className="w-214 h-screen">
        <img
          src={"./delivery.svg"}
          className="rounded-2xl w-214 h-screen object-cover"
        />
      </div>
    </div>
  );
};

export default SignUpForm;
