"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  password: z.string().min(6, "6 aas deesh bichde").max(10),
  confirmPassword: z.string().min(6).max(10),
});

export const SignUpPassword = () => {
  const [isPassword, setIsPassword] = useState("password");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const togglePassword = () => {
    setIsPassword((prev) => {
      if (prev === "password") {
        return "text";
      } else {
        return "password";
      }
    });
  };

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="border rounded-xl max-w-2xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div>
                    <Input
                      placeholder="Write your password here"
                      {...field}
                      type={isPassword}
                    />
                    {isPassword === "password" ? (
                      <Eye onClick={togglePassword} />
                    ) : (
                      <EyeClosed onClick={togglePassword} />
                    )}
                  </div>
                </FormControl>
                <FormDescription>Passwordoo hii.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter your password again</FormLabel>
                <FormControl>
                  <Input placeholder="Write your password here" {...field} />
                </FormControl>
                <FormDescription>Passwordoo hii.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};
