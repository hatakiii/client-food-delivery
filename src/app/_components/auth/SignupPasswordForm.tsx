"use client";
import React from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
} from "@/components/ui";
import { HiOutlineChevronLeft } from "react-icons/hi";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    password: z
      .string({ message: "Weak password. Use numbers and symbols." })
      .min(6, { message: "Password must be at least 6 characters long." })
      .max(20, { message: "Password must be no more than 20 characters long." })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]:;"'<>,.?/~`|\\]).{6,20}$/,
        "Password must contain at least 1 uppercase, 1 lowercase, 1 number, 1 special character((e.g. !@#$%^&*))."
      ),

    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Those password did’t match, Try again",
    path: ["confirm"],
  });

export const SignupPasswordForm = ({
  password,
  setPassword,
  handleNextStep,
}: {
  password: string;
  setPassword: (password: string) => void;
  handleNextStep: () => void;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirm: "",
    },
  });

  const router = useRouter();

  function onSubmit(values: z.infer<typeof formSchema>) {
    setPassword(values.password);
    router.push("/login");
    console.log(values);
  }

  return (
    <div className="flex flex-col gap-6">
      <Button variant={"outline"} className="w-fit">
        <HiOutlineChevronLeft className="size-4" />
      </Button>
      <div>
        <h2 className="text-2xl leading-8 font-semibold text-foreground mb-1">
          Create a strong password
        </h2>
        <p className="text-base leading-6 text-muted-foreground">
          Create a strong password with letters, numbers.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-104">
                <FormControl>
                  <Input placeholder="Password" {...field} className="py-2" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirm"
            render={({ field }) => (
              <FormItem className="w-104">
                <FormControl>
                  <Input placeholder="Confirm" {...field} className="py-2" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-2 items-center mb-6">
            <Input type="checkbox" className="w4 h-4 w-fit" />
            <div className="text-sm text-muted-foreground">Show password</div>
          </div>
          <Button
            variant={"secondary"}
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/20"
          >
            Let's Go
          </Button>
          <div
            onClick={() => router.push("/login")}
            className="text-center text-base leading-6"
          >
            <div className="mt-2 text-muted-foreground">
              Already have an account?
              <span className="pl-3 text-blue-600 cursor-pointer">Log in</span>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
